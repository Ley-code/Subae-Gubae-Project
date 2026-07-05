"use client";

import { useTranslations } from "next-intl";
import EntityListClient from "./EntityListClient";
import type { Column } from "./DataTable";
import type { articlesRepo } from "@meserete/backend";

type ArticleRow = Awaited<ReturnType<typeof articlesRepo.listAllArticles>>[number];

export default function ArticlesListPage({ rows }: { rows: ArticleRow[] }) {
  const t = useTranslations("admin");

  const columns: Column<ArticleRow>[] = [
    { header: t("common.title"), cell: (row) => row.title },
    { header: t("common.category"), cell: (row) => row.category ?? t("common.none") },
    {
      header: t("common.status"),
      cell: (row) => (row.published ? t("common.published") : t("common.draft")),
    },
  ];

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {t("articles.listTitle")}
      </h1>
      <EntityListClient rows={rows} columns={columns} basePath="/admin/articles" apiPath="/api/articles" />
    </div>
  );
}
