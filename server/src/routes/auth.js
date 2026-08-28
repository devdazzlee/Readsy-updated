import { Router } from "express";
import rateLimit from "express-rate-limit";
import { prisma } from "../lib/prisma.js";
import {
  comparePassword,
  hashPassword,
  publicUser,
  signToken,
} from "../lib/auth.js";
import { sanitizeUserText } from "../lib/guard.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60_000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts. Please wait a few minutes and try again." },
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/signup", authLimiter, async (req, res) => {
  try {
    const name = sanitizeUserText(req.body?.name, 100);
    const emailRaw = sanitizeUserText(req.body?.email, 200);
    const email = emailRaw ? emailRaw.toLowerCase() : null;
    const phone = sanitizeUserText(req.body?.phone, 40);
    const password = typeof req.body?.password === "string" ? req.body.password : "";

    if (!name) {
      return res.status(400).json({ error: "Please enter your name." });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters." });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "An account with that email already exists." });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, phone: phone || null, passwordHash },
    });

    const token = signToken(user);
    return res.status(201).json({ user: publicUser(user), token });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ error: "Could not create your account. Please try again." });
  }
});

router.post("/login", authLimiter, async (req, res) => {
  try {
    const emailRaw = sanitizeUserText(req.body?.email, 200);
    const email = emailRaw ? emailRaw.toLowerCase() : null;
    const password = typeof req.body?.password === "string" ? req.body.password : "";

    if (!email || !password) {
      return res.status(400).json({ error: "Please enter your email and password." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password." });
    }

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Incorrect email or password." });
    }

    const token = signToken(user);
    return res.json({ user: publicUser(user), token });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ error: "Could not log you in. Please try again." });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  return res.json({ user: publicUser(req.user) });
});

router.patch("/profile", requireAuth, async (req, res) => {
  try {
    const name = sanitizeUserText(req.body?.name, 100);
    const phone = sanitizeUserText(req.body?.phone, 40);

    if (!name) {
      return res.status(400).json({ error: "Please enter your name." });
    }

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, phone: phone || null },
    });

    return res.json({ user: publicUser(updated) });
  } catch (error) {
    console.error("Profile update error:", error.message);
    return res.status(500).json({ error: "Could not update your profile." });
  }
});

router.patch("/password", requireAuth, authLimiter, async (req, res) => {
  try {
    const currentPassword =
      typeof req.body?.currentPassword === "string" ? req.body.currentPassword : "";
    const newPassword =
      typeof req.body?.newPassword === "string" ? req.body.newPassword : "";

    if (!currentPassword) {
      return res.status(400).json({ error: "Please enter your current password." });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: "New password must be at least 8 characters." });
    }

    const valid = await comparePassword(currentPassword, req.user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Your current password is incorrect." });
    }

    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { passwordHash },
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Password update error:", error.message);
    return res.status(500).json({ error: "Could not update your password." });
  }
});

// A user's own activity: quote/contact submissions matched by their email
// (most were made before they had an account), plus cover-generator
// requests tied directly to their account.
router.get("/my-activity", requireAuth, async (req, res) => {
  try {
    const [leads, coverRequests] = await Promise.all([
      prisma.lead.findMany({
        where: { email: req.user.email },
        orderBy: { createdAt: "desc" },
      }),
      prisma.coverRequest.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return res.json({ leads, coverRequests });
  } catch (error) {
    console.error("My-activity error:", error.message);
    return res.status(500).json({ error: "Could not load your activity." });
  }
});

export default router;
