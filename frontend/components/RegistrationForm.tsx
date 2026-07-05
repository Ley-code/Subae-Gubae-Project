"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { registrationSchema, type RegistrationInput, CLASS_GRADES } from "@meserete/backend";

const inputStyle: React.CSSProperties = {
  borderColor: "var(--color-accent-gold)",
  background: "rgba(255,255,255,.6)",
  color: "var(--color-ink)",
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-ethiopic text-sm font-semibold" style={{ color: "var(--color-primary-700)" }}>
        {label}
      </span>
      {children}
      {error && (
        <span className="font-cardo text-xs" style={{ color: "var(--color-accent-red)" }}>
          {error}
        </span>
      )}
    </label>
  );
}

export default function RegistrationForm() {
  const t = useTranslations("register");
  const router = useRouter();
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationInput) => {
    setSubmitError(false);
    const res = await fetch("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setSubmitError(true);
      return;
    }

    router.push("/register/success");
  };

  const baseInput =
    "rounded-md border-[1.5px] px-4 py-2.5 font-cardo text-[15px] outline-none";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Field label={t("fullName")} error={errors.fullName?.message}>
        <input className={baseInput} style={inputStyle} {...register("fullName")} />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={t("dateOfBirth")}>
          <input type="date" className={baseInput} style={inputStyle} {...register("dateOfBirth")} />
        </Field>
        <Field label={t("gender")}>
          <select className={baseInput} style={inputStyle} {...register("gender")}>
            <option value="">—</option>
            <option value="male">{t("genderMale")}</option>
            <option value="female">{t("genderFemale")}</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={t("phone")} error={errors.phone?.message}>
          <input className={baseInput} style={inputStyle} {...register("phone")} />
        </Field>
        <Field label={t("email")} error={errors.email?.message}>
          <input type="email" className={baseInput} style={inputStyle} {...register("email")} />
        </Field>
      </div>

      <Field label={t("classGrade")}>
        <select className={baseInput} style={inputStyle} {...register("classGrade")}>
          <option value="">—</option>
          {CLASS_GRADES.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={t("guardianName")}>
          <input className={baseInput} style={inputStyle} {...register("guardianName")} />
        </Field>
        <Field label={t("guardianPhone")}>
          <input className={baseInput} style={inputStyle} {...register("guardianPhone")} />
        </Field>
      </div>

      <Field label={t("address")}>
        <input className={baseInput} style={inputStyle} {...register("address")} />
      </Field>

      <Field label={t("notes")}>
        <textarea rows={3} className={baseInput} style={inputStyle} {...register("notes")} />
      </Field>

      {submitError && (
        <p className="font-cardo text-sm" style={{ color: "var(--color-accent-red)" }}>
          {t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btnp mt-2 rounded px-6 py-3 font-ethiopic font-semibold disabled:opacity-60"
        style={{
          background: "linear-gradient(180deg, var(--color-accent-gold-light), var(--color-accent-gold))",
          color: "var(--color-primary-900)",
        }}
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
