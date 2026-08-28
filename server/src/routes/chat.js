import { Router } from "express";
import rateLimit from "express-rate-limit";
import { isBlockedPrompt, sanitizeUserText } from "../lib/guard.js";
import {
  createChatCompletion,
  READSY_SYSTEM_PROMPT,
} from "../lib/openai.js";
import { prisma } from "../lib/prisma.js";

const router = Router();

const chatLimiter = rateLimit({
  windowMs: 60_000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many messages. Please wait a minute and try again.",
  },
});

async function upsertSession(clientId, identity) {
  if (!clientId) return null;
  try {
    return await prisma.chatSession.upsert({
      where: { clientId },
      update: {
        lastMessage: new Date(),
        ...(identity.name ? { name: identity.name } : {}),
        ...(identity.email ? { email: identity.email } : {}),
        ...(identity.phone ? { phone: identity.phone } : {}),
      },
      create: {
        clientId,
        name: identity.name || null,
        email: identity.email || null,
        phone: identity.phone || null,
      },
    });
  } catch (err) {
    console.error("Could not upsert chat session:", err.message);
    return null;
  }
}

async function saveMessages(sessionId, entries) {
  if (!sessionId) return;
  try {
    await prisma.chatMessage.createMany({
      data: entries.map((e) => ({ sessionId, role: e.role, content: e.content })),
    });
  } catch (err) {
    console.error("Could not save chat messages:", err.message);
  }
}

// The widget resends the visitor's name/email with every message once
// they've shared it, so we only want to turn that into a lead once per
// conversation — otherwise every follow-up message would create a
// duplicate row in the dashboard's Quote Leads tab.
async function createLeadFromChatOnce(session, identity, latestUserMessage) {
  if (!session || session.leadCreated) return;
  if (!identity.name || !identity.email) return;

  try {
    // A visitor can fire two messages in quick succession — both requests
    // race to persist their reply, and both would see leadCreated:false if
    // we just checked-then-wrote. Guarding the flip with a WHERE clause
    // makes it atomic: only the request whose UPDATE actually matches a row
    // (count === 1) "wins" and gets to create the lead; the loser sees
    // count === 0 and backs off, so exactly one lead is ever created.
    const claim = await prisma.chatSession.updateMany({
      where: { id: session.id, leadCreated: false },
      data: { leadCreated: true },
    });
    if (claim.count === 0) return;

    await prisma.lead.create({
      data: {
        name: identity.name,
        email: identity.email,
        phone: identity.phone || "Not provided",
        project: latestUserMessage
          ? `Shared via live chat: "${latestUserMessage.slice(0, 300)}"`
          : "Shared contact details via live chat.",
        source: "chatbot",
      },
    });
  } catch (err) {
    console.error("Could not create lead from chat session:", err.message);
  }
}

router.post("/", chatLimiter, async (req, res) => {
  try {
    const incoming = Array.isArray(req.body?.messages)
      ? req.body.messages.slice(-8)
      : [];

    if (incoming.length === 0 || incoming.length > 8) {
      return res.status(400).json({ error: "Invalid conversation." });
    }

    const clientId = sanitizeUserText(req.body?.clientId, 100);
    const identity = {
      name: sanitizeUserText(req.body?.name, 100),
      email: sanitizeUserText(req.body?.email, 200),
      phone: sanitizeUserText(req.body?.phone, 40),
    };

    const cleaned = [];
    for (const msg of incoming) {
      if (msg.role !== "user" && msg.role !== "assistant") {
        return res.status(400).json({ error: "Invalid message role." });
      }

      const content = sanitizeUserText(
        msg.content,
        msg.role === "user" ? 700 : 1200,
      );
      if (!content) {
        return res.status(400).json({ error: "Invalid message content." });
      }

      if (msg.role === "user" && isBlockedPrompt(content)) {
        return res.json({
          reply:
            "I can only help with The Readsy Publishers services: ghostwriting, editing, publishing, cover design, and book marketing. How can I help with your book project?",
        });
      }

      cleaned.push({ role: msg.role, content });
    }

    const reply = await createChatCompletion([
      { role: "system", content: READSY_SYSTEM_PROMPT },
      ...cleaned,
    ]);

    if (!reply) {
      return res
        .status(502)
        .json({ error: "No response generated. Please try again." });
    }

    // Persist this exchange (latest user message + the reply) without
    // blocking the response — chat history is a nice-to-have, not critical
    // path for the visitor waiting on a reply.
    const latestUserMessage = [...cleaned].reverse().find((m) => m.role === "user");
    if (latestUserMessage) {
      upsertSession(clientId, identity).then((session) => {
        if (!session) return;
        saveMessages(session.id, [
          { role: "user", content: latestUserMessage.content },
          { role: "assistant", content: reply },
        ]);
        createLeadFromChatOnce(session, identity, latestUserMessage.content);
      });
    }

    return res.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error.message);
    return res.status(500).json({
      error: "Chat is temporarily unavailable. Please try again shortly.",
    });
  }
});

export default router;
