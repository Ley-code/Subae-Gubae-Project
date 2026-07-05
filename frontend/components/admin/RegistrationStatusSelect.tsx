"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

const STATUSES = ["PENDING", "REVIEWED", "APPROVED", "REJECTED"] as const;
type Status = (typeof STATUSES)[number];

export default function RegistrationStatusSelect({
  id,
  status,
}: {
  id: string;
  status: Status;
}) {
  const t = useTranslations("admin.registrations");
  const router = useRouter();
  const [value, setValue] = useState<Status>(status);
  const [isPending, startTransition] = useTransition();

  const labels: Record<Status, string> = {
    PENDING: t("statusPending"),
    REVIEWED: t("statusReviewed"),
    APPROVED: t("statusApproved"),
    REJECTED: t("statusRejected"),
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as Status;
    setValue(next);
    await fetch(`/api/registrations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={isPending}
      className="rounded-md border-[1.5px] px-3 py-1.5 font-cardo text-sm outline-none disabled:opacity-60"
      style={{
        borderColor: "var(--color-accent-gold)",
        background: "rgba(255,255,255,.6)",
        color: "var(--color-ink)",
      }}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {labels[s]}
        </option>
      ))}
    </select>
  );
}
