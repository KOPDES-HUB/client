"use client";

import { AppIcon } from "@/components/ui/app-icon";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/auth-store";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

const adminNavItems = [
  { label: "Overview", href: "/admin", icon: "dashboard" },
  { label: "Anggota/KTA", href: "/admin/anggota", icon: "assignment_ind" },
  { label: "LMS", href: "/admin/lms", icon: "school" },
  { label: "Simpanan", href: "/admin/simpanan", icon: "account_balance_wallet" },
  { label: "E-Voting", href: "/admin/voting", icon: "how_to_vote" },
  { label: "E-RAT", href: "/admin/rat", icon: "groups" },
  { label: "Unit Usaha", href: "/admin/unit-usaha", icon: "storefront" },
  { label: "Kelayakan Keuangan", href: "/admin/kelayakan-keuangan", icon: "query_stats" },
  { label: "Inventaris Produk", href: "/admin/inventaris", icon: "inventory_2" },
  { label: "Transaksi", href: "/admin/transaksi", icon: "receipt_long" },
  { label: "Partisipasi", href: "/admin/partisipasi", icon: "analytics" },
  { label: "Kader", href: "/admin/kader", icon: "supervisor_account" },
  { label: "Notifikasi WA", href: "/admin/notifikasi", icon: "chat" },
  { label: "Referral", href: "/admin/referral", icon: "group_add" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);

  const isActive = (href: string) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(href));

  const handleLogout = () => {
    clearUser();
    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen max-h-screen w-[280px] flex-col overflow-hidden bg-inverse-surface py-6 shadow-lg">
      {/* Header — tetap di atas */}
      <div className="shrink-0 px-6">
        <h1 className="text-headline-md font-headline-md text-primary-fixed">SIMPUL</h1>
        <p className="text-label-xs font-label-xs text-secondary-fixed-dim opacity-70">
          Admin Panel
        </p>
      </div>

      <div className="mx-4 mt-6 mb-4 shrink-0 rounded-xl bg-white/10 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
          {user ? getInitials(user.username) : "—"}
        </div>
        <div className="min-w-0 overflow-hidden">
          <p className="text-label-sm font-label-sm text-white truncate">
            {user?.username ?? "Tamu"}
          </p>
          <p className="text-[10px] text-secondary-fixed-dim truncate">
            {user?.id ?? "-"}
          </p>
        </div>
      </div>

      {/* Nav — scrollable jika menu melebihi tinggi layar */}
      <div className="sidebar-scroll min-h-0 flex-1 overflow-y-auto px-4" data-lenis-prevent>
        <nav className="space-y-1 pb-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-primary text-white active-pill-shadow"
                  : "text-secondary-fixed-dim hover:text-white hover:bg-white/10"
              }`}
            >
              <AppIcon name={item.icon} className="text-[20px]" />
              <span className="text-label-sm font-label-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer — tetap di bawah */}
      <div className="shrink-0 border-t border-white/10 px-4 pt-4 space-y-1">
        <Link
          href="/admin/pengaturan"
          className="flex items-center gap-3 text-secondary-fixed-dim hover:text-white p-3 rounded-lg transition-all"
        >
          <AppIcon name="settings" className="text-[20px]" />
          <span className="text-label-sm font-label-sm">Pengaturan</span>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg p-3 text-red-400 transition-all hover:text-red-300"
        >
          <AppIcon name="logout" className="text-[20px]" />
          <span className="text-label-sm font-label-sm">Keluar</span>
        </button>
      </div>
    </aside>
  );
}
