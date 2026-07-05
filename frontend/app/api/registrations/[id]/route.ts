import { NextResponse } from "next/server";
import { registrationsRepo } from "@meserete/backend";
import { auth } from "@/auth";

type Params = Promise<{ id: string }>;

export async function PATCH(
  request: Request,
  segmentData: { params: Params }
) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || (role !== "ADMIN" && role !== "TEACHER")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await segmentData.params;
  const body = await request.json();
  const status = body.status as
    | "PENDING"
    | "REVIEWED"
    | "APPROVED"
    | "REJECTED";

  if (!["PENDING", "REVIEWED", "APPROVED", "REJECTED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = await registrationsRepo.updateRegistrationStatus(
    id,
    status
  );
  return NextResponse.json(updated);
}
