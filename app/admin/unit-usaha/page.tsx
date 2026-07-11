"use client";

import { AppIcon } from "@/components/ui/app-icon";
import AdminTopBar from "@/components/layout/AdminTopBar";
import { useState } from "react";

type KategoriUsaha = "RETAIL" | "SIMPAN_PINJAM" | "PERTANIAN" | "JASA" | "LAINNYA";

interface UnitUsahaData {
  id: string;
  nama: string;
  kategori: KategoriUsaha;
  deskripsi: string;
  paramPoin: number;
  isAktif: boolean;
  totalTransaksi: number;
}

const INITIAL_DATA: UnitUsahaData[] = [
  { id: "1", nama: "Warung Koperasi",      kategori: "RETAIL",        deskripsi: "Toko kebutuhan harian anggota.",              paramPoin: 1.0, isAktif: true,  totalTransaksi: 1_248 },
  { id: "2", nama: "Unit Simpan Pinjam",   kategori: "SIMPAN_PINJAM", deskripsi: "Layanan simpan pinjam berbunga ringan.",      paramPoin: 1.0, isAktif: true,  totalTransaksi: 856 },
  { id: "3", nama: "Agro Koperasi",        kategori: "PERTANIAN",     deskripsi: "Bibit, pupuk, dan alat pertanian.",           paramPoin: 1.0, isAktif: true,  totalTransaksi: 642 },
  { id: "4", nama: "Unit Jasa Fotocopy",   kategori: "JASA",          deskripsi: "Print, scan, laminating dokumen.",            paramPoin: 0.5, isAktif: true,  totalTransaksi: 2_104 },
  { id: "5", nama: "Apotek Koperasi",      kategori: "LAINNYA",       deskripsi: "Obat dan perlengkapan kesehatan.",            paramPoin: 1.5, isAktif: false, totalTransaksi: 389 },
];

const KATEGORI_LABEL: Record<string, string> = {
  RETAIL: "Retail", SIMPAN_PINJAM: "Simpan Pinjam",
  PERTANIAN: "Pertanian", JASA: "Jasa", LAINNYA: "Lainnya",
};

const KATEGORI_COLOR: Record<string, string> = {
  RETAIL:        "bg-primary-fixed text-on-primary-fixed-variant",
  SIMPAN_PINJAM: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  PERTANIAN:     "bg-secondary-container text-on-surface",
  JASA:          "bg-mint-200 text-inverse-surface",
  LAINNYA:       "bg-outline-variant/40 text-on-surface-variant",
};

const EMPTY_FORM = { nama: "", kategori: "RETAIL" as KategoriUsaha, deskripsi: "", paramPoin: 1.0, isAktif: true };

