import { NextResponse } from "next/server";
import { hymnSchema, mezmurRepo } from "@meserete/backend";
import { auth } from "@/auth";

type Params = Promise<{ id: string }>;

async function requireStaff() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || (role !== "ADMIN" && role !== "TEACHER")) return null;
  return session;
}

export async function GET(_request: Request, segmentData: { params: Params }) {
  const { id } = await segmentData.params;
  const item = await mezmurRepo.getHymnById(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(
  request: Request,
  segmentData: { params: Params }
) {
  const session = await requireStaff();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await segmentData.params;
  const body = await request.json();
  const parsed = hymnSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await mezmurRepo.updateHymn(id, parsed.data);
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  segmentData: { params: Params }
) {
  const session = await requireStaff();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await segmentData.params;
  await mezmurRepo.deleteHymn(id);
  return NextResponse.json({ success: true });
}
