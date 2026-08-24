import { Router } from "express";
import rateLimit from "express-rate-limit";
import { isBlockedPrompt, sanitizeUserText } from "../lib/guard.js";
import {
  createChatCompletion,
  IDEA_SYSTEM_PROMPT,
} from "../lib/openai.js";

const router = Router();

const ideaLimiter = rateLimit({
  windowMs: 60_000,
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Rate limit reached. Please wait a minute." },
});

router.post("/", ideaLimiter, async (req, res) => {
  try {
    const idea = sanitizeUserText(req.body?.idea, 900);
    const genre = sanitizeUserText(req.body?.genre || "General", 60);

    if (!idea) {
      return res.status(400).json({ error: "Please share a short book idea." });
    }

    if (isBlockedPrompt(idea)) {
      return res.json({
        analysis:
          "I can only analyze book ideas for The Readsy Publishers. Please describe your manuscript concept, genre, and goal.",
      });
    }

    const analysis = await createChatCompletion(
      [
        { role: "system", content: IDEA_SYSTEM_PROMPT },
        { role: "user", content: `Genre: ${genre}\nBook idea: ${idea}` },
      ],
      280,
    );

    if (!analysis) {
      return res
        .status(502)
        .json({ error: "Could not analyze that idea. Try again." });
    }

    return res.json({ analysis });
  } catch (error) {
    console.error("Book idea route error:", error.message);
    return res.status(500).json({
      error: "AI analysis is temporarily unavailable.",
    });
  }
});

export default router;
