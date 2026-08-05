import { Router } from "express";
import rateLimit from "express-rate-limit";
import { isBlockedPrompt, sanitizeUserText } from "../lib/guard.js";
import { createChatCompletion } from "../lib/openai.js";

const router = Router();

const blueprintLimiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Rate limit reached. Please wait a minute." },
});

const BLUEPRINT_SYSTEM = `You are Readsy's AI Book Blueprint engine. Authors get stuck between idea and structure. Your job is to turn a short book brief into a clear, usable blueprint that makes them feel ready to hire a professional team.

Return markdown in EXACTLY this structure:

## Working Titles
1. Title one
2. Title two
3. Title three

## Ideal Reader
2-3 sentences describing who this book is for and what they want.

## Core Promise
One sharp sentence: what transformation or experience the book delivers.

## Chapter Blueprint
Numbered list of 8 to 10 chapters. Each line: **Chapter title** - one-sentence purpose.

## Opening Hook
2-3 sentences suggesting how chapter one should start (no full prose chapter).

## Publish Path with Readsy
Bullet list recommending 2-4 services only from: Ghost Writing, Book Editing, Book Publishing, Book Cover Design, Book Marketing. Briefly say why each fits.

Rules:
- Stay under 320 words
- Practical and specific to THEIR idea, not generic advice
- Never invent pricing
- Never write full chapters or long sample scenes
- If input is not a book idea, refuse and ask for a book concept only
- Do not mention competitors`;

router.post("/", blueprintLimiter, async (req, res) => {
  try {
    const idea = sanitizeUserText(req.body?.idea, 1000);
    const genre = sanitizeUserText(req.body?.genre || "General", 60);
    const goal = sanitizeUserText(req.body?.goal || "Get published", 80);
    const tone = sanitizeUserText(req.body?.tone || "Professional", 60);

    if (!idea) {
      return res.status(400).json({ error: "Please share your book idea." });
    }

    if (isBlockedPrompt(idea)) {
      return res.json({
        blueprint:
          "I can only build book blueprints for The Readsy. Please describe your book concept, genre, and publishing goal.",
      });
    }

    const blueprint = await createChatCompletion(
      [
        { role: "system", content: BLUEPRINT_SYSTEM },
        {
          role: "user",
          content: `Genre: ${genre}\nGoal: ${goal}\nTone: ${tone}\nBook idea: ${idea}`,
        },
      ],
      420,
    );

    if (!blueprint) {
      return res
        .status(502)
        .json({ error: "Could not build that blueprint. Try again." });
    }

    return res.json({ blueprint });
  } catch (error) {
    console.error("Book blueprint route error:", error.message);
    return res.status(500).json({
      error: "Blueprint builder is temporarily unavailable.",
    });
  }
});

export default router;
