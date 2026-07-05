import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { materialsRepo, type MaterialInput } from "@meserete/backend";
import MaterialForm from "@/components/admin/MaterialForm";

type Params = Promise<{ id: string }>;

export default async function AdminMaterialFormPage({ params }: { params: Params }) {
  const { id } = await params;
  const t = await getTranslations("admin.materials");
  const isNew = id === "new";

  let initialData: MaterialInput | undefined;
  if (!isNew) {
    const item = await materialsRepo.getMaterialById(id);
    if (!item) notFound();
    initialData = {
      title: item.title,
      description: item.description ?? "",
      classGrade: item.classGrade,
      fileType: item.fileType,
      fileUrl: item.fileUrl,
      fileSizeKb: item.fileSizeKb ?? undefined,
    };
  }

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {isNew ? t("formTitleNew") : t("formTitleEdit")}
      </h1>
      <MaterialForm id={isNew ? undefined : id} initialData={initialData} />
    </div>
  );
}
