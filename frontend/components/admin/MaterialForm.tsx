"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { materialSchema, type MaterialInput, CLASS_GRADES } from "@meserete/backend";
import { Field, inputStyle, baseInput } from "./FormField";
import FileUploadField from "./FileUploadField";

type MaterialFormProps = {
  id?: string;
  initialData?: MaterialInput;
};

const FILE_TYPES = ["PDF", "DOC", "AUDIO", "VIDEO", "OTHER"] as const;

export default function MaterialForm({ id, initialData }: MaterialFormProps) {
  const t = useTranslations("admin.common");
  const tf = useTranslations("admin.fields");
  const tm = useTranslations("admin.materials");
  const router = useRouter();
  const [submitError, setSubmitError] = useState(false);
  const isNew = !id;

  const fileTypeLabels: Record<(typeof FILE_TYPES)[number], string> = {
    PDF: tm("fileTypePdf"),
    DOC: tm("fileTypeDoc"),
    AUDIO: tm("fileTypeAudio"),
    VIDEO: tm("fileTypeVideo"),
    OTHER: tm("fileTypeOther"),
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MaterialInput>({
    resolver: zodResolver(materialSchema),
    defaultValues: initialData ?? {
      title: "",
      description: "",
      classGrade: "",
      fileType: "PDF",
      fileUrl: "",
      fileSizeKb: undefined,
    },
  });

  const onSubmit = async (data: MaterialInput) => {
    setSubmitError(false);
    const res = await fetch(isNew ? "/api/materials" : `/api/materials/${id}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setSubmitError(true);
      return;
    }

    router.push("/admin/materials");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Field label={t("title")} error={errors.title?.message}>
        <input className={baseInput} style={inputStyle} {...register("title")} />
      </Field>

      <Field label={tf("description")}>
        <textarea rows={4} className={baseInput} style={inputStyle} {...register("description")} />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={tf("classGrade")} error={errors.classGrade?.message}>
          <select className={baseInput} style={inputStyle} {...register("classGrade")}>
            <option value="">—</option>
            {CLASS_GRADES.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </Field>

        <Field label={tf("fileType")} error={errors.fileType?.message}>
          <select className={baseInput} style={inputStyle} {...register("fileType")}>
            {FILE_TYPES.map((ft) => (
              <option key={ft} value={ft}>
                {fileTypeLabels[ft]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Controller
        control={control}
        name="fileUrl"
        render={({ field }) => (
          <FileUploadField label={tf("fileUrl")} value={field.value} onUploaded={field.onChange} />
        )}
      />
      {errors.fileUrl && (
        <span className="-mt-3 font-cardo text-xs" style={{ color: "var(--color-accent-red)" }}>
          {errors.fileUrl.message}
        </span>
      )}

      <Field label={tf("fileSizeKb")}>
        <input
          type="number"
          className={baseInput}
          style={inputStyle}
          {...register("fileSizeKb", { valueAsNumber: true })}
        />
      </Field>

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
