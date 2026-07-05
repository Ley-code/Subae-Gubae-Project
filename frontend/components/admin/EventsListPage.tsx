"use client";

import { useTranslations } from "next-intl";
import EntityListClient from "./EntityListClient";
import type { Column } from "./DataTable";
import type { eventsRepo } from "@meserete/backend";

type EventRow = Awaited<ReturnType<typeof eventsRepo.listAllEvents>>[number];

function formatDate(date: Date | string) {
  return new Date(date).toLocaleString("am-ET", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EventsListPage({ rows }: { rows: EventRow[] }) {
  const t = useTranslations("admin");

  const columns: Column<EventRow>[] = [
    { header: t("common.title"), cell: (row) => row.title },
    { header: t("fields.startsAt"), cell: (row) => formatDate(row.startsAt) },
    {
      header: t("common.status"),
      cell: (row) => (row.published ? t("common.published") : t("common.draft")),
    },
  ];

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {t("events.listTitle")}
      </h1>
      <EntityListClient rows={rows} columns={columns} basePath="/admin/events" apiPath="/api/events" />
    </div>
  );
}
