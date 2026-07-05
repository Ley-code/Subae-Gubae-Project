import { prisma } from "../db";
import { hashPassword } from "../auth";

async function main() {
  const [, , email, name, password, role] = process.argv;

  if (!email || !name || !password) {
    console.error(
      "Usage: npm run create-admin --workspace backend -- <email> <name> <password> [ADMIN|TEACHER]"
    );
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.upsert({
    where: { email },
    update: { name, passwordHash, role: (role as "ADMIN" | "TEACHER") ?? "ADMIN" },
    create: {
      email,
      name,
      passwordHash,
      role: (role as "ADMIN" | "TEACHER") ?? "ADMIN",
    },
  });

  console.log(`User ready: ${user.email} (${user.role})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
