import { getTranslations } from "next-intl/server";
import { registrationsRepo } from "@meserete/backend";
import type { RegistrationStatus } from "@meserete/backend";
import RegistrationStatusSelect from "@/components/admin/RegistrationStatusSelect";
import CsvExportButton from "@/components/admin/CsvExportButton";

type SearchParams = Promise<{ status?: string }>;

const STATUSES: RegistrationStatus[] = ["PENDING", "REVIEWED", "APPROVED", "REJECTED"];

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("am-ET", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function AdminRegistrationsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations("admin.registrations");
  const tc = await getTranslations("admin.common");
  const { status } = await searchParams;
  const validStatus = STATUSES.includes(status as RegistrationStatus)
    ? (status as RegistrationStatus)
    : undefined;

  const rows = await registrationsRepo.listRegistrations(validStatus);

  const statusLabels: Record<RegistrationStatus, string> = {
    PENDING: t("statusPending"),
    REVIEWED: t("statusReviewed"),
    APPROVED: t("statusApproved"),
    REJECTED: t("statusRejected"),
  };

  const csvRows = rows.map((row) => [
    row.fullName,
    row.phone,
    row.email ?? "",
    row.classGrade ?? "",
    statusLabels[row.status],
    formatDate(row.createdAt),
  ]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
          {t("listTitle")}
        </h1>
        <CsvExportButton
          filename="registrations.csv"
          headers={[t("fullName"), t("phone"), "Email", t("classGrade"), tc("status"), t("createdAt")]}
          rows={csvRows}
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <a
          href="/admin/registrations"
          className="navlink rounded-full border px-4 py-1.5 font-ethiopic text-sm no-underline"
          style={{
            borderColor: "var(--color-accent-gold)",
            background: !validStatus ? "var(--color-primary-700)" : "transparent",
            color: !validStatus ? "var(--color-parchment)" : "var(--color-primary-700)",
          }}
        >
          {t("all")}
        </a>
        {STATUSES.map((s) => (
          <a
            key={s}
            href={`/admin/registrations?status=${s}`}
            className="navlink rounded-full border px-4 py-1.5 font-ethiopic text-sm no-underline"
            style={{
              borderColor: "var(--color-accent-gold)",
              background: validStatus === s ? "var(--color-primary-700)" : "transparent",
              color: validStatus === s ? "var(--color-parchment)" : "var(--color-primary-700)",
            }}
          >
            {statusLabels[s]}
          </a>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="font-cardo" style={{ color: "var(--color-ink-soft)" }}>
          {t("empty")}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border-[1.5px]" style={{ borderColor: "var(--color-accent-gold)" }}>
          <table className="w-full border-collapse font-cardo text-sm">
            <thead>
              <tr style={{ background: "var(--color-primary-800)" }}>
                <th className="px-4 py-3 text-left font-ethiopic text-parchment">{t("fullName")}</th>
                <th className="px-4 py-3 text-left font-ethiopic text-parchment">{t("phone")}</th>
                <th className="px-4 py-3 text-left font-ethiopic text-parchment">{t("classGrade")}</th>
                <th className="px-4 py-3 text-left font-ethiopic text-parchment">{t("createdAt")}</th>
                <th className="px-4 py-3 text-left font-ethiopic text-parchment">{tc("status")}</th>
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
                  <td className="px-4 py-3" style={{ color: "var(--color-ink)" }}>
                    {row.fullName}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-ink)" }}>
                    {row.phone}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-ink)" }}>
                    {row.classGrade ?? tc("none")}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-ink)" }}>
                    {formatDate(row.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <RegistrationStatusSelect id={row.id} status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
