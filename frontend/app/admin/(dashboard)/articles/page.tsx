import { articlesRepo } from "@meserete/backend";
import ArticlesListPage from "@/components/admin/ArticlesListPage";

export default async function AdminArticlesListPage() {
  const rows = await articlesRepo.listAllArticles();
  return <ArticlesListPage rows={rows} />;
}
