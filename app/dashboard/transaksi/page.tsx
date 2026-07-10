"use client";

import TopBar from "@/components/layout/TopBar";
import { useState } from "react";

const TRANSAKSI_DUMMY = [
  { id: "1", tanggal: "10 Jul 2024", unitUsaha: "Warung Koperasi",     kategori: "RETAIL",        nominal: 85_000,  poin: 8,  ket: "Belanja sembako" },
  { id: "2", tanggal: "8 Jul 2024",  unitUsaha: "Unit Simpan Pinjam",  kategori: "SIMPAN_PINJAM", nominal: 500_000, poin: 50, ket: "Setoran bulanan" },
  { id: "3", tanggal: "5 Jul 2024",  unitUsaha: "Agro Koperasi",       kategori: "PERTANIAN",     nominal: 250_000, poin: 25, ket: "Pembelian pupuk subsidi" },
  { id: "4", tanggal: "2 Jul 2024",  unitUsaha: "Warung Koperasi",     kategori: "RETAIL",        nominal: 62_000,  poin: 6,  ket: "Belanja harian" },
  { id: "5", tanggal: "28 Jun 2024", unitUsaha: "Unit Jasa Fotocopy",  kategori: "JASA",          nominal: 15_000,  poin: 1,  ket: "Print dokumen" },
  { id: "6", tanggal: "25 Jun 2024", unitUsaha: "Agro Koperasi",       kategori: "PERTANIAN",     nominal: 175_000, poin: 17, ket: "Bibit padi" },
  { id: "7", tanggal: "20 Jun 2024", unitUsaha: "Unit Simpan Pinjam",  kategori: "SIMPAN_PINJAM", nominal: 500_000, poin: 50, ket: "Setoran bulanan" },
];

const KATEGORI_COLOR: Record<string, string> = {
  RETAIL:        "bg-primary-fixed text-on-primary-fixed-variant",
  SIMPAN_PINJAM: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  PERTANIAN:     "bg-secondary-container text-on-surface",
  JASA:          "bg-mint-200 text-inverse-surface",
  LAINNYA:       "bg-outline-variant/40 text-on-surface",
};

const KATEGORI_LABEL: Record<string, string> = {
  RETAIL: "Retail", SIMPAN_PINJAM: "Simpan Pinjam",
  PERTANIAN: "Pertanian", JASA: "Jasa", LAINNYA: "Lainnya",
};

export default function TransaksiSayaPage() {
  const [filter, setFilter] = useState("Semua");

  const filtered = filter === "Semua"
    ? TRANSAKSI_DUMMY
    : TRANSAKSI_DUMMY.filter((t) => t.kategori === filter.toUpperCase().replace(" ", "_"));

  const totalPoin = TRANSAKSI_DUMMY.reduce((s, t) => s + t.poin, 0);
  const totalNominal = TRANSAKSI_DUMMY.reduce((s, t) => s + t.nominal, 0);

  return (
    <>
      <TopBar
        title="Transaksi Saya"
        breadcrumb={[{ label: "Dashboard", href: "/dashboard" }, { label: "Transaksi Saya" }]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "Total Poin Transaksi",
              value: `${totalPoin} poin`,
              sub: "Berkontribusi ke estimasi SHU",
              icon: "stars",
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              label: "Total Transaksi Bulan Ini",
              value: `Rp ${(totalNominal / 1_000_000).toFixed(2)} jt`,
              sub: `${TRANSAKSI_DUMMY.length} transaksi`,
              icon: "receipt_long",
              color: "text-on-surface",
              bg: "bg-surface-container",
            },
            {
              label: "Estimasi Kontribusi SHU",
              value: `Rp ${(totalPoin * 1_200).toLocaleString("id")}`,
              sub: "Berdasarkan poin saat ini",
              icon: "trending_up",
              color: "text-primary",
              bg: "bg-primary/10",
            },
          ].map((c) => (
            <div
              key={c.label}
              className="bg-surface-card rounded-2xl p-6 border border-mint-200 shadow-md hover:scale-[1.02] transition-transform duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                <span className={`material-symbols-outlined ${c.color}`}>{c.icon}</span>
              </div>
              <p className="text-body-md text-on-surface-variant text-sm mb-1">{c.label}</p>
              <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
              <p className="text-[12px] text-on-surface-variant mt-1">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Poin contribution note */}
        <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
          <span className="material-symbols-outlined text-primary mt-0.5">info</span>
          <p className="text-body-md text-on-surface text-sm leading-relaxed">
            <strong>Cara hitung poin:</strong> Setiap Rp 10.000 transaksi di unit usaha koperasi menghasilkan poin sesuai parameter unit usaha.
            Poin menjadi salah satu faktor perhitungan SHU — semakin aktif berbelanja/bertransaksi di koperasi, semakin besar potensi SHU Anda.
          </p>
        </div>

        {/* Filter + Table */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between gap-4 flex-wrap">
            <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">Riwayat Transaksi</h3>
            <div className="flex bg-surface-bg border border-mint-200 rounded-xl p-1 gap-1 flex-wrap">
              {["Semua", "Retail", "Simpan Pinjam", "Pertanian", "Jasa"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-label-xs font-label-xs transition-all ${
                    filter === f ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg border-b border-outline-variant/30 text-left">
                  {["Tanggal", "Unit Usaha", "Kategori", "Nominal", "Poin", "Keterangan"].map((h) => (
                    <th key={h} className="px-6 py-3 text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b border-outline-variant/20 hover:bg-primary/[0.03] transition-colors">
                    <td className="px-6 py-4 text-body-md text-on-surface-variant text-sm">{t.tanggal}</td>
                    <td className="px-6 py-4 text-body-md text-on-surface font-medium text-sm">{t.unitUsaha}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${KATEGORI_COLOR[t.kategori]}`}>
                        {KATEGORI_LABEL[t.kategori]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface font-semibold text-sm">
                      Rp {t.nominal.toLocaleString("id")}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-[14px]">stars</span>
                        {t.poin}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant text-sm">{t.ket}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-surface-bg border-t border-outline-variant/30">
                  <td colSpan={3} className="px-6 py-3 text-label-xs font-label-xs text-on-surface-variant">
                    {filtered.length} transaksi
                  </td>
                  <td className="px-6 py-3 text-label-sm font-label-sm text-on-surface font-bold">
                    Rp {filtered.reduce((s,t)=>s+t.nominal,0).toLocaleString("id")}
                  </td>
                  <td className="px-6 py-3 text-primary font-bold text-sm">
                    {filtered.reduce((s,t)=>s+t.poin,0)} poin
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
