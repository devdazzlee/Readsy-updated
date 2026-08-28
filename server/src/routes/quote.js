import { Router } from "express";
import rateLimit from "express-rate-limit";
import { sanitizeUserText } from "../lib/guard.js";
import { sendQuoteEmail } from "../lib/mail.js";
import { prisma } from "../lib/prisma.js";

const router = Router();

const quoteLimiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please wait a minute and try again." },
});

router.post("/", quoteLimiter, async (req, res) => {
  try {
    const name = sanitizeUserText(req.body?.name, 80);
    const email = sanitizeUserText(req.body?.email, 120);
    const phone = sanitizeUserText(req.body?.phone, 40);
    const projectRaw =
      typeof req.body?.project === "string" ? req.body.project.trim() : "";
    const project = projectRaw
      ? sanitizeUserText(projectRaw, 2000)
      : "";
    const smsConsent = sanitizeUserText(req.body?.smsConsent || "n/a", 10) || "n/a";
    const source = sanitizeUserText(req.body?.source || "website", 40) || "website";

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required." });
    }

    if (projectRaw && !project) {
      return res.status(400).json({ error: "Project brief is too long." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    const results = await Promise.allSettled([
      sendQuoteEmail({ name, email, phone, project, smsConsent, source }),
      prisma.lead.create({
        data: { name, email, phone, project: project || null, smsConsent, source },
      }),
    ]);

    results.forEach((r) => {
      if (r.status === "rejected") {
        console.error("Quote submission side-effect failed:", r.reason?.message);
      }
    });

    // Only fail the request if BOTH the email and the DB record failed —
    // one succeeding is enough for the lead to reach the team.
    if (results.every((r) => r.status === "rejected")) {
      throw new Error("Both email delivery and lead storage failed");
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error("Quote email error:", error.message);
    return res.status(500).json({
      error: "Could not send your request. Please try again or email contact@thereadsypublishers.com.",
    });
  }
});

export default router;
