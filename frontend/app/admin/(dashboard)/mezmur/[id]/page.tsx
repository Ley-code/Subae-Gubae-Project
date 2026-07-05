import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { mezmurRepo, type HymnInput } from "@meserete/backend";
import HymnForm from "@/components/admin/HymnForm";

type Params = Promise<{ id: string }>;

export default async function AdminHymnFormPage({ params }: { params: Params }) {
  const { id } = await params;
  const t = await getTranslations("admin.mezmur");
  const isNew = id === "new";

  let initialData: HymnInput | undefined;
  if (!isNew) {
    const item = await mezmurRepo.getHymnById(id);
    if (!item) notFound();
    initialData = {
      slug: item.slug,
      title: item.title,
      lyrics: item.lyrics,
      audioUrl: item.audioUrl ?? "",
      category: item.category ?? "",
    };
  }

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {isNew ? t("formTitleNew") : t("formTitleEdit")}
      </h1>
      <HymnForm id={isNew ? undefined : id} initialData={initialData} />
    </div>
  );
}
