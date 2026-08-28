import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import chatRouter from "./routes/chat.js";
import bookIdeaRouter from "./routes/bookIdea.js";
import bookBlueprintRouter from "./routes/bookBlueprint.js";
import bookCoverRouter from "./routes/bookCover.js";
import quoteRouter from "./routes/quote.js";

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const isProd = process.env.NODE_ENV === "production";

const allowedOrigins = CORS_ORIGIN.split(",")
  .map((o) => o.trim())
  .filter(Boolean);
const isLocalhostOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // Same-origin/non-browser requests (curl, server-to-server) send no Origin header.
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // In development, Next.js may bind to a different port if 3000 is taken
      // (e.g. 3001, 3002...). Allow any localhost port so this doesn't silently
      // break CORS every time a port shifts. Production stays strict.
      if (!isProd && isLocalhostOrigin(origin)) return callback(null, true);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ["GET", "POST", "OPTIONS"],
  }),
);
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "readsy-backend" });
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);
app.use("/api/book-idea", bookIdeaRouter);
app.use("/api/book-blueprint", bookBlueprintRouter);
app.use("/api/book-cover", bookCoverRouter);
app.use("/api/quote", quoteRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`The Readsy Publishers backend running on http://localhost:${PORT}`);
});
