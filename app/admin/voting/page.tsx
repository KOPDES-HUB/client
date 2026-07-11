"use client";

import { AppIcon } from "@/components/ui/app-icon";
import TopBar from "@/components/layout/TopBar";
import { useState } from "react";

const sessions = [
  { id: "1", title: "Persetujuan Pengadaan Stok Beras",        mulai: "10 Jul 2024", selesai: "12 Jul 2024", status: "Aktif",   votes: 82 },
  { id: "2", title: "Penetapan Suku Bunga Pinjaman 2025",      mulai: "10 Jul 2024", selesai: "15 Jul 2024", status: "Aktif",   votes: 64 },
  { id: "3", title: "Program Beasiswa Anak Anggota",           mulai: "1 Jul 2024",  selesai: "7 Jul 2024",  status: "Selesai", votes: 110 },
  { id: "4", title: "Pemilihan Pengurus Periode 2025–2027",    mulai: "1 Ags 2024",  selesai: "3 Ags 2024",  status: "Draft",   votes: 0 },
];

const statusColors: Record<string, string> = {
  Aktif:   "bg-primary-fixed text-on-primary-fixed-variant",
  Selesai: "bg-outline-variant/30 text-on-surface-variant",
  Draft:   "bg-tertiary-fixed text-on-tertiary-fixed-variant",
};

export default function AdminVotingPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TopBar title="Kelola E-Voting" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="flex bg-surface-card border border-mint-200 rounded-xl p-1 gap-1">
              {["Semua", "Aktif", "Draft", "Selesai"].map((f) => (
                <button key={f} className={`px-3 py-1.5 rounded-lg text-label-xs font-label-xs transition-all ${
                  f === "Semua" ? "bg-primary text-white" : "text-on-surface-variant hover:text-on-surface"
                }`}>{f}</button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20"
          >
            <AppIcon name="add" className="text-[18px]" />
            Buat Voting Baru
          </button>
        </div>

        {/* Table */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg text-on-surface-variant">
                  {["Judul Voting", "Periode", "Status", "Partisipasi", "Aksi"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-label-sm font-label-sm uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {sessions.map((s) => (
                  <tr key={s.id} className="hover:bg-surface-bg transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-label-sm font-label-sm text-on-surface">{s.title}</p>
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant whitespace-nowrap">
                      {s.mulai} – {s.selesai}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-label-xs font-label-xs ${statusColors[s.status]}`}>{s.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${Math.round((s.votes / 120) * 100)}%` }}></div>
                        </div>
                        <span className="text-label-xs font-label-xs text-on-surface-variant">{s.votes}/120</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                          <AppIcon name="visibility" className="text-[16px]" />
                        </button>
                        <button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                          <AppIcon name="edit" className="text-[16px]" />
                        </button>
                        <button className="w-8 h-8 rounded-lg hover:bg-error-container flex items-center justify-center text-on-surface-variant hover:text-error transition-colors">
                          <AppIcon name="delete" className="text-[16px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Voting Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto" data-lenis-prevent>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-headline-md font-headline-md text-on-surface">Buat Voting Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <AppIcon name="close" />
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface mb-2">Judul Voting</label>
                <input type="text" placeholder="Contoh: Persetujuan Program Beasiswa" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface mb-2">Deskripsi</label>
                <textarea rows={4} placeholder="Jelaskan konteks dan tujuan voting ini..." className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-sm font-label-sm text-on-surface mb-2">Tanggal Mulai</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div>
                  <label className="block text-label-sm font-label-sm text-on-surface mb-2">Tanggal Selesai</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface mb-2">Opsi Jawaban</label>
                <div className="space-y-2">
                  {["Setuju", "Tidak Setuju"].map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <input type="text" defaultValue={opt} className="flex-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface-bg text-body-md focus:outline-none focus:border-primary transition-all" />
                    </div>
                  ))}
                  <button className="flex items-center gap-1.5 text-label-xs font-label-xs text-primary hover:underline">
                    <AppIcon name="add" className="text-[14px]" />
                    Tambah Opsi
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-outline-variant text-on-surface-variant rounded-xl text-label-sm font-label-sm hover:border-on-surface transition-all">
                Batal
              </button>
              <button className="flex-1 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-md">
                Buat Voting
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
