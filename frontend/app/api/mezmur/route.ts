import { NextResponse } from "next/server";
import { hymnSchema, mezmurRepo } from "@meserete/backend";
import { auth } from "@/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  return NextResponse.json(await mezmurRepo.listHymns(category));
}

export async function POST(request: Request) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || (role !== "ADMIN" && role !== "TEACHER")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = hymnSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const hymn = await mezmurRepo.createHymn(parsed.data);
  return NextResponse.json(hymn, { status: 201 });
}
