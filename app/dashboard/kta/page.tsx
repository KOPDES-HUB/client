"use client";

import TopBar from "@/components/layout/TopBar";
import KTACard from "@/components/kta/KTACard";
import KTAQrCode from "@/components/kta/KTAQrCode";
import Link from "next/link";
import { useState } from "react";
import { DEMO_KTA_MEMBER } from "@/lib/kta/member";
import { useCanAccessRat } from "@/hooks/useAttendance";
import AttendanceBadge from "@/components/participation/AttendanceBadge";

export default function KTADigitalPage() {
  const [showQrFullscreen, setShowQrFullscreen] = useState(false);
  const { hasRatAttendance, sessionId } = useCanAccessRat();

  return (
    <>
      <TopBar
        title="KTA Digital"
        breadcrumb={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Kartu Tanda Anggota Digital" },
        ]}
      />

      <div className="flex-1 p-8 flex flex-col items-center max-w-container-max mx-auto w-full">
        <div className="w-full max-w-[800px] flex flex-col items-center">
          <KTACard />

          <div className="flex gap-4 mt-8 w-full flex-wrap">
            <button
              type="button"
              onClick={() => setShowQrFullscreen(true)}
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 transform"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
              Perbesar QR
            </button>
            <Link
              href={`/scan?sessionId=${sessionId}&sessionType=rat`}
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3 border border-mint-200 text-primary rounded-xl text-label-sm font-label-sm hover:bg-primary/5 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
              Absen E-RAT
            </Link>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-mint-200 text-on-surface-variant rounded-xl text-label-sm font-label-sm hover:bg-surface-container transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Unduh
            </button>
          </div>

          <div className="mt-6 w-full bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0">info</span>
            <div className="text-body-md text-on-surface-variant space-y-2">
              <p>
                QR Code pada KTA digunakan sebagai identitas digital untuk <strong>absensi E-RAT</strong> dan{" "}
                <strong>partisipasi E-Voting</strong>. Tunjukkan QR ini kepada petugas atau scanner di lokasi rapat.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-label-xs text-on-surface-variant">Status absensi RAT:</span>
                <AttendanceBadge sessionId={sessionId} />
              </div>
            </div>
          </div>

          <div className="mt-6 w-full bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Detail Keanggotaan</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Status", value: "Anggota Terverifikasi", highlight: true },
                { label: "Tanggal Bergabung", value: DEMO_KTA_MEMBER.tanggalBergabung },
                { label: "Jenis Keanggotaan", value: DEMO_KTA_MEMBER.jenisKeanggotaan },
                { label: "Total Simpanan", value: DEMO_KTA_MEMBER.totalSimpanan, highlight: true },
                { label: "Absensi E-RAT", value: hasRatAttendance ? "Sudah Hadir (KTA)" : "Belum Absen" },
                { label: "Nomor KTA", value: DEMO_KTA_MEMBER.nomorKta, highlight: true },
              ].map((d) => (
                <div key={d.label} className="p-4 bg-surface-bg rounded-xl">
                  <p className="text-label-xs font-label-xs text-on-surface-variant mb-1">{d.label}</p>
                  <p className={`text-body-md font-semibold ${d.highlight ? "text-primary" : "text-on-surface"}`}>
                    {d.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showQrFullscreen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/95 flex flex-col items-center justify-center p-6">
          <button
            type="button"
            onClick={() => setShowQrFullscreen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          <p className="text-white text-label-sm mb-6 text-center">
            Tunjukkan QR ini untuk absensi E-RAT / E-Voting
          </p>
          <KTAQrCode size={280} />
          <p className="text-white/70 font-mono mt-4 text-sm">{DEMO_KTA_MEMBER.nomorKta}</p>
          <p className="text-white/50 text-label-xs mt-2">{DEMO_KTA_MEMBER.nama}</p>
        </div>
      )}
    </>
  );
}
