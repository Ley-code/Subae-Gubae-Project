import { getTranslations } from "next-intl/server";
import GalleryForm from "@/components/admin/GalleryForm";

export default async function AdminGalleryNewPage() {
  const t = await getTranslations("admin.gallery");

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {t("formTitleNew")}
      </h1>
      <GalleryForm />
    </div>
  );
}
