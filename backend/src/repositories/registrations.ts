import { prisma } from "../db";
import type { RegistrationStatus } from "@prisma/client";
import type { RegistrationInput } from "../validation/schemas";

export function createRegistration(data: RegistrationInput) {
  return prisma.registration.create({
    data: {
      ...data,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
    },
  });
}

export function listRegistrations(status?: RegistrationStatus) {
  return prisma.registration.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export function getRegistrationById(id: string) {
  return prisma.registration.findUnique({ where: { id } });
}

export function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus
) {
  return prisma.registration.update({
    where: { id },
    data: { status, reviewedAt: new Date() },
  });
}

export function countRegistrationsByStatus(status: RegistrationStatus) {
  return prisma.registration.count({ where: { status } });
}
