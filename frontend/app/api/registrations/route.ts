import { NextResponse } from "next/server";
import { registrationSchema, registrationsRepo } from "@meserete/backend";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = registrationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const registration = await registrationsRepo.createRegistration(
    parsed.data
  );
  return NextResponse.json({ id: registration.id }, { status: 201 });
}

export async function GET(request: Request) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || (role !== "ADMIN" && role !== "TEACHER")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const registrations = await registrationsRepo.listRegistrations(
    status as "PENDING" | "REVIEWED" | "APPROVED" | "REJECTED" | undefined
  );
  return NextResponse.json(registrations);
}
