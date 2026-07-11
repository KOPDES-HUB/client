"use client";

import { AppIcon } from "@/components/ui/app-icon";
import AdminTopBar from "@/components/layout/AdminTopBar";
import { useState } from "react";
import { DUMMY_INVENTARIS, DUMMY_MUTASI, KOPERASI_REF } from "@/lib/inventaris/dummy";
import type { InventarisProduk, MutasiInventaris, TipeMutasiStok } from "@/lib/inventaris/types";

const TIPE_LABEL: Record<TipeMutasiStok, string> = {
  barang_masuk_produk: "Barang Masuk",
  barang_keluar_produk: "Barang Keluar",
};

const TIPE_COLOR: Record<TipeMutasiStok, string> = {
  barang_masuk_produk: "bg-primary-fixed text-on-primary-fixed-variant",
  barang_keluar_produk: "bg-error-container text-on-error-container",
};

const EMPTY_FORM = {
  nama_produk: "",
  kode_barcode: "",
  harga_jual: 0,
  stok: 0,
  kategori: "Sembako",
  satuan: "pack",
  produk_sample_id: "",
};

type Tab = "produk" | "mutasi";

export default function AdminInventarisPage() {
  const [produk, setProduk] = useState<InventarisProduk[]>(DUMMY_INVENTARIS);
  const [mutasi, setMutasi] = useState<MutasiInventaris[]>(DUMMY_MUTASI);
  const [tab, setTab] = useState<Tab>("produk");
  const [showModal, setShowModal] = useState(false);
  const [showMutasiModal, setShowMutasiModal] = useState(false);
  const [editRef, setEditRef] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [mutasiForm, setMutasiForm] = useState({
    inventaris_ref: "",
    tipe: "barang_masuk_produk" as TipeMutasiStok,
    jumlah: 1,
    keterangan: "",
  });

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditRef(null);
    setShowModal(true);
  };

  const openEdit = (p: InventarisProduk) => {
    setForm({
      nama_produk: p.nama_produk,
      kode_barcode: p.kode_barcode,
      harga_jual: p.harga_jual,
      stok: p.stok,
      kategori: p.kategori,
      satuan: p.satuan,
      produk_sample_id: p.produk_sample_id,
    });
    setEditRef(p.inventaris_ref);
    setShowModal(true);
  };

  const handleSaveProduk = () => {
    if (!form.nama_produk.trim()) return;
    const now = new Date().toISOString();

    if (editRef) {
      setProduk((list) =>
        list.map((p) =>
          p.inventaris_ref === editRef
            ? { ...p, ...form, diperbarui_pada: now }
            : p,
        ),
      );
    } else {
      const ref = `INV-2024-${String(produk.length + 1).padStart(3, "0")}`;
      setProduk((list) => [
        ...list,
        {
          inventaris_ref: ref,
          produk_sample_id: form.produk_sample_id || `PRD-SMP-${String(list.length + 1).padStart(3, "0")}`,
          koperasi_ref: KOPERASI_REF,
          nama_produk: form.nama_produk,
          stok: form.stok,
          dibuat_pada: now,
          diperbarui_pada: now,
          kode_barcode: form.kode_barcode,
          harga_jual: form.harga_jual,
          kategori: form.kategori,
          satuan: form.satuan,
        },
      ]);
    }
    setShowModal(false);
  };

  const handleMutasi = () => {
    const item = produk.find((p) => p.inventaris_ref === mutasiForm.inventaris_ref);
    if (!item || mutasiForm.jumlah <= 0) return;

    const stokSebelum = item.stok;
    const delta =
      mutasiForm.tipe === "barang_masuk_produk"
        ? mutasiForm.jumlah
        : -mutasiForm.jumlah;
    const stokSesudah = stokSebelum + delta;
    if (stokSesudah < 0) return;

    const now = new Date().toISOString();
    setProduk((list) =>
      list.map((p) =>
        p.inventaris_ref === item.inventaris_ref
          ? { ...p, stok: stokSesudah, diperbarui_pada: now }
          : p,
      ),
    );
    setMutasi((list) => [
      {
        id: `MUT-${String(list.length + 1).padStart(3, "0")}`,
        inventaris_ref: item.inventaris_ref,
        nama_produk: item.nama_produk,
        tipe: mutasiForm.tipe,
        jumlah: mutasiForm.jumlah,
        stok_sebelum: stokSebelum,
        stok_sesudah: stokSesudah,
        keterangan: mutasiForm.keterangan,
        dibuat_pada: now,
      },
      ...list,
    ]);
    setShowMutasiModal(false);
    setMutasiForm({ inventaris_ref: "", tipe: "barang_masuk_produk", jumlah: 1, keterangan: "" });
  };

  const handleDelete = (ref: string) => setProduk((list) => list.filter((p) => p.inventaris_ref !== ref));

  const stokRendah = produk.filter((p) => p.stok < 15).length;

  return (
    <>
      <AdminTopBar title="Inventaris Produk" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-6">
        <div className="grid grid-cols-4 gap-5">
          {[
            { label: "Total Produk", value: produk.length, icon: "inventory_2" },
            { label: "Total Stok", value: produk.reduce((s, p) => s + p.stok, 0), icon: "warehouse" },
            { label: "Stok Rendah (<15)", value: stokRendah, icon: "warning" },
            { label: "Mutasi Bulan Ini", value: mutasi.length, icon: "swap_vert" },
          ].map((s) => (
            <div key={s.label} className="bg-surface-card rounded-2xl border border-mint-200 p-5 flex items-center gap-4 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <AppIcon name={s.icon} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-on-surface">{s.value}</p>
                <p className="text-sm text-on-surface-variant">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex bg-surface-card border border-mint-200 rounded-xl p-1">
            {(["produk", "mutasi"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-lg text-label-sm font-label-sm transition-all ${
                  tab === t ? "bg-primary text-white" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {t === "produk" ? "Daftar Produk" : "Riwayat Mutasi"}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {tab === "produk" && (
              <button
                type="button"
                onClick={openCreate}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container shadow-lg shadow-primary/20"
              >
                <AppIcon name="add" className="text-[18px]" />
                Tambah Produk
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowMutasiModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 border border-primary text-primary rounded-xl text-label-sm font-label-sm hover:bg-primary/5"
            >
              <AppIcon name="swap_vert" className="text-[18px]" />
              Catat Mutasi Stok
            </button>
          </div>
        </div>

        {tab === "produk" ? (
          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-bg border-b border-outline-variant/30 text-left">
                    {[
                      "inventaris_ref",
                      "nama_produk",
                      "kode_barcode",
                      "stok",
                      "harga_jual",
                      "kategori",
                      "diperbarui_pada",
                      "Aksi",
                    ].map((h) => (
                      <th key={h} className="px-5 py-3 text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">
                        {h === "Aksi" ? h : h.replace(/_/g, " ")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {produk.map((p) => (
                    <tr key={p.inventaris_ref} className="border-b border-outline-variant/20 hover:bg-primary/[0.02]">
                      <td className="px-5 py-4 text-sm font-mono text-on-surface-variant">{p.inventaris_ref}</td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-on-surface">{p.nama_produk}</p>
                        <p className="text-xs text-on-surface-variant">{p.produk_sample_id}</p>
                      </td>
                      <td className="px-5 py-4 text-sm font-mono text-on-surface-variant">{p.kode_barcode}</td>
                      <td className="px-5 py-4">
                        <span className={`text-sm font-bold ${p.stok < 15 ? "text-red-500" : "text-on-surface"}`}>
                          {p.stok} {p.satuan}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-on-surface">
                        Rp {p.harga_jual.toLocaleString("id-ID")}
                        {p.harga_sebelumnya && (
                          <span className="block text-xs text-on-surface-variant line-through">
                            Rp {p.harga_sebelumnya.toLocaleString("id-ID")}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm text-on-surface-variant">{p.kategori}</td>
                      <td className="px-5 py-4 text-xs text-on-surface-variant whitespace-nowrap">
                        {new Date(p.diperbarui_pada).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-1">
                          <button type="button" onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-primary/10 text-primary">
                            <AppIcon name="edit" className="text-[18px]" />
                          </button>
                          <button type="button" onClick={() => handleDelete(p.inventaris_ref)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
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
        ) : (
          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-bg border-b border-outline-variant/30 text-left">
                    {["Waktu", "Produk", "Tipe Mutasi", "Jumlah", "Stok Sebelum", "Stok Sesudah", "Keterangan"].map((h) => (
                      <th key={h} className="px-5 py-3 text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mutasi.map((m) => (
                    <tr key={m.id} className="border-b border-outline-variant/20 hover:bg-primary/[0.02]">
                      <td className="px-5 py-4 text-xs text-on-surface-variant whitespace-nowrap">
                        {new Date(m.dibuat_pada).toLocaleString("id-ID")}
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-on-surface">{m.nama_produk}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${TIPE_COLOR[m.tipe]}`}>
                          {TIPE_LABEL[m.tipe]}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-on-surface">
                        {m.tipe === "barang_masuk_produk" ? "+" : "-"}{m.jumlah}
                      </td>
                      <td className="px-5 py-4 text-sm text-on-surface-variant">{m.stok_sebelum}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-on-surface">{m.stok_sesudah}</td>
                      <td className="px-5 py-4 text-sm text-on-surface-variant">{m.keterangan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Produk modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-headline-md font-headline-md text-on-surface">
              {editRef ? "Edit Produk" : "Tambah Produk"}
            </h3>
            {[
              { key: "nama_produk", label: "nama_produk", type: "text" },
              { key: "produk_sample_id", label: "produk_sample_id", type: "text" },
              { key: "kode_barcode", label: "kode_barcode", type: "text" },
              { key: "kategori", label: "kategori", type: "text" },
              { key: "satuan", label: "satuan", type: "text" },
              { key: "harga_jual", label: "harga_jual", type: "number" },
              { key: "stok", label: "stok", type: "number" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs text-on-surface-variant mb-1 uppercase">{f.label}</label>
                <input
                  type={f.type}
                  value={form[f.key as keyof typeof form] as string | number}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>
            ))}
            <div className="flex gap-3 justify-end pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm text-on-surface-variant hover:bg-surface-bg">
                Batal
              </button>
              <button type="button" onClick={handleSaveProduk} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-container">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mutasi modal */}
      {showMutasiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-headline-md font-headline-md text-on-surface">Catat Mutasi Stok</h3>
            <div>
              <label className="block text-xs text-on-surface-variant mb-1 uppercase">Produk</label>
              <select
                value={mutasiForm.inventaris_ref}
                onChange={(e) => setMutasiForm((f) => ({ ...f, inventaris_ref: e.target.value }))}
                className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-sm"
              >
                <option value="">Pilih produk...</option>
                {produk.map((p) => (
                  <option key={p.inventaris_ref} value={p.inventaris_ref}>
                    {p.nama_produk} (stok: {p.stok})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-on-surface-variant mb-1 uppercase">Tipe Mutasi</label>
              <select
                value={mutasiForm.tipe}
                onChange={(e) => setMutasiForm((f) => ({ ...f, tipe: e.target.value as TipeMutasiStok }))}
                className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-sm"
              >
                <option value="barang_masuk_produk">barang_masuk_produk</option>
                <option value="barang_keluar_produk">barang_keluar_produk</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-on-surface-variant mb-1 uppercase">Jumlah</label>
              <input
                type="number"
                min={1}
                value={mutasiForm.jumlah}
                onChange={(e) => setMutasiForm((f) => ({ ...f, jumlah: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-on-surface-variant mb-1 uppercase">Keterangan</label>
              <input
                type="text"
                value={mutasiForm.keterangan}
                onChange={(e) => setMutasiForm((f) => ({ ...f, keterangan: e.target.value }))}
                className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-sm"
                placeholder="Restock supplier / penjualan harian"
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button type="button" onClick={() => setShowMutasiModal(false)} className="px-5 py-2.5 rounded-xl text-sm text-on-surface-variant hover:bg-surface-bg">
                Batal
              </button>
              <button type="button" onClick={handleMutasi} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-container">
                Simpan Mutasi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
