"use client";

import { AppIcon } from "@/components/ui/app-icon";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import KTACard from "@/components/kta/KTACard";
import KTAQrCode from "@/components/kta/KTAQrCode";
import { DEMO_KTA_MEMBER } from "@/lib/kta/member";
import { getSessionById } from "@/lib/participation/sessions";
import { useParticipationStore } from "@/lib/participation/store";
import type { SessionType } from "@/lib/participation/types";

function ScanAbsensiContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId") ?? "rat-2024";
  const sessionType = (searchParams.get("sessionType") ?? "rat") as SessionType;

  const session = getSessionById(sessionId);
  const recordAttendance = useParticipationStore((s) => s.recordAttendance);
  const hasAttendance = useParticipationStore((s) => s.hasAttendance(sessionId));

  const [mode, setMode] = useState<"choose" | "present-kta" | "scanning">("choose");
  const [error, setError] = useState("");

  const backHref =
    sessionType === "rat" ? "/dashboard/rat" : `/dashboard/voting/${sessionId.replace("voting-", "")}`;

  const handleConfirmKtaScan = () => {
    if (!session) {
      setError("Sesi tidak ditemukan.");
      return;
    }

    if (DEMO_KTA_MEMBER.status !== "AKTIF") {
      setError("KTA Anda tidak aktif. Hubungi pengurus koperasi.");
      return;
    }

    recordAttendance({
      sessionId: session.id,
      sessionType: session.type,
      sessionTitle: session.title,
    });

    const params = new URLSearchParams({
      sessionId: session.id,
      sessionType: session.type,
      title: session.title,
    });
    router.push(`/scan/konfirmasi?${params.toString()}`);
  };

  if (mode === "present-kta") {
    return (
      <div className="min-h-screen bg-inverse-surface flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <p className="text-label-xs text-secondary-fixed-dim">Tampilkan ke Petugas / Scanner</p>
            <p className="text-label-sm text-white font-semibold truncate max-w-[240px]">
              {session?.title ?? "Absensi Digital"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMode("choose")}
            className="text-label-sm text-secondary-fixed-dim hover:text-white"
          >
            Kembali
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
          <p className="text-white/80 text-body-md text-center max-w-md">
            Tunjukkan QR KTA di bawah ini kepada petugas absensi atau arahkan ke scanner E-RAT / E-Voting.
          </p>

          <div className="w-full max-w-md">
            <KTACard compact showQr />
          </div>

          <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3">
            <p className="text-label-xs text-on-surface-variant uppercase tracking-wider">QR KTA — Scan Area</p>
            <KTAQrCode size={200} />
            <p className="text-label-xs text-on-surface-variant font-mono">{DEMO_KTA_MEMBER.nomorKta}</p>
          </div>

          <button
            type="button"
            onClick={handleConfirmKtaScan}
            className="px-8 py-3.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg"
          >
            {hasAttendance ? "Absensi Sudah Tercatat — Lihat Konfirmasi" : "Simulasikan KTA Berhasil Di-scan"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-inverse-surface flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-inverse-surface/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-headline-md font-headline-md text-primary-fixed font-bold">SIMPUL</span>
          <span className="text-label-xs text-secondary-fixed-dim">Absensi Digital KTA</span>
        </div>
        <Link href={backHref} className="text-label-sm font-label-sm text-secondary-fixed-dim hover:text-white transition-colors">
          ✕ Tutup
        </Link>
      </header>

      <div className="flex-1 relative mt-[72px]">
        <div className="absolute inset-0 bg-gradient-to-br from-inverse-surface to-[#1a2a1c] flex items-center justify-center p-6">
          <div className="relative z-20 w-full max-w-lg space-y-6">
            <div className="px-6 py-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 justify-center">
              <AppIcon name="badge" className="text-white text-[18px]" />
              <span className="text-label-sm font-label-sm text-white text-center">
                {session?.title ?? "Sesi Absensi"}
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-headline-md font-headline-md text-white text-center">
                Absensi dengan KTA Digital
              </h2>
              <p className="text-body-md text-white/70 text-center">
                Kehadiran E-RAT dan E-Voting diverifikasi melalui scan QR pada Kartu Tanda Anggota (KTA) Anda.
              </p>

              {error && (
                <p className="text-label-sm text-red-300 bg-red-900/30 rounded-lg px-4 py-2 text-center">{error}</p>
              )}

              {hasAttendance && (
                <div className="flex items-center gap-2 justify-center p-3 bg-primary/20 border border-primary/30 rounded-xl">
                  <AppIcon name="check_circle" className="text-primary-fixed text-[20px]" />
                  <span className="text-label-sm text-primary-fixed">Anda sudah absen di sesi ini</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setMode("present-kta")}
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg"
              >
                <AppIcon name="qr_code_2" className="text-[20px]" />
                Tampilkan KTA untuk Di-scan
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("scanning");
                  setTimeout(handleConfirmKtaScan, 1500);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 border border-white/30 text-white rounded-xl text-label-sm font-label-sm hover:bg-white/10 transition-all"
              >
                <AppIcon name="qr_code_scanner" className="text-[18px]" />
                {mode === "scanning" ? "Memverifikasi KTA..." : "Scan Otomatis (Demo)"}
              </button>

              <Link
                href="/dashboard/kta"
                className="block w-full text-center py-2 text-label-sm text-white/60 hover:text-white transition-colors"
              >
                Belum punya KTA aktif? Cek status KTA →
              </Link>
            </div>

            <div className="relative w-72 h-72 mx-auto opacity-40 pointer-events-none">
              {[
                "top-0 left-0 border-t-4 border-l-4 rounded-tl-xl",
                "top-0 right-0 border-t-4 border-r-4 rounded-tr-xl",
                "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-xl",
                "bottom-0 right-0 border-b-4 border-r-4 rounded-br-xl",
              ].map((cls, i) => (
                <div key={i} className={`absolute w-12 h-12 border-primary ${cls}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScanAbsensiPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-inverse-surface flex items-center justify-center text-white">
          Memuat scanner...
        </div>
      }
    >
      <ScanAbsensiContent />
    </Suspense>
  );
}