export default function AdminUnitUsahaPage() {
  const [data, setData] = useState<UnitUsahaData[]>(INITIAL_DATA);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); };
  const openEdit = (u: UnitUsahaData) => {
    setForm({ nama: u.nama, kategori: u.kategori, deskripsi: u.deskripsi, paramPoin: u.paramPoin, isAktif: u.isAktif });
    setEditId(u.id);
    setShowModal(true);
  };
  const handleSave = () => {
    if (!form.nama.trim()) return;
    if (editId) {
      setData((d) => d.map((u) => u.id === editId ? { ...u, ...form } : u));
    } else {
      setData((d) => [...d, { ...form, id: String(Date.now()), totalTransaksi: 0 }]);
    }
    setShowModal(false);
  };
  const toggleAktif = (id: string) => setData((d) => d.map((u) => u.id === id ? { ...u, isAktif: !u.isAktif } : u));
  const handleDelete = (id: string) => setData((d) => d.filter((u) => u.id !== id));

  return (
    <>
      <AdminTopBar title="Kelola Unit Usaha" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: "Total Unit Usaha",  value: data.length,                          icon: "storefront" },
            { label: "Unit Aktif",        value: data.filter(u=>u.isAktif).length,      icon: "check_circle" },
            { label: "Total Transaksi",   value: data.reduce((s,u)=>s+u.totalTransaksi,0).toLocaleString("id") + "×", icon: "receipt_long" },
          ].map((s) => (
            <div key={s.label} className="bg-surface-card rounded-2xl border border-mint-200 p-5 flex items-center gap-4 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <AppIcon name={s.icon} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-on-surface">{s.value}</p>
                <p className="text-sm text-on-surface-variant">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center">
          <h2 className="text-label-sm font-label-sm text-on-surface font-semibold">Daftar Unit Usaha</h2>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20"
          >
            <AppIcon name="add" className="text-[18px]" />
            Tambah Unit Usaha
          </button>
        </div>

        {/* Table */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg border-b border-outline-variant/30 text-left">
                  {["Nama Unit", "Kategori", "Poin/10rb", "Status", "Transaksi", "Aksi"].map((h) => (
                    <th key={h} className="px-6 py-3 text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((u) => (
                  <tr key={u.id} className="border-b border-outline-variant/20 hover:bg-primary/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-on-surface">{u.nama}</p>
                      <p className="text-xs text-on-surface-variant line-clamp-1">{u.deskripsi}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${KATEGORI_COLOR[u.kategori]}`}>
                        {KATEGORI_LABEL[u.kategori]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-primary font-bold text-sm flex items-center gap-1 mt-2">
                      <AppIcon name="stars" className="text-[14px]" />
                      {u.paramPoin}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleAktif(u.id)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${u.isAktif ? "bg-primary" : "bg-outline-variant"}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${u.isAktif ? "left-[22px]" : "left-0.5"}`}></span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface">{u.totalTransaksi.toLocaleString("id")}×</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(u)} className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                          <AppIcon name="edit" className="text-[18px]" />
                        </button>
                        <button onClick={() => handleDelete(u.id)} className="p-2 rounded-lg hover:bg-error-container text-error transition-colors">
                          <AppIcon name="delete" className="text-[18px]" />
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

      {/* Modal Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between">
              <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">
                {editId ? "Edit Unit Usaha" : "Tambah Unit Usaha Baru"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-surface-bg">
                <AppIcon name="close" className="text-on-surface-variant" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-label-xs font-label-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Nama Unit Usaha</label>
                <input
                  value={form.nama}
                  onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Contoh: Warung Koperasi"
                />
              </div>

              <div>
                <label className="block text-label-xs font-label-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Kategori</label>
                <select
                  value={form.kategori}
                  onChange={(e) => setForm((f) => ({ ...f, kategori: e.target.value as KategoriUsaha }))}
                  className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary"
                >
                  {Object.entries(KATEGORI_LABEL).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-label-xs font-label-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Deskripsi</label>
                <textarea
                  value={form.deskripsi}
                  onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-label-xs font-label-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">
                  Parameter Poin (per Rp 10.000 transaksi)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={form.paramPoin}
                  onChange={(e) => setForm((f) => ({ ...f, paramPoin: parseFloat(e.target.value) || 1 }))}
                  className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary"
                />
                <p className="text-xs text-on-surface-variant mt-1">
                  Transaksi Rp 50.000 → {(5 * form.paramPoin).toFixed(1)} poin
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setForm((f) => ({ ...f, isAktif: !f.isAktif }))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${form.isAktif ? "bg-primary" : "bg-outline-variant"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.isAktif ? "left-[22px]" : "left-0.5"}`}></span>
                </button>
                <span className="text-sm text-on-surface">{form.isAktif ? "Unit Aktif" : "Unit Nonaktif"}</span>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant/30 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl border border-outline-variant/50 text-label-sm font-label-sm text-on-surface-variant hover:bg-surface-bg transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-md shadow-primary/20"
              >
                {editId ? "Simpan Perubahan" : "Tambah Unit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
