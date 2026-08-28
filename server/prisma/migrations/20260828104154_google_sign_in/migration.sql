-- AlterTable: passwordHash becomes optional (Google-only accounts have none),
-- and add a unique googleId to recognize returning Google sign-ins.
ALTER TABLE "users" ALTER COLUMN "passwordHash" DROP NOT NULL;
ALTER TABLE "users" ADD COLUMN "googleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");
