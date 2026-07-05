import { NextResponse } from "next/server";
import { materialSchema, materialsRepo } from "@meserete/backend";
import { auth } from "@/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classGrade = searchParams.get("classGrade") ?? undefined;
  return NextResponse.json(await materialsRepo.listMaterials(classGrade));
}

export async function POST(request: Request) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || (role !== "ADMIN" && role !== "TEACHER")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = materialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const userId = (session.user as { id?: string }).id;
  const material = await materialsRepo.createMaterial(parsed.data, userId);
  return NextResponse.json(material, { status: 201 });
}
