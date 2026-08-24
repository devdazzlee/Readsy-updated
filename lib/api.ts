const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

export async function sendChatMessage(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  const data = (await res.json()) as { reply?: string; error?: string };
  if (!res.ok) {
    throw new Error(data.error || "Chat request failed");
  }
  if (!data.reply) {
    throw new Error("Empty chat response");
  }
  return data.reply;
}

export async function analyzeBookIdea(idea: string, genre: string) {
  const res = await fetch(`${API_URL}/api/book-idea`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea, genre }),
  });

  const data = (await res.json()) as { analysis?: string; error?: string };
  if (!res.ok) {
    throw new Error(data.error || "Analysis request failed");
  }
  if (!data.analysis) {
    throw new Error("Empty analysis response");
  }
  return data.analysis;
}

export async function buildBookBlueprint(input: {
  idea: string;
  genre: string;
  goal: string;
  tone: string;
}) {
  const res = await fetch(`${API_URL}/api/book-blueprint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = (await res.json()) as { blueprint?: string; error?: string };
  if (!res.ok) {
    throw new Error(data.error || "Blueprint request failed");
  }
  if (!data.blueprint) {
    throw new Error("Empty blueprint response");
  }
  return data.blueprint;
}

export async function generateBookCovers(input: {
  title: string;
  subtitle?: string;
  author?: string;
  genre: string;
  style: string;
  description?: string;
}) {
  const res = await fetch(`${API_URL}/api/book-cover`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = (await res.json()) as { images?: string[]; error?: string };
  if (!res.ok) {
    throw new Error(data.error || "Cover generation failed");
  }
  if (!data.images || data.images.length === 0) {
    throw new Error("No covers were generated");
  }
  return data.images;
}

export async function submitQuote(input: {
  name: string;
  email: string;
  phone: string;
  project?: string;
  smsConsent?: string;
  source?: string;
}) {
  const res = await fetch(`${API_URL}/api/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = (await res.json()) as { ok?: boolean; error?: string };
  if (!res.ok) {
    throw new Error(data.error || "Quote request failed");
  }
  return data;
}
