import { prisma } from "../db";
import type { MaterialInput } from "../validation/schemas";

export function listMaterials(classGrade?: string) {
  return prisma.educationalMaterial.findMany({
    where: classGrade ? { classGrade } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export function getMaterialById(id: string) {
  return prisma.educationalMaterial.findUnique({ where: { id } });
}

export function createMaterial(data: MaterialInput, uploadedById?: string) {
  return prisma.educationalMaterial.create({ data: { ...data, uploadedById } });
}

export function updateMaterial(id: string, data: MaterialInput) {
  return prisma.educationalMaterial.update({ where: { id }, data });
}

export function deleteMaterial(id: string) {
  return prisma.educationalMaterial.delete({ where: { id } });
}
