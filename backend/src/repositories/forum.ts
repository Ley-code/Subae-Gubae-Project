import { prisma } from "../db";
import type { ForumThreadInput } from "../validation/schemas";

export function listForumThreads() {
  return prisma.forumThread.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } }, posts: true },
  });
}

export function getForumThreadById(id: string) {
  return prisma.forumThread.findUnique({
    where: { id },
    include: {
      author: { select: { name: true } },
      posts: {
        orderBy: { createdAt: "asc" },
        include: { author: { select: { name: true } } },
      },
    },
  });
}

export function createForumThread(data: ForumThreadInput, authorId?: string) {
  return prisma.forumThread.create({
    data: {
      title: data.title,
      authorId,
      posts: { create: { body: data.body, authorId } },
    },
  });
}
