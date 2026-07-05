import { NextResponse } from "next/server";
import { forumThreadSchema, forumRepo } from "@meserete/backend";
import { auth } from "@/auth";

// Scaffold-only: listing and creating threads works, but there is no reply
// UI, moderation, or notification system yet. See PRD "should-have" section.
export async function GET() {
  const threads = await forumRepo.listForumThreads();
  return NextResponse.json(threads);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = forumThreadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const userId = (session.user as { id?: string }).id;
  const thread = await forumRepo.createForumThread(parsed.data, userId);
  return NextResponse.json(thread, { status: 201 });
}
