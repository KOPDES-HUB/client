"use client";

import AdminTopBar from "@/components/layout/AdminTopBar";
import { useState } from "react";

const UNIT_OPTIONS = [
  { id: "1", nama: "Warung Koperasi",    paramPoin: 1.0 },
  { id: "2", nama: "Unit Simpan Pinjam", paramPoin: 1.0 },
  { id: "3", nama: "Agro Koperasi",      paramPoin: 1.0 },
  { id: "4", nama: "Unit Jasa Fotocopy", paramPoin: 0.5 },
  { id: "5", nama: "Apotek Koperasi",    paramPoin: 1.5 },
];

interface TransaksiRow {
  id: string;
  tanggal: string;
  namaAnggota: string;
  idAnggota: string;
  unitUsaha: string;
  nominal: number;
  poin: number;
  ket: string;
}

const TRANSAKSI_DATA: TransaksiRow[] = [
  { id: "1", tanggal: "10 Jul 2024", namaAnggota: "Budi Setiawan",  idAnggota: "SMP-001", unitUsaha: "Warung Koperasi",    nominal: 85_000,  poin: 8,  ket: "Belanja sembako" },
  { id: "2", tanggal: "10 Jul 2024", namaAnggota: "Siti Rahayu",    idAnggota: "SMP-002", unitUsaha: "Unit Simpan Pinjam", nominal: 500_000, poin: 50, ket: "Setoran bulanan" },
  { id: "3", tanggal: "9 Jul 2024",  namaAnggota: "Ahmad Fauzan",   idAnggota: "SMP-003", unitUsaha: "Agro Koperasi",      nominal: 250_000, poin: 25, ket: "Pembelian pupuk" },
  { id: "4", tanggal: "9 Jul 2024",  namaAnggota: "Dewi Kusuma",    idAnggota: "SMP-004", unitUsaha: "Warung Koperasi",    nominal: 42_000,  poin: 4,  ket: "Belanja harian" },
  { id: "5", tanggal: "8 Jul 2024",  namaAnggota: "Budi Setiawan",  idAnggota: "SMP-001", unitUsaha: "Unit Jasa Fotocopy", nominal: 15_000,  poin: 0,  ket: "Print dokumen" },
  { id: "6", tanggal: "8 Jul 2024",  namaAnggota: "Eko Prasetyo",   idAnggota: "SMP-005", unitUsaha: "Agro Koperasi",      nominal: 175_000, poin: 17, ket: "Bibit padi" },
];

const EMPTY_FORM = { namaAnggota: "", idAnggota: "", unitId: "1", nominal: "", tanggal: "", ket: "" };

function hitungPoin(nominal: number, paramPoin: number) {
  return Math.floor(nominal / 10_000) * paramPoin;
}

