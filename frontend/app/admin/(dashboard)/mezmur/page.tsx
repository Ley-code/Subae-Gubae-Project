import { mezmurRepo } from "@meserete/backend";
import MezmurListPage from "@/components/admin/MezmurListPage";

export default async function AdminMezmurListPage() {
  const rows = await mezmurRepo.listHymns();
  return <MezmurListPage rows={rows} />;
}
