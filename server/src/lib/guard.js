const BLOCKED =
  /\b(ignore (previous|all) instructions|system prompt|jailbreak|api key|hack|exploit)\b/i;

export function isBlockedPrompt(text) {
  return BLOCKED.test(text);
}

export function sanitizeUserText(text, max = 800) {
  if (typeof text !== "string") return null;
  const trimmed = text.trim().replace(/\s+/g, " ");
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || "unknown";
}
