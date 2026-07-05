"use client";

import { useTranslations } from "next-intl";

type CsvExportButtonProps = {
  filename: string;
  headers: string[];
  rows: (string | number | null | undefined)[][];
};

function escapeCsvCell(value: string | number | null | undefined) {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export default function CsvExportButton({ filename, headers, rows }: CsvExportButtonProps) {
  const t = useTranslations("admin.registrations");

  const handleExport = () => {
    const lines = [headers, ...rows].map((row) => row.map(escapeCsvCell).join(","));
    const csv = "﻿" + lines.join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="rounded px-4 py-2 font-ethiopic text-sm font-semibold"
      style={{
        border: "1.5px solid var(--color-accent-gold)",
        color: "var(--color-primary-700)",
        background: "transparent",
      }}
    >
      {t("exportCsv")}
    </button>
  );
}
