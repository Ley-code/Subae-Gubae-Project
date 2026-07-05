"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { donationIntentSchema, type DonationIntentInput } from "@meserete/backend";

export default function DonationInterestForm() {
  const t = useTranslations("donate");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<DonationIntentInput>({
    resolver: zodResolver(donationIntentSchema),
  });

  const onSubmit = async (data: DonationIntentInput) => {
    const res = await fetch("/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="font-cardo text-lg" style={{ color: "var(--color-accent-green-dark)" }}>
        {t("thanks")}
      </p>
    );
  }

  const inputStyle: React.CSSProperties = {
    borderColor: "var(--color-accent-gold)",
    background: "rgba(255,255,255,.6)",
    color: "var(--color-ink)",
  };
  const baseInput = "rounded-md border-[1.5px] px-4 py-2.5 font-cardo text-[15px] outline-none w-full";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="font-ethiopic text-sm font-semibold" style={{ color: "var(--color-primary-700)" }}>
          {t("name")}
        </span>
        <input className={baseInput} style={inputStyle} {...register("donorName")} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="font-ethiopic text-sm font-semibold" style={{ color: "var(--color-primary-700)" }}>
          {t("amount")}
        </span>
        <input
          type="number"
          className={baseInput}
          style={inputStyle}
          {...register("amount", { valueAsNumber: true })}
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btnp mt-2 rounded px-6 py-3 font-ethiopic font-semibold disabled:opacity-60"
        style={{
          background: "linear-gradient(180deg, var(--color-accent-gold-light), var(--color-accent-gold))",
          color: "var(--color-primary-900)",
        }}
      >
        {t("submit")}
      </button>
    </form>
  );
}
