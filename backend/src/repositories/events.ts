import { prisma } from "../db";
import type { EventInput } from "../validation/schemas";

export function listUpcomingEvents() {
  return prisma.event.findMany({
    where: { published: true, startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
  });
}

export function listPastEvents() {
  return prisma.event.findMany({
    where: { published: true, startsAt: { lt: new Date() } },
    orderBy: { startsAt: "desc" },
  });
}

export function listAllEvents() {
  return prisma.event.findMany({ orderBy: { startsAt: "desc" } });
}

export function getEventBySlug(slug: string) {
  return prisma.event.findUnique({ where: { slug } });
}

export function getEventById(id: string) {
  return prisma.event.findUnique({ where: { id } });
}

export function createEvent(data: EventInput, authorId?: string) {
  return prisma.event.create({
    data: {
      ...data,
      startsAt: new Date(data.startsAt),
      endsAt: data.endsAt ? new Date(data.endsAt) : null,
      authorId,
    },
  });
}

export function updateEvent(id: string, data: EventInput) {
  return prisma.event.update({
    where: { id },
    data: {
      ...data,
      startsAt: new Date(data.startsAt),
      endsAt: data.endsAt ? new Date(data.endsAt) : null,
    },
  });
}

export function deleteEvent(id: string) {
  return prisma.event.delete({ where: { id } });
}
