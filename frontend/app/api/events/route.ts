import { NextResponse } from "next/server";
import { eventSchema, eventsRepo } from "@meserete/backend";
import { auth } from "@/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all");
  const past = searchParams.get("past");

  if (all) {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session || (role !== "ADMIN" && role !== "TEACHER")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(await eventsRepo.listAllEvents());
  }

  if (past) {
    return NextResponse.json(await eventsRepo.listPastEvents());
  }

  return NextResponse.json(await eventsRepo.listUpcomingEvents());
}

export async function POST(request: Request) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || (role !== "ADMIN" && role !== "TEACHER")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const userId = (session.user as { id?: string }).id;
  const event = await eventsRepo.createEvent(parsed.data, userId);
  return NextResponse.json(event, { status: 201 });
}
