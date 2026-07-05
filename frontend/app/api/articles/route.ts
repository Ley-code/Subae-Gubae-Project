import { NextResponse } from "next/server";
import { articleSchema, articlesRepo } from "@meserete/backend";
import { auth } from "@/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all");
  const category = searchParams.get("category") ?? undefined;

  if (all) {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session || (role !== "ADMIN" && role !== "TEACHER")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(await articlesRepo.listAllArticles());
  }

  return NextResponse.json(await articlesRepo.listPublishedArticles(category));
}

export async function POST(request: Request) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || (role !== "ADMIN" && role !== "TEACHER")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = articleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const userId = (session.user as { id?: string }).id;
  const article = await articlesRepo.createArticle(parsed.data, userId);
  return NextResponse.json(article, { status: 201 });
}
