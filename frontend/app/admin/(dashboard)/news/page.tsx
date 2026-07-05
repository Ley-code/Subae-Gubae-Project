import { newsRepo } from "@meserete/backend";
import NewsListPage from "@/components/admin/NewsListPage";

export default async function AdminNewsListPage() {
  const rows = await newsRepo.listAllNews();
  return <NewsListPage rows={rows} />;
}
