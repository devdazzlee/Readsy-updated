import { requireAuth } from "./requireAuth.js";

export const requireAdmin = [
  requireAuth,
  (req, res, next) => {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ error: "Admin access only." });
    }
    next();
  },
];
