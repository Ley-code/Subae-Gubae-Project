import { prisma } from "../db";
import type { HymnInput } from "../validation/schemas";

export function listHymns(category?: string) {
  return prisma.hymn.findMany({
    where: category ? { category } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export function getHymnBySlug(slug: string) {
  return prisma.hymn.findUnique({ where: { slug } });
}

export function getHymnById(id: string) {
  return prisma.hymn.findUnique({ where: { id } });
}

export function createHymn(data: HymnInput) {
  return prisma.hymn.create({ data });
}

export function updateHymn(id: string, data: HymnInput) {
  return prisma.hymn.update({ where: { id }, data });
}

export function deleteHymn(id: string) {
  return prisma.hymn.delete({ where: { id } });
}
