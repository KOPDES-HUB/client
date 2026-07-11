import { RequireAuth } from "@/components/auth/RequireAuth";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth requireAdmin>
      <div className="flex min-h-screen bg-surface-bg">
        <AdminSidebar />
        <main className="flex-grow ml-[280px] min-h-screen flex flex-col">
          {children}
        </main>
      </div>
    </RequireAuth>
  );
}
