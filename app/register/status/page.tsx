"use client";

import Link from "next/link";
import { useAuthSession } from "@/hooks/use-auth-session";

export default function StatusKTAPage() {
  const { isAuthenticated, isLoading } = useAuthSession();
  const homeHref = isAuthenticated ? "/dashboard" : "/";

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center py-12 px-4">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="text-headline-md font-headline-md text-primary font-bold">SIMPUL</span>
        <span className="text-label-sm font-label-sm text-on-surface-variant">Merah Putih</span>
      </Link>

      <div className="max-w-2xl w-full">
        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-md border border-mint-200 p-10 flex flex-col items-center text-center">
          {/* Icon Badge */}
          <div className="w-20 h-20 bg-surface-bg rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[40px] text-primary">schedule</span>
          </div>

          {/* Status Pill */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-mint-200/40 text-on-surface-variant rounded-full text-label-sm font-label-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Menunggu Verifikasi
          </span>

          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-3">
            Pengajuan Sedang Diverifikasi
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-md leading-relaxed mb-10">
            Tim admin koperasi sedang meninjau dokumen Anda. Proses verifikasi biasanya memakan waktu 1–3 hari
            kerja. Anda akan mendapat notifikasi setelah proses selesai.
          </p>

          {/* Timeline */}
          <div className="w-full max-w-lg mb-10">
            <div className="flex items-start gap-0">
              {/* Step 1 — Done */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
                <div className="w-full h-1 bg-primary mt-4 mb-0 -mr-px"></div>
                <p className="text-label-xs font-label-xs text-primary mt-3 font-bold">Diajukan</p>
              </div>

              {/* Step 2 — In Progress */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full border-2 border-primary bg-white flex items-center justify-center relative">
                  <span className="w-3 h-3 rounded-full bg-primary animate-ping absolute"></span>
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                </div>
                <div className="w-full h-1 bg-mint-200 mt-4"></div>
                <p className="text-label-xs font-label-xs text-on-surface-variant mt-3">Diverifikasi Admin</p>
              </div>

              {/* Step 3 — Pending */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full border-2 border-outline-variant bg-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-outline-variant text-[18px]">badge</span>
                </div>
                <div className="w-full h-1 bg-mint-200 mt-4"></div>
                <p className="text-label-xs font-label-xs text-on-surface-variant mt-3">KTA Aktif</p>
              </div>
            </div>
          </div>

          {/* Detail info */}
          <div className="w-full bg-surface-bg rounded-xl p-5 text-left mb-8">
            <h3 className="text-label-sm font-label-sm text-on-surface mb-3">Detail Pengajuan</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-body-md">
                <span className="text-on-surface-variant">Tanggal Pengajuan</span>
                <span className="font-semibold text-on-surface">10 Juli 2024</span>
              </div>
              <div className="flex justify-between text-body-md">
                <span className="text-on-surface-variant">Nomor Referensi</span>
                <span className="font-semibold text-on-surface font-mono">REF-2024-0710</span>
              </div>
              <div className="flex justify-between text-body-md">
                <span className="text-on-surface-variant">Status Dokumen</span>
                <span className="text-amber-600 font-semibold">Sedang Ditinjau</span>
              </div>
            </div>
          </div>

          <Link
            href={homeHref}
            className="px-8 py-3 border border-primary text-primary rounded-xl text-label-sm font-label-sm hover:bg-primary/5 transition-all"
          >
            {isLoading ? "Memuat..." : "Kembali ke Beranda"}
          </Link>
        </div>
      </div>
    </div>
  );
}
