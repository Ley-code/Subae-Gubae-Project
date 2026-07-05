import bcrypt from "bcryptjs";
import type { Role } from "@prisma/client";
import { prisma } from "./db";

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

/**
 * Which admin-area sections a role may access. MEMBER never reaches /admin at
 * all (middleware blocks it before this is consulted); this only decides
 * ADMIN vs TEACHER access to specific sections.
 */
const ADMIN_ONLY_SECTIONS = ["members"] as const;

export function canAccessAdminSection(role: Role, section: string): boolean {
  if (role === "MEMBER") return false;
  if (role === "ADMIN") return true;
  // TEACHER
  return !ADMIN_ONLY_SECTIONS.includes(section as (typeof ADMIN_ONLY_SECTIONS)[number]);
}
