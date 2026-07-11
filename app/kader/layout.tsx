import KaderSidebar from "@/components/layout/KaderSidebar";

export default function KaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-bg">
      <KaderSidebar />
      <main className="flex-1 ml-[280px] flex flex-col min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
