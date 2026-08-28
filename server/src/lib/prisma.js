import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient across hot-reloads / requests instead of
// opening a new connection pool every time this module is imported.
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.__prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prisma = prisma;
}
