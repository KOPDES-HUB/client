"use client";

import { AppIcon } from "@/components/ui/app-icon";
import TopBar from "@/components/layout/TopBar";
import AttendanceBadge from "@/components/participation/AttendanceBadge";
import Link from "next/link";
import { useCanAccessRat } from "@/hooks/useAttendance";
import { RAT_SESSION_2024 } from "@/lib/participation/sessions";

const agenda = [
  { no: 1, title: "Pembukaan & Sambutan Ketua Koperasi", duration: "08:30 – 09:00", done: true },
  { no: 2, title: "Laporan Pertanggungjawaban Pengurus", duration: "09:00 – 10:30", done: true },
  { no: 3, title: "Laporan Pengawas & Auditor Independen", duration: "10:30 – 11:00", done: false, current: true },
  { no: 4, title: "Pembahasan & Pengesahan Laporan Keuangan", duration: "11:00 – 12:00", done: false },
  { no: 5, title: "Istirahat & Makan Siang", duration: "12:00 – 13:00", done: false },
  { no: 6, title: "E-Voting — Pengesahan Program Kerja 2025", duration: "13:00 – 14:00", done: false },
];

const documents = [
  { name: "Laporan Keuangan 2023.pdf", size: "2.4 MB", icon: "description" },
  { name: "Program Kerja 2024-2025.pdf", size: "1.8 MB", icon: "article" },
  { name: "Daftar Hadir Sementara.xlsx", size: "0.5 MB", icon: "table_chart" },
];

export default function ERATPage() {
  const hadirCount = 68;
  const totalAnggota = 120;
  const kuorumPct = Math.round((hadirCount / totalAnggota) * 100);
  const { hasRatAttendance, sessionId } = useCanAccessRat();

  return (
    <>
      <TopBar
        title="E-RAT"
        breadcrumb={[{ label: "Dashboard", href: "/dashboard" }, { label: "Rapat Anggota Tahunan" }]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        <section className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
            <AppIcon name="groups" className="text-[200px] text-inverse-surface" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="inline-block px-3 py-1 bg-mint-200/30 text-primary text-label-sm font-label-sm rounded-full">
                    Kegiatan Tahunan
                  </span>
                  <AttendanceBadge sessionId={sessionId} label={hasRatAttendance ? "KTA Terverifikasi" : "Belum Absen"} />
                </div>
                <h1 className="text-headline-lg font-headline-lg text-on-surface mb-2">
                  {RAT_SESSION_2024.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-on-surface-variant text-body-md">
                  <div className="flex items-center gap-2">
                    <AppIcon name="calendar_month" className="text-primary text-[18px]" />
                    25 Oktober 2024
                  </div>
                  <div className="flex items-center gap-2">
                    <AppIcon name="location_on" className="text-primary text-[18px]" />
                    {RAT_SESSION_2024.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <AppIcon name="schedule" className="text-primary text-[18px]" />
                    08:30 – 14:00 WIB
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-label-sm font-label-sm text-on-surface">
                  Kehadiran: <strong className="text-primary">{hadirCount}/{totalAnggota} Hadir</strong>
                </span>
                <span
                  className={`text-label-sm font-label-sm px-3 py-1 rounded-full ${
                    kuorumPct >= 50
                      ? "bg-primary-fixed text-on-primary-fixed-variant"
                      : "bg-error-container text-on-error-container"
                  }`}
                >
                  {kuorumPct >= 50 ? `✓ Kuorum (${kuorumPct}%)` : `Belum Kuorum (${kuorumPct}%)`}
                </span>
              </div>
              <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-mint-200 to-primary rounded-full transition-all duration-1000"
                  style={{ width: `${kuorumPct}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">Agenda Rapat</h2>
            <div className="space-y-3">
              {agenda.map((item) => (
                <div
                  key={item.no}
                  className={`bg-surface-card rounded-xl border p-5 flex items-center gap-4 transition-all ${
                    item.current ? "border-primary shadow-md shadow-primary/10" : "border-mint-200"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      item.done
                        ? "bg-primary"
                        : item.current
                          ? "border-2 border-primary bg-primary/10"
                          : "border-2 border-outline-variant bg-surface-bg"
                    }`}
                  >
                    {item.done ? (
                      <AppIcon name="check" className="text-white text-[16px]" />
                    ) : (
                      <span className={`text-label-xs font-bold ${item.current ? "text-primary" : "text-on-surface-variant"}`}>
                        {item.no}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-label-sm font-label-sm ${
                        item.current ? "text-primary" : item.done ? "text-on-surface-variant line-through" : "text-on-surface"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-label-xs font-label-xs text-on-surface-variant mt-0.5">{item.duration}</p>
                  </div>
                  {item.current && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary text-white rounded-full text-label-xs font-label-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Berlangsung
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-2">Absensi Digital KTA</h3>
              <p className="text-body-md text-on-surface-variant mb-5">
                Scan QR pada <strong>KTA Digital</strong> Anda untuk mencatat kehadiran. Absensi ini menjadi syarat
                mengikuti E-Voting dalam agenda RAT.
              </p>

              {hasRatAttendance ? (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-4">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <AppIcon name="verified" className="text-[18px]" />
                    <span className="text-label-sm font-label-sm font-semibold">Anda sudah absen</span>
                  </div>
                  <p className="text-label-xs text-on-surface-variant">
                    KTA terverifikasi. Anda dapat mengikuti E-Voting setelah absen di sesi voting.
                  </p>
                </div>
              ) : null}

              <Link
                href={`/scan?sessionId=${sessionId}&sessionType=rat`}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20 mb-3"
              >
                <AppIcon name="badge" className="text-[18px]" />
                {hasRatAttendance ? "Scan Ulang KTA" : "Absen dengan Scan KTA"}
              </Link>

              <Link
                href="/dashboard/kta"
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-mint-200 text-primary rounded-xl text-label-sm font-label-sm hover:bg-primary/5 transition-all mb-3"
              >
                <AppIcon name="qr_code_2" className="text-[18px]" />
                Buka KTA Digital
              </Link>

              <div className="flex items-center gap-2 text-label-xs font-label-xs text-on-surface-variant">
                <AppIcon name="info" className="text-[14px]" />
                Petugas memindai QR KTA Anda, bukan sebaliknya
              </div>
            </div>

            {hasRatAttendance && (
              <Link
                href="/dashboard/voting/1"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-secondary-container text-on-secondary-container rounded-xl text-label-sm font-label-sm hover:opacity-90 transition-all"
              >
                <AppIcon name="how_to_vote" className="text-[18px]" />
                Lanjut ke E-Voting
              </Link>
            )}

            <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Dokumen Rapat</h3>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center gap-3 p-3 bg-surface-bg rounded-xl hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <AppIcon name={doc.icon} className="text-primary text-[18px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-label-xs font-label-xs text-on-surface truncate">{doc.name}</p>
                      <p className="text-[10px] text-on-surface-variant">{doc.size}</p>
                    </div>
                    <AppIcon name="download" className="text-on-surface-variant text-[18px]" />
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/rat/proyektor"
              className="flex items-center justify-center gap-2 w-full py-3 border border-mint-200 text-on-surface-variant rounded-xl text-label-sm font-label-sm hover:border-primary hover:text-primary transition-all"
            >
              <AppIcon name="cast" className="text-[18px]" />
              Buka Layar Proyektor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
