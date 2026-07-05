import { NextResponse } from "next/server";
import { galleryRepo } from "@meserete/backend";
import { auth } from "@/auth";

type Params = Promise<{ id: string }>;

export async function DELETE(
  _request: Request,
  segmentData: { params: Params }
) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || (role !== "ADMIN" && role !== "TEACHER")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await segmentData.params;
  await galleryRepo.deleteGalleryItem(id);
  return NextResponse.json({ success: true });
}
