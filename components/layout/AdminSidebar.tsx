"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavItems = [
  { label: "Overview",     href: "/admin",            icon: "dashboard" },
  { label: "Anggota/KTA",  href: "/admin/anggota",   icon: "assignment_ind" },
  { label: "LMS",          href: "/admin/lms",        icon: "school" },
  { label: "Simpanan",     href: "/admin/simpanan",   icon: "account_balance_wallet" },
  { label: "E-Voting",     href: "/admin/voting",     icon: "how_to_vote" },
  { label: "E-RAT",        href: "/admin/rat",        icon: "groups" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(href));

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-inverse-surface shadow-lg flex flex-col py-6 gap-2 z-50">
      {/* Brand */}
      <div className="px-6 mb-6">
        <h1 className="text-headline-md font-headline-md text-primary-fixed">SIMPUL</h1>
        <p className="text-label-xs font-label-xs text-secondary-fixed-dim opacity-70">
          Admin Panel
        </p>
      </div>

      {/* Admin profile mini card */}
      <div className="mx-4 mb-4 p-4 rounded-xl bg-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          AK
        </div>
        <div className="overflow-hidden">
          <p className="text-label-sm font-label-sm text-white truncate">Admin Koperasi</p>
          <p className="text-[10px] text-secondary-fixed-dim truncate">ID: SMP-ADM-001</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-1 px-4">
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
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className="text-label-sm font-label-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-white/10 pt-4 space-y-1 px-4">
        <Link
          href="/admin/pengaturan"
          className="flex items-center gap-3 text-secondary-fixed-dim hover:text-white p-3 rounded-lg transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span className="text-label-sm font-label-sm">Pengaturan</span>
        </Link>
        <button className="flex items-center gap-3 text-red-400 hover:text-red-300 p-3 rounded-lg transition-all w-full">
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-label-sm font-label-sm">Keluar</span>
        </button>
      </div>
    </aside>
  );
}
