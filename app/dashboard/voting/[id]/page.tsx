"use client";

import { AppIcon } from "@/components/ui/app-icon";
import TopBar from "@/components/layout/TopBar";
import AttendanceGate from "@/components/participation/AttendanceGate";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const POLL_META: Record<string, { title: string; sessionId: string }> = {
  "1": {
    title: "Persetujuan Pengadaan Stok Beras Grosir BUMDes",
    sessionId: "voting-1",
  },
  "2": {
    title: "Penetapan Suku Bunga Pinjaman Anggota Tahun 2025",
    sessionId: "voting-2",
  },
  "3": {
    title: "Pengesahan Laporan Keuangan Tahun Buku 2023",
    sessionId: "voting-3",
  },
};

export default function VotingDetailPage() {
  const params = useParams();
  const pollId = (params.id as string) ?? "1";
  const meta = POLL_META[pollId] ?? POLL_META["1"];

  const [selected, setSelected] = useState<"setuju" | "tidak" | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    setVoted(true);
    setShowModal(false);
  };

  return (
    <>
      <TopBar
        title="Detail Voting"
        breadcrumb={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "E-Voting", href: "/dashboard/voting" },
          { label: "Detail Pengambilan Suara" },
        ]}
      />

      <div className="flex-1 px-8 py-10">
        <div className="max-w-[800px] mx-auto w-full">
          <AttendanceGate votingSessionId={meta.sessionId}>
            <article className="bg-surface-card rounded-2xl shadow-md border border-mint-200 p-6 mb-6 overflow-hidden">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-label-xs font-label-xs mb-3">
                    <AppIcon name="verified" className="text-[14px]" />
                    KTA Terverifikasi — Absensi OK
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container text-on-error-container text-label-xs font-label-xs mb-3 ml-2">
                    <AppIcon name="schedule" className="text-[14px]" />
                    Berakhir dalam 2 hari
                  </span>
                  <h2 className="text-headline-md font-headline-md text-on-surface leading-tight">{meta.title}</h2>
                </div>
                <Link
                  href={`/dashboard/voting/${pollId}/hasil`}
                  className="flex items-center gap-1.5 px-4 py-2 border border-mint-200 rounded-xl text-label-sm font-label-sm text-on-surface-variant hover:border-primary hover:text-primary transition-all"
                >
                  <AppIcon name="bar_chart" className="text-[16px]" />
                  Lihat Hasil
                </Link>
              </div>

              <div className="prose prose-sm max-w-none text-on-surface-variant text-body-md mb-6 space-y-3">
                <p>
                  Dalam rangka mendukung ketahanan pangan desa dan meningkatkan pendapatan BUMDes, pengurus koperasi
                  mengusulkan pengadaan stok beras grosir sebanyak <strong>10 ton</strong> dari petani lokal.
                </p>
                <p>
                  Voting ini hanya dapat diakses setelah absensi E-RAT dan absensi sesi voting tercatat melalui scan KTA
                  Digital.
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-bg rounded-xl mb-6">
                <div className="flex items-center gap-3">
                  <AppIcon name="people" className="text-primary" />
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface">Partisipasi Saat Ini</p>
                    <p className="text-label-xs font-label-xs text-on-surface-variant">82 dari 120 anggota telah memilih</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-label-sm font-label-sm text-primary font-bold">68.3%</p>
                  <p className="text-label-xs font-label-xs text-on-surface-variant">Kuorum: 50%+</p>
                </div>
              </div>

              {!voted ? (
                <div className="space-y-3">
                  <p className="text-label-sm font-label-sm text-on-surface mb-3">Pilih suara Anda:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setSelected("setuju")}
                      className={`py-5 rounded-xl border-2 text-label-sm font-label-sm transition-all ${
                        selected === "setuju"
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                          : "border-mint-200 text-on-surface hover:border-primary hover:bg-primary/5"
                      }`}
                    >
                      <AppIcon name="thumb_up" className="block text-2xl mb-1" />
                      Setuju
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelected("tidak")}
                      className={`py-5 rounded-xl border-2 text-label-sm font-label-sm transition-all ${
                        selected === "tidak"
                          ? "bg-on-surface border-on-surface text-white shadow-lg"
                          : "border-mint-200 text-on-surface hover:border-on-surface hover:bg-on-surface/5"
                      }`}
                    >
                      <AppIcon name="thumb_down" className="block text-2xl mb-1" />
                      Tidak Setuju
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => selected && setShowModal(true)}
                    disabled={!selected}
                    className={`w-full py-3.5 rounded-xl text-label-sm font-label-sm transition-all mt-2 ${
                      selected
                        ? "bg-primary text-white hover:bg-primary-container shadow-lg shadow-primary/20"
                        : "bg-outline-variant text-on-surface-variant cursor-not-allowed"
                    }`}
                  >
                    Konfirmasi Pilihan
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4 p-5 bg-primary/5 border border-primary/20 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <AppIcon name="check_circle" className="text-white" />
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-primary font-bold">Suara Anda telah tercatat</p>
                    <p className="text-body-md text-on-surface-variant">
                      Pilihan: <strong>{selected === "setuju" ? "Setuju" : "Tidak Setuju"}</strong> · Dicatat:{" "}
                      {new Date().toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
              )}
            </article>
          </AttendanceGate>

          <Link href="/dashboard/voting" className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors">
            ← Kembali ke Daftar Voting
          </Link>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <AppIcon name="how_to_vote" className="text-primary" />
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface">Konfirmasi Pilihan</h3>
            </div>
            <p className="text-body-md text-on-surface-variant mb-2">Anda akan memilih:</p>
            <p className="text-headline-md font-headline-md text-on-surface mb-4">
              {selected === "setuju" ? "✅ Setuju" : "❌ Tidak Setuju"}
            </p>
            <p className="text-body-md text-on-surface-variant mb-6">
              Pilihan ini tidak dapat diubah setelah dikonfirmasi. Kehadiran KTA Anda sudah tercatat.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 border border-outline-variant text-on-surface-variant rounded-xl text-label-sm font-label-sm hover:border-on-surface transition-all"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleVote}
                className="flex-1 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-md"
              >
                Ya, Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
