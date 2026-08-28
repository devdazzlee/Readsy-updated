// Usage: node scripts/promote-admin.js someone@email.com
// Grants (or revokes with --revoke) dashboard admin access to an existing
// account. The user must already have signed up through /signup first.
import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();
  const revoke = process.argv.includes("--revoke");

  if (!email) {
    console.error("Usage: node scripts/promote-admin.js someone@email.com [--revoke]");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`No account found for ${email}. They need to sign up at /signup first.`);
    process.exit(1);
  }

  const updated = await prisma.user.update({
    where: { email },
    data: { isAdmin: !revoke },
  });

  console.log(
    `${updated.email} is now ${updated.isAdmin ? "an admin" : "a regular user"}.`,
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
