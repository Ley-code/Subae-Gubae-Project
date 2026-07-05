import { prisma } from "../db";
import type { NewsInput } from "../validation/schemas";

export function listPublishedNews() {
  return prisma.news.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export function listAllNews() {
  return prisma.news.findMany({ orderBy: { createdAt: "desc" } });
}

export function getNewsBySlug(slug: string) {
  return prisma.news.findUnique({ where: { slug } });
}

export function getNewsById(id: string) {
  return prisma.news.findUnique({ where: { id } });
}

export function createNews(data: NewsInput, authorId?: string) {
  return prisma.news.create({
    data: {
      ...data,
      authorId,
      publishedAt: data.published ? new Date() : null,
    },
  });
}

export function updateNews(id: string, data: NewsInput) {
  return prisma.news.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.published ? new Date() : null,
    },
  });
}

export function deleteNews(id: string) {
  return prisma.news.delete({ where: { id } });
}
