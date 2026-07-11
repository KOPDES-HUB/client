"use client";

import { AppIcon } from "@/components/ui/app-icon";
import Link from "next/link";

interface AdminTopBarProps {
  title: string;
  breadcrumb?: { label: string; href?: string }[];
  showSearch?: boolean;
}

export default function AdminTopBar({ title, breadcrumb, showSearch = true }: AdminTopBarProps) {
  return (
    <header className="flex justify-between items-center h-16 px-8 w-full sticky top-0 z-40 bg-white shadow-sm border-b border-outline-variant/30">
      <div className="flex items-center gap-4">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav className="flex items-center gap-1.5 text-label-sm font-label-sm text-on-surface-variant">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-primary transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-primary font-bold">{crumb.label}</span>
                )}
                {i < breadcrumb.length - 1 && (
                  <AppIcon name="chevron_right" className="text-[14px] text-outline-variant" />
                )}
              </span>
            ))}
          </nav>
        ) : (
          <h2 className="text-headline-md font-headline-md text-primary">{title}</h2>
        )}
      </div>

      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative hidden md:flex items-center">
            <AppIcon name="search" className="absolute left-3 text-[18px] text-outline" />
            <input
              type="text"
              placeholder="Cari anggota, transaksi..."
              className="pl-10 pr-4 py-2 rounded-lg border border-outline-variant/50 bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-60 transition-all"
            />
          </div>
        )}

        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
          <AppIcon name="notifications" className="text-[20px] text-on-surface-variant" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-inverse-surface flex items-center justify-center text-white text-sm font-bold">
            AK
          </div>
          <div className="hidden md:block">
            <p className="text-label-sm font-label-sm text-on-surface leading-none">Admin Koperasi</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5">Administrator</p>
          </div>
          <AppIcon name="expand_more" className="text-[18px] text-on-surface-variant group-hover:text-primary transition-colors" />
        </div>
      </div>
    </header>
  );
}
