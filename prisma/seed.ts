import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@example.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "change-this-password";
  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash: await bcrypt.hash(password, 12),
      displayName: process.env.ADMIN_NAME ?? "Portfolio Admin",
    },
  });
  await prisma.portfolioSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
  const existing = await prisma.profile.findFirst();
  if (!existing)
    await prisma.profile.create({
      data: {
        fullName: "Your Name",
        title: "Your Professional Title",
        bio: "Write your portfolio biography here.",
      },
    });
  console.log(
    `Seeded admin ${email}. Change ADMIN_PASSWORD before production.`,
  );
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
