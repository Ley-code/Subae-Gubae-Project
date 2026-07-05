import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-10">{children}</div>
    </div>
  );
}
