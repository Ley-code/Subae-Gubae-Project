import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { newsRepo, type NewsInput } from "@meserete/backend";
import NewsForm from "@/components/admin/NewsForm";

type Params = Promise<{ id: string }>;

export default async function AdminNewsFormPage({ params }: { params: Params }) {
  const { id } = await params;
  const t = await getTranslations("admin.news");
  const isNew = id === "new";

  let initialData: NewsInput | undefined;
  if (!isNew) {
    const item = await newsRepo.getNewsById(id);
    if (!item) notFound();
    initialData = {
      slug: item.slug,
      title: item.title,
      body: item.body,
      coverImage: item.coverImage ?? "",
      published: item.published,
    };
  }

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {isNew ? t("formTitleNew") : t("formTitleEdit")}
      </h1>
      <NewsForm id={isNew ? undefined : id} initialData={initialData} />
    </div>
  );
}
