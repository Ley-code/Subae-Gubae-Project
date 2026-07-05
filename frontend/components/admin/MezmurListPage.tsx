"use client";

import { useTranslations } from "next-intl";
import EntityListClient from "./EntityListClient";
import type { Column } from "./DataTable";
import type { mezmurRepo } from "@meserete/backend";

type HymnRow = Awaited<ReturnType<typeof mezmurRepo.listHymns>>[number];

export default function MezmurListPage({ rows }: { rows: HymnRow[] }) {
  const t = useTranslations("admin");

  const columns: Column<HymnRow>[] = [
    { header: t("common.title"), cell: (row) => row.title },
    { header: t("common.category"), cell: (row) => row.category ?? t("common.none") },
  ];

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {t("mezmur.listTitle")}
      </h1>
      <EntityListClient rows={rows} columns={columns} basePath="/admin/mezmur" apiPath="/api/mezmur" />
    </div>
  );
}
