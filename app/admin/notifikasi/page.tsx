"use client";

import AdminTopBar from "@/components/layout/AdminTopBar";
import { useState } from "react";
import { DEFAULT_TEMPLATES, interpolateTemplate } from "@/lib/whatsapp";

type TriggerKey = keyof typeof DEFAULT_TEMPLATES;

const TRIGGER_INFO: Record<TriggerKey, { label: string; icon: string; desc: string }> = {
  KTA_DISETUJUI:    { label: "KTA Disetujui",        icon: "verified",          desc: "Terkirim saat admin menyetujui pengajuan KTA." },
  SHU_UPDATE:       { label: "Estimasi SHU Update",  icon: "trending_up",       desc: "Terkirim saat admin memperbarui estimasi SHU." },
  VOTING_BARU:      { label: "Voting Baru Dibuka",   icon: "how_to_vote",       desc: "Terkirim ke semua anggota aktif saat voting baru dibuat." },
  RAT_BARU:         { label: "RAT Baru Dijadwalkan", icon: "event",             desc: "Terkirim ke semua anggota saat sesi RAT dibuat." },
  RAT_REMINDER_H1:  { label: "Reminder RAT H-1",     icon: "notifications_active", desc: "Terkirim H-1 sebelum pelaksanaan RAT." },
  HARGA_TURUN:      { label: "Harga Produk Turun",   icon: "trending_down",     desc: "Otomatis ke anggota e-KTA saat harga produk diturunkan." },
  DISKON_PROMO:     { label: "Diskon/Promo Produk",  icon: "local_offer",       desc: "Notifikasi promo gerai KDMP ke semua anggota aktif." },
  STOK_BARU:        { label: "Barang Masuk (Stok Baru)", icon: "inventory_2",   desc: "Terkirim saat barang_masuk_produk dicatat di inventaris." },
  STOK_RENDAH:      { label: "Peringatan Stok Rendah", icon: "warning",         desc: "Alert saat stok produk di bawah ambang batas." },
  DAILY_STREAK_REMINDER: { label: "Reminder Login Harian", icon: "local_fire_department", desc: "Pengingat klaim streak & poin harian." },
};

const EXAMPLE_VARS = {
  nama: "Budi Setiawan",
  jumlah: "Rp 1.250.000",
  tanggal: "15 Jul 2024",
  link: "https://simpul.id/dashboard",
  judul: "Persetujuan Pengadaan Beras",
  kodeReferral: "BSW2024",
  produk: "Beras Premium 5kg",
  hargaBaru: "Rp 72.000",
  hargaLama: "Rp 78.000",
  diskon: "15",
  stok: "40",
  satuan: "pack",
  poin: "25",
};

interface LogRow {
  id: string;
  waktu: string;
  trigger: string;
  noHp: string;
  status: "TERKIRIM" | "GAGAL" | "PENDING";
  pesan: string;
}

const INITIAL_LOG: LogRow[] = [
  { id: "1", waktu: "10 Jul 2024, 09:00", trigger: "KTA Disetujui",        noHp: "0812-3456-7890", status: "TERKIRIM", pesan: "Selamat Budi Setiawan! 🎉 KTA Anda…" },
  { id: "2", waktu: "9 Jul 2024, 10:30",  trigger: "Estimasi SHU Update",  noHp: "0813-2345-6789", status: "TERKIRIM", pesan: "Halo Siti Rahayu, estimasi SHU Anda…" },
  { id: "3", waktu: "8 Jul 2024, 08:15",  trigger: "Voting Baru Dibuka",   noHp: "0814-3456-7890", status: "GAGAL",    pesan: "📊 Voting baru tersedia: Pengadaan…" },
  { id: "4", waktu: "7 Jul 2024, 17:00",  trigger: "Reminder RAT H-1",     noHp: "0815-4567-8901", status: "TERKIRIM", pesan: "⏰ Pengingat: RAT SIMPUL Merah…" },
  { id: "5", waktu: "5 Jul 2024, 12:00",  trigger: "RAT Baru Dijadwalkan", noHp: "0816-5678-9012", status: "TERKIRIM", pesan: "📢 Rapat Anggota Tahunan…" },
  { id: "6", waktu: "10 Jul 2024, 14:30", trigger: "Harga Produk Turun",   noHp: "0812-3456-7890", status: "TERKIRIM", pesan: "💰 Harga Turun! Beras Premium 5kg…" },
  { id: "7", waktu: "10 Jul 2024, 10:00", trigger: "Barang Masuk (Stok Baru)", noHp: "0813-2345-6789", status: "TERKIRIM", pesan: "📦 Stok Baru! Bibit Padi IR64…" },
  { id: "8", waktu: "10 Jul 2024, 08:00", trigger: "Reminder Login Harian", noHp: "0812-3456-7890", status: "TERKIRIM", pesan: "🔥 Hai Budi! Jangan putus streak…" },
];

const STATUS_COLOR: Record<string, string> = {
  TERKIRIM: "bg-primary-fixed text-on-primary-fixed-variant",
  GAGAL:    "bg-error-container text-on-error-container",
  PENDING:  "bg-outline-variant/30 text-on-surface-variant",
};

