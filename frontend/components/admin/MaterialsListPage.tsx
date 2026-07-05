"use client";

import { useTranslations } from "next-intl";
import EntityListClient from "./EntityListClient";
import type { Column } from "./DataTable";
import type { materialsRepo } from "@meserete/backend";

type MaterialRow = Awaited<ReturnType<typeof materialsRepo.listMaterials>>[number];

export default function MaterialsListPage({ rows }: { rows: MaterialRow[] }) {
  const t = useTranslations("admin");

  const columns: Column<MaterialRow>[] = [
    { header: t("common.title"), cell: (row) => row.title },
    { header: t("fields.classGrade"), cell: (row) => row.classGrade },
    { header: t("fields.fileType"), cell: (row) => row.fileType },
  ];

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {t("materials.listTitle")}
      </h1>
      <EntityListClient rows={rows} columns={columns} basePath="/admin/materials" apiPath="/api/materials" />
    </div>
  );
}
