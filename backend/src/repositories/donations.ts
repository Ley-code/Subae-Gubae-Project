import { prisma } from "../db";
import type { DonationIntentInput } from "../validation/schemas";

export function createDonationIntent(data: DonationIntentInput) {
  return prisma.donationIntent.create({ data });
}

export function listDonationIntents() {
  return prisma.donationIntent.findMany({ orderBy: { createdAt: "desc" } });
}
