import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { articlesRepo, type ArticleInput } from "@meserete/backend";
import ArticleForm from "@/components/admin/ArticleForm";

type Params = Promise<{ id: string }>;

export default async function AdminArticleFormPage({ params }: { params: Params }) {
  const { id } = await params;
  const t = await getTranslations("admin.articles");
  const isNew = id === "new";

  let initialData: ArticleInput | undefined;
  if (!isNew) {
    const item = await articlesRepo.getArticleById(id);
    if (!item) notFound();
    initialData = {
      slug: item.slug,
      title: item.title,
      body: item.body,
      coverImage: item.coverImage ?? "",
      category: item.category ?? "",
      published: item.published,
    };
  }

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {isNew ? t("formTitleNew") : t("formTitleEdit")}
      </h1>
      <ArticleForm id={isNew ? undefined : id} initialData={initialData} />
    </div>
  );
}
