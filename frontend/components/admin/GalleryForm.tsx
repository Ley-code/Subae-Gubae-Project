"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { galleryItemSchema, type GalleryItemInput, GALLERY_CATEGORIES } from "@meserete/backend";
import { Field, inputStyle, baseInput } from "./FormField";
import FileUploadField from "./FileUploadField";

export default function GalleryForm() {
  const t = useTranslations("admin.common");
  const tf = useTranslations("admin.fields");
  const router = useRouter();
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<GalleryItemInput>({
    resolver: zodResolver(galleryItemSchema),
    defaultValues: {
      title: "",
      mediaType: "IMAGE",
      url: "",
      thumbnailUrl: "",
      category: "",
    },
  });

  const onSubmit = async (data: GalleryItemInput) => {
    setSubmitError(false);
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setSubmitError(true);
      return;
    }

    router.push("/admin/gallery");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Field label={t("title")}>
        <input className={baseInput} style={inputStyle} {...register("title")} />
      </Field>

      <Field label={tf("mediaType")}>
        <select className={baseInput} style={inputStyle} {...register("mediaType")}>
          <option value="IMAGE">{tf("mediaTypeImage")}</option>
          <option value="VIDEO">{tf("mediaTypeVideo")}</option>
        </select>
      </Field>

      <Field label={t("category")}>
        <select className={baseInput} style={inputStyle} {...register("category")}>
          <option value="">—</option>
          {GALLERY_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </Field>

      <Controller
        control={control}
        name="url"
        render={({ field }) => (
          <FileUploadField label={tf("url")} value={field.value} onUploaded={field.onChange} />
        )}
      />
      {errors.url && (
        <span className="-mt-3 font-cardo text-xs" style={{ color: "var(--color-accent-red)" }}>
          {errors.url.message}
        </span>
      )}

      <Controller
        control={control}
        name="thumbnailUrl"
        render={({ field }) => (
          <FileUploadField label={tf("thumbnailUrl")} value={field.value} onUploaded={field.onChange} />
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
