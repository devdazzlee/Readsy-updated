// Plain fetch helpers for the handful of public, unauthenticated endpoints
// (quote form, chat, free AI tools) plus shared types.
//
// Everything that needs auth or admin access — login/signup, profile,
// password, my-activity, cover generation, and the admin dashboard — goes
// through RTK Query in `lib/store/api.ts` instead, which gives those calls
// consistent loading/error state and automatic cache invalidation.

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

const TOKEN_KEY = "readsy_auth_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Storage may be unavailable (private mode, blocked cookies) — auth
    // simply won't persist across reloads in that case.
  }
}

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  isAdmin: boolean;
  createdAt: string;
};

export async function sendChatMessage(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  identity?: { clientId: string; name?: string; email?: string; phone?: string },
) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, ...identity }),
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

// ---- Shared types (consumed by the RTK Query endpoints in lib/store/api.ts) ----

export type MyLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  project: string | null;
  smsConsent: string | null;
  source: string;
  createdAt: string;
};

export type MyCoverRequest = {
  id: string;
  title: string;
  subtitle: string | null;
  author: string | null;
  genre: string;
  style: string;
  description: string | null;
  imageCount: number;
  createdAt: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  project: string | null;
  smsConsent: string | null;
  source: string;
  createdAt: string;
};

export type CoverRequestItem = {
  id: string;
  title: string;
  subtitle: string | null;
  author: string | null;
  genre: string;
  style: string;
  description: string | null;
  imageCount: number;
  createdAt: string;
  user: { name: string; email: string; phone: string | null };
};

export type ConciergeRequestItem = {
  id: string;
  genre: string;
  idea: string;
  analysis: string | null;
  createdAt: string;
};

export type BlueprintRequestItem = {
  id: string;
  genre: string;
  goal: string;
  tone: string;
  idea: string;
  blueprint: string | null;
  createdAt: string;
};

export type ChatSessionSummary = {
  id: string;
  clientId: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
  lastMessage: string;
  messageCount: number;
  preview: string;
};

export type ChatMessageItem = {
  id: string;
  role: string;
  content: string;
  createdAt: string;
};

export type ChatSessionDetail = ChatSessionSummary & {
  messages: ChatMessageItem[];
};

export type AdminOverview = {
  counts: {
    leads: number;
    coverRequests: number;
    conciergeRequests: number;
    blueprintRequests: number;
    chatSessions: number;
    users: number;
  };
  recentLeads: Lead[];
  recentCovers: CoverRequestItem[];
  recentChats: ChatSessionSummary[];
};
