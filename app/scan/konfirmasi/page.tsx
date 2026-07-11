"use client";

import { AppIcon } from "@/components/ui/app-icon";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { DEMO_KTA_MEMBER } from "@/lib/kta/member";
import { useParticipationStore } from "@/lib/participation/store";
import type { SessionType } from "@/lib/participation/types";

function KonfirmasiContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId") ?? "rat-2024";
  const sessionType = (searchParams.get("sessionType") ?? "rat") as SessionType;
  const sessionTitle = searchParams.get("title") ?? "Sesi Rapat";

  const attendance = useParticipationStore((s) => s.getAttendance(sessionId));

  const scannedAt = attendance
    ? new Date(attendance.scannedAt).toLocaleString("id-ID")
    : new Date().toLocaleString("id-ID");

  const votingId = sessionId.replace("voting-", "");
  const nextHref =
    sessionType === "rat"
      ? "/dashboard/voting/1"
      : `/dashboard/voting/${votingId}`;

  const backHref = sessionType === "rat" ? "/dashboard/rat" : "/dashboard/voting";

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center p-6">
      <div className="fixed top-0 left-0 right-0 z-10 bg-surface-bg/80 backdrop-blur-md border-b border-outline-variant/30 px-6 py-4 flex items-center gap-2">
        <span className="text-headline-md font-headline-md text-primary font-bold">SIMPUL</span>
        <span className="text-label-xs text-on-surface-variant">Konfirmasi Absensi KTA</span>
      </div>

      <div className="w-full max-w-[800px] mt-16">
        <div className="bg-white rounded-2xl border border-mint-200 shadow-2xl overflow-hidden">
          <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-amber-400/60" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
            </div>
            <div className="bg-white rounded-lg px-4 py-1.5 text-label-xs text-on-surface-variant flex items-center gap-2 border border-outline-variant/30">
              <AppIcon name="lock" className="text-[14px] text-primary" />
              simpul.id/absensi/kta-verified
            </div>
            <div className="w-16" />
          </div>

          <div className="p-12 md:p-16 flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary rounded-full opacity-10 scale-150 animate-pulse" />
              <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/30">
                <AppIcon name="check" className="text-white text-5xl font-bold" />
              </div>
            </div>

            <h1 className="text-headline-lg font-headline-lg text-on-surface mb-3">
              Absensi KTA Berhasil!
            </h1>
            <p className="text-body-lg text-on-surface-variant mb-2">
              Kehadiran Anda telah dicatat melalui verifikasi KTA Digital untuk:
            </p>
            <p className="text-headline-md font-headline-md text-primary mb-1">{sessionTitle}</p>
            <p className="text-body-md text-on-surface-variant mb-8">{scannedAt} WIB</p>

            <div className="w-full max-w-md bg-surface-bg rounded-2xl p-5 mb-8 text-left space-y-3">
              {[
                { label: "Nama Anggota", value: attendance?.nama ?? DEMO_KTA_MEMBER.nama },
                { label: "Nomor KTA", value: attendance?.nomorKta ?? DEMO_KTA_MEMBER.nomorKta },
                { label: "ID Anggota", value: DEMO_KTA_MEMBER.anggotaId },
                { label: "Metode", value: "Scan QR KTA Digital" },
                { label: "Waktu Scan", value: scannedAt },
                { label: "Lokasi", value: "Balai Desa Merah Putih" },
              ].map((d) => (
                <div key={d.label} className="flex justify-between items-center gap-4">
                  <span className="text-label-xs font-label-xs text-on-surface-variant">{d.label}</span>
                  <span className="text-label-sm font-label-sm text-on-surface text-right">{d.value}</span>
                </div>
              ))}
            </div>

            {sessionType === "rat" ? (
              <Link
                href={nextHref}
                className="px-8 py-3.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 transform"
              >
                Lanjut ke E-Voting RAT →
              </Link>
            ) : (
              <Link
                href={nextHref}
                className="px-8 py-3.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 transform"
              >
                Lanjut ke Halaman Voting →
              </Link>
            )}

            <Link
              href={backHref}
              className="mt-4 text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              Kembali ke {sessionType === "rat" ? "E-RAT" : "Daftar Voting"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KonfirmasiHadirPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Memuat...</div>}>
      <KonfirmasiContent />
    </Suspense>
  );
}
