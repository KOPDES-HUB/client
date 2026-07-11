"use client";

import { AppIcon } from "@/components/ui/app-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

const kaderNavItems = [
  { label: "Bantu Anggota",  href: "/kader",           icon: "volunteer_activism" },
  { label: "Log Aktivitas",  href: "/kader/log",       icon: "history" },
];

export default function KaderSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/kader" && pathname.startsWith(href));

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-inverse-surface shadow-lg flex flex-col py-6 gap-2 z-50">
      {/* Brand */}
      <div className="px-6 mb-6">
        <h1 className="text-headline-md font-headline-md text-primary-fixed">SIMPUL</h1>
        <p className="text-label-xs font-label-xs text-secondary-fixed-dim opacity-70">
          Panel Kader
        </p>
      </div>

      {/* Kader profile mini card */}
      <div className="mx-4 mb-4 p-4 rounded-xl bg-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-mint-200 flex items-center justify-center text-inverse-surface font-bold text-sm flex-shrink-0">
          KD
        </div>
        <div className="overflow-hidden">
          <p className="text-label-sm font-label-sm text-white truncate">Kader Keliling</p>
          <p className="text-[10px] text-secondary-fixed-dim truncate">Wilayah: Dusun Maju</p>
        </div>
      </div>

      {/* Role badge */}
      <div className="mx-4 mb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 rounded-lg text-primary-fixed text-[11px] font-semibold">
          <AppIcon name="shield" className="text-[14px]" />
          Kader Keliling
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-1 px-4">
        {kaderNavItems.map((item) => (
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

      {/* Footer */}
      <div className="mt-auto border-t border-white/10 pt-4 px-4">
        <div className="text-[11px] text-secondary-fixed-dim/60 px-3 mb-2">
          Semua aksi tercatat sebagai audit trail otomatis.
        </div>
        <button className="flex items-center gap-3 text-red-400 hover:text-red-300 p-3 rounded-lg transition-all w-full">
          <AppIcon name="logout" className="text-[20px]" />
          <span className="text-label-sm font-label-sm">Keluar</span>
        </button>
      </div>
    </aside>
  );
}
