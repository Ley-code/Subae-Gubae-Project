"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { hymnSchema, type HymnInput, HYMN_CATEGORIES } from "@meserete/backend";
import { Field, inputStyle, baseInput } from "./FormField";
import FileUploadField from "./FileUploadField";

type HymnFormProps = {
  id?: string;
  initialData?: HymnInput;
};

export default function HymnForm({ id, initialData }: HymnFormProps) {
  const t = useTranslations("admin.common");
  const tf = useTranslations("admin.fields");
  const router = useRouter();
  const [submitError, setSubmitError] = useState(false);
  const isNew = !id;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<HymnInput>({
    resolver: zodResolver(hymnSchema),
    defaultValues: initialData ?? {
      slug: "",
      title: "",
      lyrics: "",
      audioUrl: "",
      category: "",
    },
  });

  const onSubmit = async (data: HymnInput) => {
    setSubmitError(false);
    const res = await fetch(isNew ? "/api/mezmur" : `/api/mezmur/${id}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setSubmitError(true);
      return;
    }

    router.push("/admin/mezmur");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Field label={tf("slug")} hint={tf("slugHint")} error={errors.slug?.message}>
        <input className={baseInput} style={inputStyle} {...register("slug")} />
      </Field>

      <Field label={t("title")} error={errors.title?.message}>
        <input className={baseInput} style={inputStyle} {...register("title")} />
      </Field>

      <Field label={t("category")}>
        <select className={baseInput} style={inputStyle} {...register("category")}>
          <option value="">—</option>
          {HYMN_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </Field>

      <Field label={tf("lyrics")} error={errors.lyrics?.message}>
        <textarea rows={14} className={baseInput} style={inputStyle} {...register("lyrics")} />
      </Field>

      <Controller
        control={control}
        name="audioUrl"
        render={({ field }) => (
          <FileUploadField label={tf("audioUrl")} value={field.value} onUploaded={field.onChange} />
        )}
      />

      {submitError && (
        <p className="font-cardo text-sm" style={{ color: "var(--color-accent-red)" }}>
          {t("error")}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btnp mt-2 rounded px-6 py-3 font-ethiopic font-semibold disabled:opacity-60"
          style={{
            background: "linear-gradient(180deg, var(--color-accent-gold-light), var(--color-accent-gold))",
            color: "var(--color-primary-900)",
          }}
        >
          {isSubmitting ? t("saving") : t("save")}
        </button>
      </div>
    </form>
  );
}
