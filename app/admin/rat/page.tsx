"use client";

import { AppIcon } from "@/components/ui/app-icon";
import TopBar from "@/components/layout/TopBar";
import Link from "next/link";
import { useState } from "react";

const sessions = [
  {
    id: "1",
    title: "RAT Tahun Buku 2023",
    tanggal: "25 Okt 2024",
    lokasi: "Balai Desa Merah Putih",
    quorumTarget: 120,
    hadir: 68,
    status: "Berlangsung",
  },
  {
    id: "2",
    title: "RAT Luar Biasa — Revisi AD/ART",
    tanggal: "15 Mar 2024",
    lokasi: "Balai Desa Merah Putih",
    quorumTarget: 100,
    hadir: 95,
    status: "Selesai",
  },
  {
    id: "3",
    title: "RAT Tahun Buku 2022",
    tanggal: "20 Jan 2024",
    lokasi: "Aula Kecamatan",
    quorumTarget: 110,
    hadir: 102,
    status: "Selesai",
  },
];

const attendees = [
  { name: "Budi Setiawan",   id: "SMP-001", waktu: "08:32" },
  { name: "Siti Aminah",     id: "SMP-002", waktu: "08:35" },
  { name: "Ahmad Fauzi",     id: "SMP-003", waktu: "08:41" },
  { name: "Dewi Ratna Sari", id: "SMP-004", waktu: "08:44" },
  { name: "Hendra Gunawan",  id: "SMP-005", waktu: "08:50" },
];

export default function AdminRATPage() {
  const [selectedSession, setSelectedSession] = useState(sessions[0]);
  const [showModal, setShowModal] = useState(false);

  const kuorumPct = Math.round((selectedSession.hadir / selectedSession.quorumTarget) * 100);

  return (
    <>
      <TopBar title="Kelola E-RAT" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="flex bg-surface-card border border-mint-200 rounded-xl p-1 gap-1">
              {["Semua", "Berlangsung", "Selesai"].map((f) => (
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
            Buat Sesi RAT
          </button>
        </div>

        {/* Sessions Table */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg text-on-surface-variant">
                  {["Sesi RAT", "Tanggal", "Kuorum", "Status", "Aksi"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-label-sm font-label-sm uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {sessions.map((s) => {
                  const pct = Math.round((s.hadir / s.quorumTarget) * 100);
                  return (
                    <tr
                      key={s.id}
                      className={`hover:bg-surface-bg transition-colors cursor-pointer ${selectedSession.id === s.id ? "bg-primary/5" : ""}`}
                      onClick={() => setSelectedSession(s)}
                    >
                      <td className="px-6 py-4">
                        <p className="text-label-sm font-label-sm text-on-surface">{s.title}</p>
                        <p className="text-label-xs font-label-xs text-on-surface-variant">{s.lokasi}</p>
                      </td>
                      <td className="px-6 py-4 text-body-md text-on-surface-variant whitespace-nowrap">{s.tanggal}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, pct)}%` }}></div>
                          </div>
                          <span className="text-label-xs font-label-xs text-on-surface-variant">{s.hadir}/{s.quorumTarget}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-label-xs font-label-xs ${
                          s.status === "Berlangsung" ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-outline-variant/30 text-on-surface-variant"
                        }`}>{s.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                            <AppIcon name="edit" className="text-[16px]" />
                          </button>
                          <Link href="/rat/proyektor" className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                            <AppIcon name="cast" className="text-[16px]" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Session Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quorum Gauge */}
          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-4">
              Status Kuorum — {selectedSession.title}
            </h3>
            <div className="flex flex-col items-center gap-4">
              {/* Circular gauge */}
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5eeff" strokeWidth="12" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="#488451" strokeWidth="12"
                    strokeDasharray={`${Math.min(100, kuorumPct) * 2.51} 251`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-headline-md font-headline-md text-primary">{kuorumPct}%</span>
                  <span className="text-label-xs font-label-xs text-on-surface-variant">kuorum</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-headline-md font-headline-md text-on-surface">{selectedSession.hadir} Hadir</p>
                <p className="text-body-md text-on-surface-variant">dari {selectedSession.quorumTarget} target</p>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-md">
                <AppIcon name="qr_code_2" className="text-[18px]" />
                Generate / Regenerate QR
              </button>
            </div>
          </div>

          {/* Live Attendance */}
          <div className="lg:col-span-2 bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
            <div className="p-5 border-b border-outline-variant/30 flex justify-between items-center">
              <h3 className="text-headline-md font-headline-md text-on-surface">Daftar Hadir Real-time</h3>
              <div className="flex items-center gap-2 text-label-xs font-label-xs text-primary">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Live Update
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-bg text-on-surface-variant text-label-xs font-label-xs uppercase tracking-wider">
                    <th className="px-5 py-3 text-left">Nama</th>
                    <th className="px-5 py-3 text-left">ID Anggota</th>
                    <th className="px-5 py-3 text-right">Waktu Scan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {attendees.map((a) => (
                    <tr key={a.id} className="hover:bg-surface-bg transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                            {a.name.charAt(0)}
                          </div>
                          <span className="text-label-sm font-label-sm text-on-surface">{a.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-label-xs font-label-xs text-on-surface-variant">{a.id}</td>
                      <td className="px-5 py-3 text-right text-label-sm font-label-sm text-primary">{a.waktu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-outline-variant/30 flex justify-between items-center">
              <p className="text-label-xs font-label-xs text-on-surface-variant">Menampilkan 5 dari {selectedSession.hadir} anggota hadir</p>
              <button className="text-primary text-label-xs font-label-xs hover:underline">Lihat Semua</button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Session Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-headline-md font-headline-md text-on-surface">Buat Sesi RAT Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <AppIcon name="close" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Judul Sesi",             placeholder: "Contoh: RAT Tahun Buku 2024", type: "text" },
                { label: "Tanggal Pelaksanaan",     placeholder: "",                            type: "date" },
                { label: "Lokasi",                  placeholder: "Nama tempat pelaksanaan",     type: "text" },
                { label: "Target Kuorum (anggota)", placeholder: "120",                         type: "number" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-label-sm font-label-sm text-on-surface mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface mb-2">Agenda Rapat</label>
                <div className="space-y-2">
                  {["Pembukaan & Sambutan", "Laporan Pengurus", "Laporan Keuangan"].map((a, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center text-label-xs font-label-xs text-on-surface-variant">{i + 1}</span>
                      <input type="text" defaultValue={a} className="flex-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface-bg text-body-md focus:outline-none focus:border-primary transition-all" />
                    </div>
                  ))}
                  <button className="flex items-center gap-1.5 text-label-xs font-label-xs text-primary hover:underline">
                    <AppIcon name="add" className="text-[14px]" />
                    Tambah Agenda
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-outline-variant text-on-surface-variant rounded-xl text-label-sm font-label-sm hover:border-on-surface transition-all">
                Batal
              </button>
              <button className="flex-1 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-md">
                Buat Sesi RAT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
