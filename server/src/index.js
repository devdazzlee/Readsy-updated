import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import chatRouter from "./routes/chat.js";
import bookIdeaRouter from "./routes/bookIdea.js";
import bookBlueprintRouter from "./routes/bookBlueprint.js";
import quoteRouter from "./routes/quote.js";

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: CORS_ORIGIN.split(",").map((o) => o.trim()),
    methods: ["GET", "POST", "OPTIONS"],
  }),
);
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "readsy-backend" });
});

app.use("/api/chat", chatRouter);
app.use("/api/book-idea", bookIdeaRouter);
app.use("/api/book-blueprint", bookBlueprintRouter);
app.use("/api/quote", quoteRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Readsy backend running on http://localhost:${PORT}`);
});
