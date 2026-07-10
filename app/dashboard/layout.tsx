import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface-bg">
      <Sidebar />
      <main className="flex-grow ml-[280px] min-h-screen flex flex-col">
        {children}
      </main>
    </div>
  );
}
