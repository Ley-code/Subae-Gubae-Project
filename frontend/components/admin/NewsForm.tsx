"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { newsSchema, type NewsInput } from "@meserete/backend";
import { Field, inputStyle, baseInput } from "./FormField";
import FileUploadField from "./FileUploadField";

type NewsFormProps = {
  id?: string;
  initialData?: NewsInput;
};

export default function NewsForm({ id, initialData }: NewsFormProps) {
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
  } = useForm<NewsInput>({
    resolver: zodResolver(newsSchema),
    defaultValues: initialData ?? {
      slug: "",
      title: "",
      body: "",
      coverImage: "",
      published: false,
    },
  });

  const onSubmit = async (data: NewsInput) => {
    setSubmitError(false);
    const res = await fetch(isNew ? "/api/news" : `/api/news/${id}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setSubmitError(true);
      return;
    }

    router.push("/admin/news");
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

      <Field label={tf("body")} error={errors.body?.message}>
        <textarea rows={10} className={baseInput} style={inputStyle} {...register("body")} />
      </Field>

      <Controller
        control={control}
        name="coverImage"
        render={({ field }) => (
          <FileUploadField label={tf("coverImage")} value={field.value} onUploaded={field.onChange} />
        )}
      />

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("published")} />
        <span className="font-ethiopic text-sm font-semibold" style={{ color: "var(--color-primary-700)" }}>
          {t("published")}
        </span>
      </label>

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
