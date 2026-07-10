"use client";

import TopBar from "@/components/layout/TopBar";
import Link from "next/link";
import { useState } from "react";

export default function VotingDetailPage() {
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
          {/* Main Detail Card */}
          <article className="bg-surface-card rounded-2xl shadow-md border border-mint-200 p-6 mb-6 overflow-hidden">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container text-on-error-container text-label-xs font-label-xs mb-3">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  Berakhir dalam 2 hari
                </span>
                <h2 className="text-headline-md font-headline-md text-on-surface leading-tight">
                  Persetujuan Pengadaan Stok Beras Grosir BUMDes
                </h2>
              </div>
              <Link
                href="/dashboard/voting/1/hasil"
                className="flex items-center gap-1.5 px-4 py-2 border border-mint-200 rounded-xl text-label-sm font-label-sm text-on-surface-variant hover:border-primary hover:text-primary transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">bar_chart</span>
                Lihat Hasil
              </Link>
            </div>

            <div className="prose prose-sm max-w-none text-on-surface-variant text-body-md mb-6 space-y-3">
              <p>
                Dalam rangka mendukung ketahanan pangan desa dan meningkatkan pendapatan BUMDes, pengurus koperasi
                mengusulkan pengadaan stok beras grosir sebanyak <strong>10 ton</strong> dari petani lokal.
              </p>
              <p>
                Beras akan didistribusikan melalui jaringan toko desa dengan harga yang kompetitif, dengan keuntungan
                bersih diproyeksikan sebesar <strong>Rp 8.500.000</strong> per siklus penjualan (±30 hari).
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Modal awal: Rp 45.000.000 dari dana cadangan koperasi</li>
                <li>Margin keuntungan: 18–22% per kuintal</li>
                <li>Risiko: fluktuasi harga gabah dan cuaca</li>
              </ul>
            </div>

            {/* Vote info */}
            <div className="flex items-center justify-between p-4 bg-surface-bg rounded-xl mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">people</span>
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

            {/* Vote Buttons */}
            {!voted ? (
              <div className="space-y-3">
                <p className="text-label-sm font-label-sm text-on-surface mb-3">Pilih suara Anda:</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelected("setuju")}
                    className={`py-5 rounded-xl border-2 text-label-sm font-label-sm transition-all ${
                      selected === "setuju"
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                        : "border-mint-200 text-on-surface hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    <span className="material-symbols-outlined block text-2xl mb-1" style={{ fontVariationSettings: selected === "setuju" ? "'FILL' 1" : "'FILL' 0" }}>
                      thumb_up
                    </span>
                    Setuju
                  </button>
                  <button
                    onClick={() => setSelected("tidak")}
                    className={`py-5 rounded-xl border-2 text-label-sm font-label-sm transition-all ${
                      selected === "tidak"
                        ? "bg-on-surface border-on-surface text-white shadow-lg"
                        : "border-mint-200 text-on-surface hover:border-on-surface hover:bg-on-surface/5"
                    }`}
                  >
                    <span className="material-symbols-outlined block text-2xl mb-1" style={{ fontVariationSettings: selected === "tidak" ? "'FILL' 1" : "'FILL' 0" }}>
                      thumb_down
                    </span>
                    Tidak Setuju
                  </button>
                </div>
                <button
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
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <p className="text-label-sm font-label-sm text-primary font-bold">Suara Anda telah tercatat</p>
                  <p className="text-body-md text-on-surface-variant">
                    Pilihan: <strong>{selected === "setuju" ? "Setuju" : "Tidak Setuju"}</strong> · Dicatat: {new Date().toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
            )}
          </article>

          <Link href="/dashboard/voting" className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors">
            ← Kembali ke Daftar Voting
          </Link>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">how_to_vote</span>
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface">Konfirmasi Pilihan</h3>
            </div>
            <p className="text-body-md text-on-surface-variant mb-2">
              Anda akan memilih:
            </p>
            <p className="text-headline-md font-headline-md text-on-surface mb-4">
              {selected === "setuju" ? "✅ Setuju" : "❌ Tidak Setuju"}
            </p>
            <p className="text-body-md text-on-surface-variant mb-6">
              Pilihan ini tidak dapat diubah setelah dikonfirmasi. Pastikan pilihan Anda sudah benar.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 border border-outline-variant text-on-surface-variant rounded-xl text-label-sm font-label-sm hover:border-on-surface transition-all"
              >
                Batal
              </button>
              <button
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
