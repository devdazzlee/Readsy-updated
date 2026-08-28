import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { publicUser } from "../lib/auth.js";

const router = Router();

router.use(requireAdmin);

function pagination(req) {
  const take = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
  const skip = Math.max(Number(req.query.skip) || 0, 0);
  return { take, skip };
}

router.get("/overview", async (_req, res) => {
  try {
    const [leads, coverRequests, conciergeRequests, blueprintRequests, chatSessions, users] =
      await Promise.all([
        prisma.lead.count(),
        prisma.coverRequest.count(),
        prisma.conciergeRequest.count(),
        prisma.blueprintRequest.count(),
        prisma.chatSession.count(),
        prisma.user.count(),
      ]);

    const [recentLeads, recentCovers, recentChats] = await Promise.all([
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.coverRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.chatSession.findMany({ orderBy: { lastMessage: "desc" }, take: 5 }),
    ]);

    return res.json({
      counts: { leads, coverRequests, conciergeRequests, blueprintRequests, chatSessions, users },
      recentLeads,
      recentCovers,
      recentChats,
    });
  } catch (error) {
    console.error("Admin overview error:", error.message);
    return res.status(500).json({ error: "Could not load dashboard overview." });
  }
});

router.get("/leads", async (req, res) => {
  try {
    const { take, skip } = pagination(req);
    const [items, total] = await Promise.all([
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take, skip }),
      prisma.lead.count(),
    ]);
    return res.json({ items, total });
  } catch (error) {
    console.error("Admin leads error:", error.message);
    return res.status(500).json({ error: "Could not load leads." });
  }
});

router.get("/cover-requests", async (req, res) => {
  try {
    const { take, skip } = pagination(req);
    const [items, total] = await Promise.all([
      prisma.coverRequest.findMany({
        orderBy: { createdAt: "desc" },
        take,
        skip,
        include: { user: { select: { name: true, email: true, phone: true } } },
      }),
      prisma.coverRequest.count(),
    ]);
    return res.json({ items, total });
  } catch (error) {
    console.error("Admin cover-requests error:", error.message);
    return res.status(500).json({ error: "Could not load cover requests." });
  }
});

router.get("/concierge", async (req, res) => {
  try {
    const { take, skip } = pagination(req);
    const [items, total] = await Promise.all([
      prisma.conciergeRequest.findMany({ orderBy: { createdAt: "desc" }, take, skip }),
      prisma.conciergeRequest.count(),
    ]);
    return res.json({ items, total });
  } catch (error) {
    console.error("Admin concierge error:", error.message);
    return res.status(500).json({ error: "Could not load concierge requests." });
  }
});

router.get("/blueprint", async (req, res) => {
  try {
    const { take, skip } = pagination(req);
    const [items, total] = await Promise.all([
      prisma.blueprintRequest.findMany({ orderBy: { createdAt: "desc" }, take, skip }),
      prisma.blueprintRequest.count(),
    ]);
    return res.json({ items, total });
  } catch (error) {
    console.error("Admin blueprint error:", error.message);
    return res.status(500).json({ error: "Could not load blueprint requests." });
  }
});

router.get("/chats", async (req, res) => {
  try {
    const { take, skip } = pagination(req);
    const [sessions, total] = await Promise.all([
      prisma.chatSession.findMany({
        orderBy: { lastMessage: "desc" },
        take,
        skip,
        include: {
          messages: { orderBy: { createdAt: "desc" }, take: 1 },
          _count: { select: { messages: true } },
        },
      }),
      prisma.chatSession.count(),
    ]);

    const items = sessions.map((s) => ({
      id: s.id,
      clientId: s.clientId,
      name: s.name,
      email: s.email,
      phone: s.phone,
      createdAt: s.createdAt,
      lastMessage: s.lastMessage,
      messageCount: s._count.messages,
      preview: s.messages[0]?.content?.slice(0, 140) || "",
    }));

    return res.json({ items, total });
  } catch (error) {
    console.error("Admin chats error:", error.message);
    return res.status(500).json({ error: "Could not load chat sessions." });
  }
});

router.get("/chats/:id", async (req, res) => {
  try {
    const session = await prisma.chatSession.findUnique({
      where: { id: req.params.id },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });
    if (!session) {
      return res.status(404).json({ error: "Chat session not found." });
    }
    return res.json({ session });
  } catch (error) {
    console.error("Admin chat detail error:", error.message);
    return res.status(500).json({ error: "Could not load chat transcript." });
  }
});

router.get("/me", async (req, res) => {
  return res.json({ user: publicUser(req.user) });
});

export default router;
