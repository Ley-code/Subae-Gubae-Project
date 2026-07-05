import { materialsRepo } from "@meserete/backend";
import MaterialsListPage from "@/components/admin/MaterialsListPage";

export default async function AdminMaterialsListPage() {
  const rows = await materialsRepo.listMaterials();
  return <MaterialsListPage rows={rows} />;
}
