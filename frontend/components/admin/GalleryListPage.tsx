"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import EntityListClient from "./EntityListClient";
import type { Column } from "./DataTable";
import type { galleryRepo } from "@meserete/backend";

type GalleryRow = Awaited<ReturnType<typeof galleryRepo.listGalleryItems>>[number];

export default function GalleryListPage({ rows }: { rows: GalleryRow[] }) {
  const t = useTranslations("admin");

  const columns: Column<GalleryRow>[] = [
    {
      header: t("gallery.preview"),
      cell: (row) => (
        <div className="relative h-14 w-14 overflow-hidden rounded-md">
          <Image src={row.thumbnailUrl || row.url} alt={row.title ?? ""} fill className="object-cover" />
        </div>
      ),
    },
    { header: t("common.title"), cell: (row) => row.title ?? t("common.none") },
    { header: t("common.category"), cell: (row) => row.category ?? t("common.none") },
  ];

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {t("gallery.listTitle")}
      </h1>
      <EntityListClient
        rows={rows}
        columns={columns}
        basePath="/admin/gallery"
        apiPath="/api/gallery"
        editable={false}
      />
    </div>
  );
}
