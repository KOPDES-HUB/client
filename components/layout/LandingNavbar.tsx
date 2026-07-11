"use client";

import { AppIcon } from "@/components/ui/app-icon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Fitur", href: "#fitur" },
  { label: "Layanan", href: "#layanan" },
  { label: "Statistik", href: "#statistik" },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-surface-bg/90 backdrop-blur-md border-b border-outline-variant shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="flex items-center justify-between max-w-container-max mx-auto px-6 md:px-8 h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo.png"
            alt="SIMPUL"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
          <div className="leading-none">
            <span
              className={`block text-xl font-semibold font-headline-md tracking-tight transition-colors ${
                scrolled ? "text-inverse-surface" : "text-zinc-200"
              }`}
            >
              SIMPUL
            </span>
            <span
              className={`block text-[10px] font-semibold uppercase tracking-widest transition-colors ${
                scrolled ? "text-on-surface-variant" : "text-white/70"
              }`}
            >
              Merah Putih
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative text-label-sm font-label-sm transition-colors ${
                scrolled
                  ? "text-on-surface-variant hover:text-primary"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-primary" : "bg-white"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className={`px-2 text-label-sm font-label-sm transition-colors ${
              scrolled
                ? "text-on-surface-variant hover:text-primary"
                : "text-white/90 hover:text-white"
            }`}
          >
            Masuk
          </Link>
          <Link
            href="/cari-koperasi"
            className="group flex items-center gap-1.5 bg-primary text-white px-6 py-2.5 rounded-lg text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-md shadow-primary/30 hover:-translate-y-0.5"
          >
            Daftar Sekarang
            <AppIcon
              name="arrow_forward"
              className="text-[14px] transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className={`md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
            scrolled
              ? "text-on-surface hover:bg-mint-200/50"
              : "text-white hover:bg-white/10"
          }`}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <AppIcon name={mobileOpen ? "close" : "menu"} className="text-2xl" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden bg-surface-bg/95 backdrop-blur-md transition-all duration-300 ${
          mobileOpen ? "max-h-96 border-t border-outline-variant" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-on-surface text-label-sm font-label-sm border-b border-outline-variant/40 last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-center py-2.5 border border-outline-variant rounded-lg text-label-sm font-label-sm text-on-surface"
            >
              Masuk
            </Link>
            <Link
              href="/cari-koperasi"
              onClick={() => setMobileOpen(false)}
              className="text-center bg-primary text-white py-2.5 rounded-lg text-label-sm font-label-sm"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
