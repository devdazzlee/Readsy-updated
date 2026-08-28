import { Router } from "express";
import rateLimit from "express-rate-limit";
import { OAuth2Client } from "google-auth-library";
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

const googleClient = process.env.GOOGLE_CLIENT_ID
  ? new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  : null;

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

    if (!user.passwordHash) {
      return res.status(401).json({
        error: "This account signs in with Google. Use the Google button below instead.",
      });
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

router.post("/google", authLimiter, async (req, res) => {
  try {
    if (!googleClient) {
      console.error("Google sign-in attempted but GOOGLE_CLIENT_ID is not configured.");
      return res.status(503).json({ error: "Google sign-in is not available right now." });
    }

    const credential = typeof req.body?.credential === "string" ? req.body.credential : "";
    if (!credential) {
      return res.status(400).json({ error: "Missing Google credential." });
    }

    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (err) {
      console.error("Google token verification failed:", err.message);
      return res.status(401).json({ error: "That Google sign-in could not be verified." });
    }

    if (!payload?.email) {
      return res.status(401).json({ error: "Google did not share an email address." });
    }
    if (!payload.email_verified) {
      return res.status(401).json({ error: "Please verify your email with Google first." });
    }

    // Mirrors the email/password flow's own rule: /login never creates an
    // account and /signup never silently reuses one. Google sign-in gets
    // the same distinction instead of always auto-provisioning regardless
    // of which page/button triggered it — "login" with no matching account
    // should say so, not silently sign someone up.
    const intent = req.body?.intent === "login" ? "login" : "signup";

    const email = payload.email.toLowerCase();
    const googleId = payload.sub;
    const name = sanitizeUserText(payload.name, 100) || email.split("@")[0];

    let user = await prisma.user.findUnique({ where: { googleId } });

    if (!user) {
      // No account recognizes this Google id yet — either link it to an
      // existing email/password account (same verified email), or create a
      // brand-new Google-only account.
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        user = await prisma.user.update({
          where: { id: existing.id },
          data: { googleId },
        });
      } else if (intent === "login") {
        return res.status(404).json({
          error: "No account found for this Google account. Please create a free account first.",
        });
      } else {
        user = await prisma.user.create({
          data: { name, email, googleId, passwordHash: null },
        });
      }
    }

    const token = signToken(user);
    return res.json({ user: publicUser(user), token });
  } catch (error) {
    console.error("Google sign-in error:", error.message);
    return res.status(500).json({ error: "Could not sign you in with Google. Please try again." });
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

    if (newPassword.length < 8) {
      return res.status(400).json({ error: "New password must be at least 8 characters." });
    }

    // Google-only accounts have no password yet — let them set one for the
    // first time without proving a "current" password that doesn't exist.
    if (req.user.passwordHash) {
      if (!currentPassword) {
        return res.status(400).json({ error: "Please enter your current password." });
      }
      const valid = await comparePassword(currentPassword, req.user.passwordHash);
      if (!valid) {
        return res.status(401).json({ error: "Your current password is incorrect." });
      }
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