export default function AdminTransaksiPage() {
  const [data, setData] = useState<TransaksiRow[]>(TRANSAKSI_DATA);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [paramKonversi, setParamKonversi] = useState(10_000); // Rp per poin base

  const selectedUnit = UNIT_OPTIONS.find((u) => u.id === form.unitId) ?? UNIT_OPTIONS[0];
  const previewPoin = form.nominal ? hitungPoin(Number(form.nominal), selectedUnit.paramPoin) : 0;

  const handleSave = () => {
    if (!form.namaAnggota || !form.nominal || !form.tanggal) return;
    const poin = hitungPoin(Number(form.nominal), selectedUnit.paramPoin);
    setData((d) => [
      {
        id: String(Date.now()),
        tanggal: form.tanggal,
        namaAnggota: form.namaAnggota,
        idAnggota: form.idAnggota || "–",
        unitUsaha: selectedUnit.nama,
        nominal: Number(form.nominal),
        poin,
        ket: form.ket,
      },
      ...d,
    ]);
    setForm(EMPTY_FORM);
    setShowModal(false);
  };

  const totalPoin = data.reduce((s, t) => s + t.poin, 0);
  const totalNominal = data.reduce((s, t) => s + t.nominal, 0);

  return (
    <>
      <AdminTopBar title="Kelola Transaksi" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-5">
          {[
            { label: "Total Transaksi",  value: data.length,                                               icon: "receipt_long" },
            { label: "Total Nominal",    value: `Rp ${(totalNominal/1e6).toFixed(1)}jt`,                   icon: "payments" },
            { label: "Total Poin",       value: `${totalPoin} poin`,                                       icon: "stars" },
            { label: "Base Konversi",    value: `Rp ${paramKonversi.toLocaleString("id")}/poin`,            icon: "tune" },
          ].map((s) => (
            <div key={s.label} className="bg-surface-card rounded-2xl border border-mint-200 p-5 shadow-md">
              <span className="material-symbols-outlined text-primary mb-2 block">{s.icon}</span>
              <p className="text-2xl font-bold text-on-surface">{s.value}</p>
              <p className="text-sm text-on-surface-variant">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Setting parameter konversi */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary">tune</span>
            <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">Setting Parameter Konversi Global</h3>
          </div>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">
                Basis nominal per 1 poin (Rp)
              </label>
              <input
                type="number"
                min={1000}
                step={1000}
                value={paramKonversi}
                onChange={(e) => setParamKonversi(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="pb-1">
              <p className="text-sm text-on-surface-variant">
                Transaksi Rp 100.000 → <strong className="text-primary">{(100_000 / paramKonversi).toFixed(1)} poin</strong> (× multiplier per unit usaha)
              </p>
            </div>
            <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-container transition-all">
              Simpan Setting
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center">
          <h2 className="text-label-sm font-label-sm text-on-surface font-semibold">Riwayat Transaksi Anggota</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Input Transaksi
          </button>
        </div>

        {/* Table */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg border-b border-outline-variant/30 text-left">
                  {["Tanggal", "Anggota", "Unit Usaha", "Nominal", "Poin", "Keterangan", "Aksi"].map((h) => (
                    <th key={h} className="px-5 py-3 text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((t) => (
                  <tr key={t.id} className="border-b border-outline-variant/20 hover:bg-primary/[0.02] transition-colors">
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{t.tanggal}</td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-on-surface">{t.namaAnggota}</p>
                      <p className="text-xs text-on-surface-variant">{t.idAnggota}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-on-surface">{t.unitUsaha}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-on-surface">
                      Rp {t.nominal.toLocaleString("id")}
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-[14px]">stars</span>
                        {t.poin}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{t.ket || "–"}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setData((d) => d.filter((x) => x.id !== t.id))}
                        className="p-2 rounded-lg hover:bg-error-container text-error transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Input Transaksi Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between">
              <h3 className="text-label-sm font-label-sm font-semibold text-on-surface">Input Transaksi Anggota</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-surface-bg">
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Nama Anggota</label>
                  <input
                    value={form.namaAnggota}
                    onChange={(e) => setForm((f) => ({ ...f, namaAnggota: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary"
                    placeholder="Nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">ID Anggota</label>
                  <input
                    value={form.idAnggota}
                    onChange={(e) => setForm((f) => ({ ...f, idAnggota: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary"
                    placeholder="SMP-XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Unit Usaha</label>
                <select
                  value={form.unitId}
                  onChange={(e) => setForm((f) => ({ ...f, unitId: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary"
                >
                  {UNIT_OPTIONS.map((u) => (
                    <option key={u.id} value={u.id}>{u.nama} (×{u.paramPoin} poin)</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Nominal (Rp)</label>
                  <input
                    type="number"
                    value={form.nominal}
                    onChange={(e) => setForm((f) => ({ ...f, nominal: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary"
                    placeholder="50000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Tanggal</label>
                  <input
                    type="date"
                    value={form.tanggal}
                    onChange={(e) => setForm((f) => ({ ...f, tanggal: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Keterangan</label>
                <input
                  value={form.ket}
                  onChange={(e) => setForm((f) => ({ ...f, ket: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary"
                  placeholder="Opsional"
                />
              </div>

              {/* Preview poin */}
              {form.nominal && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">stars</span>
                  <p className="text-sm text-on-surface">
                    Transaksi ini akan menghasilkan <strong className="text-primary">{previewPoin} poin</strong>
                    {" "}untuk anggota (Rp {Number(form.nominal).toLocaleString("id")} ÷ Rp 10.000 × {selectedUnit.paramPoin})
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-outline-variant/30 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl border border-outline-variant/50 text-sm text-on-surface-variant hover:bg-surface-bg transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-md shadow-primary/20"
              >
                Simpan Transaksi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
