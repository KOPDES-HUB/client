"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "KTA Digital", href: "/dashboard/kta", icon: "badge" },
  { label: "LMS", href: "/dashboard/lms", icon: "school" },
  { label: "Simpanan", href: "/dashboard/simpanan", icon: "account_balance_wallet" },
  { label: "E-Voting", href: "/dashboard/voting", icon: "how_to_vote" },
  { label: "E-RAT", href: "/dashboard/rat", icon: "groups" },
  { label: "Unit Usaha", href: "/dashboard/unit-usaha", icon: "storefront" },
  { label: "Login Harian", href: "/dashboard/daily-login", icon: "local_fire_department" },
  { label: "Promo Gerai", href: "/dashboard/promo", icon: "local_offer" },
  { label: "Transaksi", href: "/dashboard/transaksi", icon: "receipt_long" },
  { label: "Referral", href: "/dashboard/referral", icon: "group_add" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen max-h-screen w-[280px] flex-col overflow-hidden bg-inverse-surface py-6 shadow-lg">
      {/* Header — tetap di atas */}
      <div className="shrink-0 px-6">
        <h1 className="text-headline-md font-headline-md text-primary-fixed">SIMPUL</h1>
        <p className="text-label-xs font-label-xs text-secondary-fixed-dim opacity-70">
          Merah Putih
        </p>
      </div>

      <div className="mx-4 mt-6 mb-4 shrink-0 rounded-xl bg-white/10 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-inverse-surface font-bold text-sm shrink-0">
          BS
        </div>
        <div className="min-w-0 overflow-hidden">
          <p className="text-label-sm font-label-sm text-white truncate">Budi Setiawan</p>
          <p className="text-[10px] text-secondary-fixed-dim truncate">ID: SMP-2024-001</p>
        </div>
      </div>

      {/* Nav — scrollable jika menu melebihi tinggi layar */}
      <div className="sidebar-scroll min-h-0 flex-1 overflow-y-auto px-4">
        <nav className="space-y-1 pb-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-primary text-white active-pill-shadow"
                  : "text-secondary-fixed-dim hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-label-sm font-label-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer — tetap di bawah */}
      <div className="shrink-0 border-t border-white/10 px-4 pt-4 space-y-1">
        <Link
          href="/dashboard/profil"
          className="flex items-center gap-3 text-secondary-fixed-dim hover:text-white p-3 rounded-lg transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">person</span>
          <span className="text-label-sm font-label-sm">Profil</span>
        </Link>
        <Link
          href="/dashboard/pengaturan"
          className="flex items-center gap-3 text-secondary-fixed-dim hover:text-white p-3 rounded-lg transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span className="text-label-sm font-label-sm">Pengaturan</span>
        </Link>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg p-3 text-red-400 transition-all hover:text-red-300"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-label-sm font-label-sm">Keluar</span>
        </button>
      </div>
    </aside>
  );
}
