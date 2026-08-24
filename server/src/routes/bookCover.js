import { Router } from "express";
import rateLimit from "express-rate-limit";
import { isBlockedPrompt, sanitizeUserText } from "../lib/guard.js";
import { generateBookCoverImages } from "../lib/openai.js";

const router = Router();

const coverLimiter = rateLimit({
  windowMs: 60_000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Rate limit reached. Please wait a minute before generating more covers." },
});

router.post("/", coverLimiter, async (req, res) => {
  try {
    const title = sanitizeUserText(req.body?.title, 120);
    const subtitle = sanitizeUserText(req.body?.subtitle, 140);
    const author = sanitizeUserText(req.body?.author, 80);
    const genre = sanitizeUserText(req.body?.genre || "Fiction", 40);
    const style = sanitizeUserText(req.body?.style || "Cinematic illustration", 60);
    const description = sanitizeUserText(req.body?.description, 500);

    if (!title) {
      return res.status(400).json({ error: "Please enter your book title." });
    }

    const combinedText = [title, subtitle, author, description]
      .filter(Boolean)
      .join(" ");

    if (isBlockedPrompt(combinedText)) {
      return res.status(400).json({
        error:
          "I can only generate book cover concepts for The Readsy Publishers. Please describe your book instead.",
      });
    }

    const promptParts = [
      `A professional, high-resolution book cover design for a ${genre} book.`,
      `Title text on the cover, large and dominant: "${title}".`,
      subtitle ? `Subtitle text, smaller, below the title: "${subtitle}".` : "",
      author ? `Author name near the bottom of the cover: "${author}".` : "",
      `Visual art style: ${style}.`,
      description ? `The cover artwork should visually reflect: ${description}.` : "",
      "Composition: a single striking hero image filling the full frame, clean professional typography hierarchy, well-balanced negative space, portrait book-cover proportions, publisher-quality finish, no watermark, no mockup frame, no extra borders.",
    ].filter(Boolean);

    const prompt = promptParts.join(" ");

    const images = await generateBookCoverImages(prompt, 3);

    return res.json({ images });
  } catch (error) {
    console.error("Book cover route error:", error.message);
    return res.status(500).json({
      error: "Cover generator is temporarily unavailable. Please try again shortly.",
    });
  }
});

export default router;
