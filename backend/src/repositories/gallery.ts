import { prisma } from "../db";
import type { GalleryItemInput } from "../validation/schemas";

export function listGalleryItems(category?: string) {
  return prisma.galleryItem.findMany({
    where: category ? { category } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export function getGalleryItemById(id: string) {
  return prisma.galleryItem.findUnique({ where: { id } });
}

export function createGalleryItem(data: GalleryItemInput) {
  return prisma.galleryItem.create({ data });
}

export function deleteGalleryItem(id: string) {
  return prisma.galleryItem.delete({ where: { id } });
}
