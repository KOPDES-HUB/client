"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function StatusContent() {
  const searchParams = useSearchParams();

  const nama = searchParams.get("nama") ?? "-";
  const email = searchParams.get("email") ?? "-";
  const koperasi = searchParams.get("koperasi") ?? "-";
  const userId = searchParams.get("id") ?? "-";
  const status = searchParams.get("status") ?? "DIAJUKAN";

  const tanggal = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl w-full">
      <div className="bg-white rounded-2xl shadow-md border border-mint-200 p-10 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-surface-bg rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[40px] text-primary">
            schedule
          </span>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-mint-200/40 text-on-surface-variant rounded-full text-label-sm font-label-sm mb-4">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          Menunggu Verifikasi
        </span>

        <h1 className="text-headline-lg font-headline-lg text-on-surface mb-3">
          Pengajuan Berhasil Dikirim
        </h1>
        <p className="text-body-md text-on-surface-variant max-w-md leading-relaxed mb-10">
          Tim admin koperasi sedang meninjau dokumen Anda. Proses verifikasi
          biasanya memakan waktu 1–3 hari kerja. Anda akan mendapat notifikasi
          setelah proses selesai.
        </p>

        <div className="w-full max-w-lg mb-10">
          <div className="flex items-start gap-0">
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md">
                <span
                  className="material-symbols-outlined text-white text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div className="w-full h-1 bg-primary mt-4 mb-0 -mr-px"></div>
              <p className="text-label-xs font-label-xs text-primary mt-3 font-bold">
                Diajukan
              </p>
            </div>

            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full border-2 border-primary bg-white flex items-center justify-center relative">
                <span className="w-3 h-3 rounded-full bg-primary animate-ping absolute"></span>
                <span className="w-3 h-3 rounded-full bg-primary"></span>
              </div>
              <div className="w-full h-1 bg-mint-200 mt-4"></div>
              <p className="text-label-xs font-label-xs text-on-surface-variant mt-3">
                Diverifikasi Admin
              </p>
            </div>

            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full border-2 border-outline-variant bg-white flex items-center justify-center">
                <span className="material-symbols-outlined text-outline-variant text-[18px]">
                  badge
                </span>
              </div>
              <div className="w-full h-1 bg-mint-200 mt-4"></div>
              <p className="text-label-xs font-label-xs text-on-surface-variant mt-3">
                KTA Aktif
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-surface-bg rounded-xl p-5 text-left mb-8">
          <h3 className="text-label-sm font-label-sm text-on-surface mb-3">
            Detail Pengajuan
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-body-md gap-4">
              <span className="text-on-surface-variant shrink-0">Nama</span>
              <span className="font-semibold text-on-surface text-right">
                {nama}
              </span>
            </div>
            <div className="flex justify-between text-body-md gap-4">
              <span className="text-on-surface-variant shrink-0">Email</span>
              <span className="font-semibold text-on-surface text-right">
                {email}
              </span>
            </div>
            <div className="flex justify-between text-body-md gap-4">
              <span className="text-on-surface-variant shrink-0">Koperasi</span>
              <span className="font-semibold text-on-surface text-right">
                {koperasi}
              </span>
            </div>
            <div className="flex justify-between text-body-md">
              <span className="text-on-surface-variant">Tanggal Pengajuan</span>
              <span className="font-semibold text-on-surface">{tanggal}</span>
            </div>
            <div className="flex justify-between text-body-md">
              <span className="text-on-surface-variant">Nomor Referensi</span>
              <span className="font-semibold text-on-surface font-mono text-sm">
                {userId}
              </span>
            </div>
            <div className="flex justify-between text-body-md">
              <span className="text-on-surface-variant">Status</span>
              <span className="text-amber-600 font-semibold">{status}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-8 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all"
          >
            Masuk ke Akun
          </Link>
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

export default function StatusKTAPage() {
  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center py-12 px-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="text-headline-md font-headline-md text-primary font-bold">
          SIMPUL
        </span>
        <span className="text-label-sm font-label-sm text-on-surface-variant">
          Merah Putih
        </span>
      </Link>

      <Suspense
        fallback={
          <div className="text-on-surface-variant">Memuat status...</div>
        }
      >
        <StatusContent />
      </Suspense>
    </div>
  );
}
