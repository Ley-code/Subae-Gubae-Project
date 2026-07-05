import { galleryRepo } from "@meserete/backend";
import GalleryListPage from "@/components/admin/GalleryListPage";

export default async function AdminGalleryListPage() {
  const rows = await galleryRepo.listGalleryItems();
  return <GalleryListPage rows={rows} />;
}