export default function AdminNotifikasiPage() {
  const [templates, setTemplates] = useState<Record<TriggerKey, string>>({
    KTA_DISETUJUI:   DEFAULT_TEMPLATES.KTA_DISETUJUI,
    SHU_UPDATE:      DEFAULT_TEMPLATES.SHU_UPDATE,
    VOTING_BARU:     DEFAULT_TEMPLATES.VOTING_BARU,
    RAT_BARU:        DEFAULT_TEMPLATES.RAT_BARU,
    RAT_REMINDER_H1: DEFAULT_TEMPLATES.RAT_REMINDER_H1,
    HARGA_TURUN:     DEFAULT_TEMPLATES.HARGA_TURUN,
    DISKON_PROMO:    DEFAULT_TEMPLATES.DISKON_PROMO,
    STOK_BARU:       DEFAULT_TEMPLATES.STOK_BARU,
    STOK_RENDAH:     DEFAULT_TEMPLATES.STOK_RENDAH,
    DAILY_STREAK_REMINDER: DEFAULT_TEMPLATES.DAILY_STREAK_REMINDER,
  });
  const [activeTab, setActiveTab] = useState<TriggerKey>("KTA_DISETUJUI");
  const [saved, setSaved] = useState<TriggerKey | null>(null);
  const [log] = useState<LogRow[]>(INITIAL_LOG);

  const handleSave = (key: TriggerKey) => {
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  };

  const preview = interpolateTemplate(templates[activeTab], EXAMPLE_VARS);

  const stats = {
    total: log.length,
    terkirim: log.filter((l) => l.status === "TERKIRIM").length,
    gagal: log.filter((l) => l.status === "GAGAL").length,
  };

  return (
    <>
      <AdminTopBar title="Notifikasi WhatsApp" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-5">
          {[
            { label: "Total Dikirim",  value: stats.total,    icon: "chat",         color: "text-on-surface" },
            { label: "Berhasil",       value: stats.terkirim, icon: "check_circle", color: "text-primary" },
            { label: "Gagal",          value: stats.gagal,    icon: "error",        color: "text-red-500" },
          ].map((s) => (
            <div key={s.label} className="bg-surface-card rounded-2xl border border-mint-200 p-5 shadow-md flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-on-surface">{s.value}</p>
                <p className="text-sm text-on-surface-variant">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Template editor */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant/30">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary">edit_note</span>
              <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">Template Pesan per Trigger</h3>
            </div>
            <p className="text-xs text-on-surface-variant">
              Gunakan <code className="bg-surface-bg px-1 rounded">{"{{nama}}"}</code>,{" "}
              <code className="bg-surface-bg px-1 rounded">{"{{produk}}"}</code>,{" "}
              <code className="bg-surface-bg px-1 rounded">{"{{hargaBaru}}"}</code>,{" "}
              <code className="bg-surface-bg px-1 rounded">{"{{stok}}"}</code>,{" "}
              <code className="bg-surface-bg px-1 rounded">{"{{link}}"}</code>{" "}
              sebagai placeholder yang akan diisi otomatis ke semua anggota ber e-KTA.
            </p>
          </div>

          <div className="flex">
            {/* Trigger list */}
            <div className="w-64 flex-shrink-0 border-r border-outline-variant/30 py-2">
              {(Object.entries(TRIGGER_INFO) as [TriggerKey, (typeof TRIGGER_INFO)[TriggerKey]][]).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full text-left px-5 py-3.5 flex items-start gap-3 transition-all ${
                    activeTab === key ? "bg-primary/5 border-r-2 border-primary" : "hover:bg-surface-bg"
                  }`}
                >
                  <span className={`material-symbols-outlined text-[18px] mt-0.5 ${activeTab === key ? "text-primary" : "text-on-surface-variant"}`}>
                    {info.icon}
                  </span>
                  <div>
                    <p className={`text-sm font-medium ${activeTab === key ? "text-primary" : "text-on-surface"}`}>{info.label}</p>
                    <p className="text-xs text-on-surface-variant leading-snug mt-0.5">{info.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Editor */}
            <div className="flex-1 p-6 space-y-4">
              <div>
                <label className="block text-xs text-on-surface-variant mb-2 uppercase tracking-wider font-semibold">
                  Template — {TRIGGER_INFO[activeTab].label}
                </label>
                <textarea
                  value={templates[activeTab]}
                  onChange={(e) => setTemplates((t) => ({ ...t, [activeTab]: e.target.value }))}
                  rows={6}
                  className="w-full px-4 py-3 border border-outline-variant/50 rounded-xl text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              {/* Preview */}
              <div>
                <p className="text-xs text-on-surface-variant mb-2 uppercase tracking-wider font-semibold">Preview (dengan data contoh)</p>
                <div className="bg-[#e5ddd5] rounded-xl p-4">
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-sm shadow-sm">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{preview}</p>
                    <p className="text-[10px] text-gray-400 text-right mt-1">10:30 ✓✓</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-on-surface-variant">
                  {templates[activeTab].length} karakter
                </p>
                <button
                  onClick={() => handleSave(activeTab)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    saved === activeTab
                      ? "bg-primary-fixed text-on-primary-fixed-variant"
                      : "bg-primary text-white hover:bg-primary-container shadow-md shadow-primary/20"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {saved === activeTab ? "check" : "save"}
                  </span>
                  {saved === activeTab ? "Tersimpan!" : "Simpan Template"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Log riwayat */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">history</span>
            <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">Log Riwayat Notifikasi</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg border-b border-outline-variant/30 text-left">
                  {["Waktu", "Trigger", "No HP", "Status", "Pesan (preview)"].map((h) => (
                    <th key={h} className="px-5 py-3 text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {log.map((l) => (
                  <tr key={l.id} className="border-b border-outline-variant/20 hover:bg-primary/[0.02]">
                    <td className="px-5 py-4 text-sm text-on-surface-variant whitespace-nowrap">{l.waktu}</td>
                    <td className="px-5 py-4 text-sm font-medium text-on-surface">{l.trigger}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant font-mono">{l.noHp}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${STATUS_COLOR[l.status]}`}>{l.status}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant truncate max-w-xs">{l.pesan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
