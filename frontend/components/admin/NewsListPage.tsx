"use client";

import { useTranslations } from "next-intl";
import EntityListClient from "./EntityListClient";
import type { Column } from "./DataTable";
import type { newsRepo } from "@meserete/backend";

type NewsRow = Awaited<ReturnType<typeof newsRepo.listAllNews>>[number];

function formatDate(date: Date | string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("am-ET", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsListPage({ rows }: { rows: NewsRow[] }) {
  const t = useTranslations("admin");

  const columns: Column<NewsRow>[] = [
    { header: t("common.title"), cell: (row) => row.title },
    {
      header: t("common.status"),
      cell: (row) => (row.published ? t("common.published") : t("common.draft")),
    },
    { header: t("common.date"), cell: (row) => formatDate(row.publishedAt ?? row.createdAt) },
  ];

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {t("news.listTitle")}
      </h1>
      <EntityListClient rows={rows} columns={columns} basePath="/admin/news" apiPath="/api/news" />
    </div>
  );
}
