import { NextResponse } from "next/server";
import { materialsRepo } from "@meserete/backend";

type Params = Promise<{ id: string }>;

export async function GET(_request: Request, segmentData: { params: Params }) {
  const { id } = await segmentData.params;
  const material = await materialsRepo.getMaterialById(id);

  if (!material) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.redirect(material.fileUrl);
}
