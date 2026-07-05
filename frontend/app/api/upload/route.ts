import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/auth";

// CLOUDINARY_URL env var (cloudinary://<key>:<secret>@<cloud_name>) configures
// this automatically — no explicit cloudinary.config() call needed.

export async function POST(request: Request) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || (role !== "ADMIN" && role !== "TEACHER")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "meserete-haimanot", resource_type: "auto" },
      (error, uploadResult) => {
        if (error || !uploadResult) return reject(error);
        resolve(uploadResult as { secure_url: string });
      }
    );
    uploadStream.end(buffer);
  });

  return NextResponse.json({ url: result.secure_url });
}
