"use client";

import TopBar from "@/components/layout/TopBar";
import { useState } from "react";

const transactions = [
  { name: "Budi Setiawan",  id: "SMP-001", jenis: "Wajib",    nominal: "Rp 150.000", tanggal: "10 Jul 2024", status: "Berhasil" },
  { name: "Siti Aminah",    id: "SMP-002", jenis: "Pokok",    nominal: "Rp 1.000.000", tanggal: "8 Jul 2024", status: "Berhasil" },
  { name: "Ahmad Fauzi",    id: "SMP-003", jenis: "Sukarela", nominal: "Rp 300.000",  tanggal: "7 Jul 2024", status: "Berhasil" },
  { name: "Dewi Ratna",     id: "SMP-004", jenis: "Wajib",    nominal: "Rp 150.000",  tanggal: "6 Jul 2024", status: "Menunggu" },
  { name: "Hendra G.",      id: "SMP-005", jenis: "Sukarela", nominal: "Rp 500.000",  tanggal: "5 Jul 2024", status: "Berhasil" },
];

const jenisTabs = ["Pokok", "Wajib", "Sukarela", "SHU Settings"];

export default function AdminSimpananPage() {
  const [activeTab, setActiveTab] = useState("Wajib");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TopBar title="Kelola Simpanan" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-6">
        {/* Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex bg-surface-card border border-mint-200 rounded-xl p-1 gap-1">
            {jenisTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-label-sm font-label-sm transition-all ${
                  activeTab === tab ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {activeTab !== "SHU Settings" && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Input Transaksi
            </button>
          )}
        </div>

        {activeTab !== "SHU Settings" ? (
          <>
            {/* Summary Row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: `Total ${activeTab}`, value: "Rp 8.120.000.000", icon: "account_balance" },
                { label: "Anggota Setor",      value: "1.248",             icon: "group" },
                { label: "Transaksi Bulan Ini", value: "324",              icon: "receipt_long" },
              ].map((s) => (
                <div key={s.label} className="bg-surface-card rounded-xl border border-mint-200 p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">{s.icon}</span>
                  </div>
                  <div>
                    <p className="text-label-xs font-label-xs text-on-surface-variant">{s.label}</p>
                    <p className="text-headline-md font-headline-md text-on-surface">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-surface-bg text-on-surface-variant">
                      {["Nama Anggota", "Jenis", "Nominal", "Tanggal", "Status", "Aksi"].map((h) => (
                        <th key={h} className="px-6 py-4 text-left text-label-sm font-label-sm uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {transactions
                      .filter((t) => activeTab === "Semua" || t.jenis === activeTab)
                      .map((tx, i) => (
                        <tr key={i} className="hover:bg-surface-bg transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">{tx.name.charAt(0)}</div>
                              <div>
                                <p className="text-label-sm font-label-sm text-on-surface">{tx.name}</p>
                                <p className="text-label-xs font-label-xs text-on-surface-variant">{tx.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-label-xs font-label-xs ${
                              tx.jenis === "Pokok" ? "bg-primary-fixed text-on-primary-fixed-variant" :
                              tx.jenis === "Wajib" ? "bg-tertiary-fixed text-on-tertiary-fixed-variant" :
                              "bg-secondary-container text-on-secondary-container"
                            }`}>{tx.jenis}</span>
                          </td>
                          <td className="px-6 py-4 text-label-sm font-label-sm text-primary">{tx.nominal}</td>
                          <td className="px-6 py-4 text-body-md text-on-surface-variant">{tx.tanggal}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-label-xs font-label-xs ${
                              tx.status === "Berhasil" ? "bg-primary-fixed/30 text-on-primary-fixed-variant" : "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                            }`}>{tx.status}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                              </button>
                              <button className="w-8 h-8 rounded-lg hover:bg-error-container flex items-center justify-center text-on-surface-variant hover:text-error transition-colors">
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* SHU Settings */
          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-8 max-w-2xl">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-6">Parameter Perhitungan SHU</h3>
            <div className="space-y-5">
              {[
                { label: "Periode Tutup Buku", value: "31 Desember 2024", type: "date" },
                { label: "Bobot Simpanan (%)", value: "40", type: "number" },
                { label: "Bobot Partisipasi Transaksi (%)", value: "60", type: "number" },
                { label: "Cadangan Umum (%)", value: "25", type: "number" },
                { label: "Dana Sosial (%)", value: "5", type: "number" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-label-sm font-label-sm text-on-surface mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              ))}
              <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-3">
                <button className="px-5 py-2.5 border border-outline-variant text-on-surface-variant rounded-xl text-label-sm font-label-sm hover:border-on-surface transition-all">
                  Reset
                </button>
                <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-md">
                  Simpan Parameter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-headline-md font-headline-md text-on-surface">Input Transaksi Simpanan</h3>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Nama / ID Anggota", placeholder: "Cari anggota...", type: "text" },
                { label: "Jenis Simpanan", placeholder: "Pilih jenis", type: "select" },
                { label: "Nominal (Rp)", placeholder: "0", type: "number" },
                { label: "Tanggal Transaksi", placeholder: "", type: "date" },
                { label: "Catatan", placeholder: "Opsional", type: "text" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-label-sm font-label-sm text-on-surface mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-outline-variant text-on-surface-variant rounded-xl text-label-sm font-label-sm hover:border-on-surface transition-all">
                Batal
              </button>
              <button className="flex-1 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-md">
                Simpan Transaksi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
