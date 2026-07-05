import { prisma } from "../db";
import type { ArticleInput } from "../validation/schemas";

export function listPublishedArticles(category?: string) {
  return prisma.article.findMany({
    where: { published: true, ...(category ? { category } : {}) },
    orderBy: { createdAt: "desc" },
  });
}

export function listAllArticles() {
  return prisma.article.findMany({ orderBy: { createdAt: "desc" } });
}

export function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({ where: { slug } });
}

export function getArticleById(id: string) {
  return prisma.article.findUnique({ where: { id } });
}

export function createArticle(data: ArticleInput, authorId?: string) {
  return prisma.article.create({ data: { ...data, authorId } });
}

export function updateArticle(id: string, data: ArticleInput) {
  return prisma.article.update({ where: { id }, data });
}

export function deleteArticle(id: string) {
  return prisma.article.delete({ where: { id } });
}
