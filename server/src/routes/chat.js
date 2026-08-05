import { Router } from "express";
import rateLimit from "express-rate-limit";
import { isBlockedPrompt, sanitizeUserText } from "../lib/guard.js";
import {
  createChatCompletion,
  READSY_SYSTEM_PROMPT,
} from "../lib/openai.js";

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

router.post("/", chatLimiter, async (req, res) => {
  try {
    const incoming = Array.isArray(req.body?.messages)
      ? req.body.messages.slice(-8)
      : [];

    if (incoming.length === 0 || incoming.length > 8) {
      return res.status(400).json({ error: "Invalid conversation." });
    }

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
            "I can only help with Readsy publishing services: ghostwriting, editing, publishing, cover design, and book marketing. How can I help with your book project?",
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

    return res.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error.message);
    return res.status(500).json({
      error: "Chat is temporarily unavailable. Please try again shortly.",
    });
  }
});

export default router;
