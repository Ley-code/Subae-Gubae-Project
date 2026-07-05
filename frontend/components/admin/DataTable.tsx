"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export type Column<T> = {
  header: string;
  cell: (row: T) => React.ReactNode;
};

type DataTableProps<T extends { id: string }> = {
  rows: T[];
  columns: Column<T>[];
  editHref?: (row: T) => string;
  onDelete?: (row: T) => void;
};

export default function DataTable<T extends { id: string }>({
  rows,
  columns,
  editHref,
  onDelete,
}: DataTableProps<T>) {
  const t = useTranslations("admin.common");

  return (
    <div className="overflow-x-auto rounded-lg border-[1.5px]" style={{ borderColor: "var(--color-accent-gold)" }}>
      <table className="w-full border-collapse font-cardo text-sm">
        <thead>
          <tr style={{ background: "var(--color-primary-800)" }}>
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-3 text-left font-ethiopic text-parchment">
                {col.header}
              </th>
            ))}
            {(editHref || onDelete) && (
              <th className="px-4 py-3 text-left font-ethiopic text-parchment">{t("actions")}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id}
              style={{
                background: i % 2 === 0 ? "rgba(244,239,250,.5)" : "rgba(230,219,241,.3)",
              }}
            >
              {columns.map((col) => (
                <td key={col.header} className="px-4 py-3" style={{ color: "var(--color-ink)" }}>
                  {col.cell(row)}
                </td>
              ))}
              {(editHref || onDelete) && (
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    {editHref && (
                      <Link href={editHref(row)} className="font-semibold" style={{ color: "var(--color-primary-600)" }}>
                        {t("edit")}
                      </Link>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(t("confirmDelete"))) onDelete(row);
                        }}
                        style={{ color: "var(--color-accent-red)" }}
                      >
                        {t("delete")}
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
