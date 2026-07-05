import { prisma } from "../db";
import type { Role } from "@prisma/client";
import { hashPassword } from "../auth";

export function listAdminUsers() {
  return prisma.user.findMany({
    where: { role: { in: ["ADMIN", "TEACHER"] } },
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
}

export async function createAdminUser(
  email: string,
  name: string,
  plainPassword: string,
  role: Role = "ADMIN"
) {
  const passwordHash = await hashPassword(plainPassword);
  return prisma.user.create({
    data: { email, name, passwordHash, role },
  });
}
