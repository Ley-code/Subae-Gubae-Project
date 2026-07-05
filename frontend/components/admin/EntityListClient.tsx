"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import DataTable, { type Column } from "./DataTable";

type EntityListClientProps<T extends { id: string }> = {
  rows: T[];
  columns: Column<T>[];
  basePath: string;
  apiPath: string;
  editable?: boolean;
};

export default function EntityListClient<T extends { id: string }>({
  rows,
  columns,
  basePath,
  apiPath,
  editable = true,
}: EntityListClientProps<T>) {
  const t = useTranslations("admin.common");
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleDelete = async (row: T) => {
    setError(false);
    const res = await fetch(`${apiPath}/${row.id}`, { method: "DELETE" });
    if (!res.ok) {
      setError(true);
      return;
    }
    router.refresh();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Link
          href={`${basePath}/new`}
          className="btnp rounded px-5 py-2.5 font-ethiopic text-sm font-semibold no-underline"
          style={{
            background: "linear-gradient(180deg, var(--color-accent-gold-light), var(--color-accent-gold))",
            color: "var(--color-primary-900)",
          }}
        >
          {t("create")}
        </Link>
      </div>

      {error && (
        <p className="mb-4 font-cardo text-sm" style={{ color: "var(--color-accent-red)" }}>
          {t("error")}
        </p>
      )}

      {rows.length === 0 ? (
        <p className="font-cardo" style={{ color: "var(--color-ink-soft)" }}>
          {t("empty")}
        </p>
      ) : (
        <DataTable
          rows={rows}
          columns={columns}
          editHref={editable ? (row) => `${basePath}/${row.id}` : undefined}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
