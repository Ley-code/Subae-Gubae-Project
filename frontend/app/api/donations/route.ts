import { NextResponse } from "next/server";
import { donationIntentSchema, donationsRepo } from "@meserete/backend";
import { auth } from "@/auth";

// Scaffold-only: records donor interest, no payment gateway is wired up yet.
// See PRD "should-have" section for the real Telebirr/bank integration.
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = donationIntentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const intent = await donationsRepo.createDonationIntent(parsed.data);
  return NextResponse.json({ id: intent.id }, { status: 201 });
}

export async function GET() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || (role !== "ADMIN" && role !== "TEACHER")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await donationsRepo.listDonationIntents());
}
