"use client";

import { AppIcon } from "@/components/ui/app-icon";
import TopBar from "@/components/layout/TopBar";
import Link from "next/link";
import { useState } from "react";

const transactions = [
  { date: "10 Jul 2024", desc: "Setoran Simpanan Wajib",         jenis: "Wajib",    nominal: "+Rp 150.000",  status: "Berhasil" },
  { date: "10 Jul 2024", desc: "Setoran Simpanan Sukarela",      jenis: "Sukarela", nominal: "+Rp 200.000",  status: "Berhasil" },
  { date: "1 Jul 2024",  desc: "Setoran Simpanan Wajib",         jenis: "Wajib",    nominal: "+Rp 150.000",  status: "Berhasil" },
  { date: "15 Jun 2024", desc: "Setoran Simpanan Sukarela",      jenis: "Sukarela", nominal: "+Rp 300.000",  status: "Berhasil" },
  { date: "1 Jun 2024",  desc: "Setoran Simpanan Wajib",         jenis: "Wajib",    nominal: "+Rp 150.000",  status: "Berhasil" },
  { date: "1 Jun 2024",  desc: "Penarikan Simpanan Sukarela",    jenis: "Sukarela", nominal: "-Rp 100.000",  status: "Berhasil" },
  { date: "1 Mei 2024",  desc: "Setoran Simpanan Wajib",         jenis: "Wajib",    nominal: "+Rp 150.000",  status: "Berhasil" },
  { date: "15 Jan 2024", desc: "Setoran Simpanan Pokok",         jenis: "Pokok",    nominal: "+Rp 1.000.000",status: "Berhasil" },
];

const tabs = ["Semua", "Pokok", "Wajib", "Sukarela"];

export default function RiwayatTransaksiPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  const filtered = activeTab === "Semua" ? transactions : transactions.filter((t) => t.jenis === activeTab);

  return (
    <>
      <TopBar
        title="Riwayat Transaksi"
        breadcrumb={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Simpanan", href: "/dashboard/simpanan" },
          { label: "Riwayat Transaksi" },
        ]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex bg-surface-card border border-mint-200 rounded-xl p-1 gap-1">
            {tabs.map((tab) => (
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

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-mint-200 rounded-lg text-label-sm font-label-sm text-on-surface-variant hover:border-primary hover:text-primary transition-all bg-surface-card">
              <AppIcon name="calendar_today" className="text-[16px]" />
              Filter Tanggal
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-mint-200 rounded-lg text-label-sm font-label-sm text-on-surface-variant hover:border-primary hover:text-primary transition-all bg-surface-card">
              <AppIcon name="download" className="text-[16px]" />
              Export
            </button>
          </div>
        </div>

        {/* Summary pills */}
        <div className="flex gap-4 flex-wrap">
          <div className="px-4 py-2 bg-surface-card border border-mint-200 rounded-xl">
            <p className="text-label-xs font-label-xs text-on-surface-variant">Total Masuk</p>
            <p className="text-label-sm font-label-sm text-primary">+Rp 2.350.000</p>
          </div>
          <div className="px-4 py-2 bg-surface-card border border-mint-200 rounded-xl">
            <p className="text-label-xs font-label-xs text-on-surface-variant">Total Keluar</p>
            <p className="text-label-sm font-label-sm text-error">-Rp 100.000</p>
          </div>
          <div className="px-4 py-2 bg-surface-card border border-mint-200 rounded-xl">
            <p className="text-label-xs font-label-xs text-on-surface-variant">Saldo Bersih</p>
            <p className="text-label-sm font-label-sm text-on-surface font-bold">+Rp 2.250.000</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg text-on-surface-variant">
                  <th className="px-6 py-4 text-left text-label-sm font-label-sm uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-left text-label-sm font-label-sm uppercase tracking-wider">Deskripsi</th>
                  <th className="px-6 py-4 text-left text-label-sm font-label-sm uppercase tracking-wider">Jenis</th>
                  <th className="px-6 py-4 text-right text-label-sm font-label-sm uppercase tracking-wider">Nominal</th>
                  <th className="px-6 py-4 text-center text-label-sm font-label-sm uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filtered.map((tx, i) => (
                  <tr key={i} className="hover:bg-surface-bg transition-colors">
                    <td className="px-6 py-4 text-body-md text-on-surface-variant whitespace-nowrap">{tx.date}</td>
                    <td className="px-6 py-4 text-body-md text-on-surface">{tx.desc}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-label-xs font-label-xs ${
                        tx.jenis === "Pokok" ? "bg-primary-fixed text-on-primary-fixed-variant" :
                        tx.jenis === "Wajib" ? "bg-tertiary-fixed text-on-tertiary-fixed-variant" :
                        "bg-secondary-container text-on-secondary-container"
                      }`}>{tx.jenis}</span>
                    </td>
                    <td className={`px-6 py-4 text-right font-semibold text-label-sm ${
                      tx.nominal.startsWith("+") ? "text-primary" : "text-error"
                    }`}>
                      {tx.nominal}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 bg-primary-fixed/30 text-on-primary-fixed-variant rounded-full text-label-xs font-label-xs">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/30">
            <p className="text-label-xs font-label-xs text-on-surface-variant">
              Menampilkan {filtered.length} dari {transactions.length} transaksi
            </p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all">
                <AppIcon name="chevron_left" className="text-[16px]" />
              </button>
              <span className="px-3 py-1 bg-primary text-white rounded-lg text-label-xs font-label-xs">1</span>
              <button className="w-8 h-8 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all">
                <AppIcon name="chevron_right" className="text-[16px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
