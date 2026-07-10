"use client";

import TopBar from "@/components/layout/TopBar";
import { useState } from "react";

const members = [
  { id: "SMP-2024-001", name: "Budi Setiawan",   nik: "3271xxxxxx001", hp: "0812-xxxx-0001", status: "Aktif",    joined: "15 Jan 2024" },
  { id: "SMP-2024-002", name: "Siti Aminah",      nik: "3271xxxxxx002", hp: "0812-xxxx-0002", status: "Pending",  joined: "20 Jan 2024" },
  { id: "SMP-2024-003", name: "Ahmad Fauzi",      nik: "3271xxxxxx003", hp: "0812-xxxx-0003", status: "Aktif",    joined: "22 Jan 2024" },
  { id: "SMP-2024-004", name: "Dewi Ratna Sari",  nik: "3271xxxxxx004", hp: "0812-xxxx-0004", status: "Pending",  joined: "25 Jan 2024" },
  { id: "SMP-2024-005", name: "Hendra Gunawan",   nik: "3271xxxxxx005", hp: "0812-xxxx-0005", status: "Nonaktif", joined: "28 Jan 2024" },
  { id: "SMP-2024-006", name: "Rina Wijayanti",   nik: "3271xxxxxx006", hp: "0812-xxxx-0006", status: "Aktif",    joined: "1 Feb 2024" },
  { id: "SMP-2024-007", name: "Dani Pradana",     nik: "3271xxxxxx007", hp: "0812-xxxx-0007", status: "Pending",  joined: "5 Feb 2024" },
];

const statusColors: Record<string, string> = {
  Aktif:    "bg-primary-fixed text-on-primary-fixed-variant",
  Pending:  "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  Nonaktif: "bg-error-container text-on-error-container",
};

export default function AdminAnggotaPage() {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = members.filter((m) => {
    const matchFilter = filter === "Semua" || m.status === filter;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <>
      <TopBar title="Manajemen Anggota" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">search</span>
              <input
                type="text"
                placeholder="Cari nama / ID anggota..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface-card text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all w-64"
              />
            </div>

            {/* Filter dropdown simulation */}
            <div className="flex bg-surface-card border border-mint-200 rounded-xl p-1 gap-1">
              {["Semua", "Aktif", "Pending", "Nonaktif"].map((f) => (
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

          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Tambah Anggota
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Anggota", value: members.length, color: "text-on-surface" },
            { label: "Pending Verifikasi", value: members.filter(m => m.status === "Pending").length, color: "text-amber-600" },
            { label: "Aktif", value: members.filter(m => m.status === "Aktif").length, color: "text-primary" },
          ].map((s) => (
            <div key={s.label} className="bg-surface-card rounded-xl border border-mint-200 px-5 py-4">
              <p className="text-label-xs font-label-xs text-on-surface-variant">{s.label}</p>
              <p className={`text-headline-md font-headline-md ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg text-on-surface-variant">
                  <th className="px-6 py-4 text-left text-label-sm font-label-sm uppercase tracking-wider">Anggota</th>
                  <th className="px-6 py-4 text-left text-label-sm font-label-sm uppercase tracking-wider">ID / NIK</th>
                  <th className="px-6 py-4 text-left text-label-sm font-label-sm uppercase tracking-wider">No. HP</th>
                  <th className="px-6 py-4 text-left text-label-sm font-label-sm uppercase tracking-wider">Tgl Daftar</th>
                  <th className="px-6 py-4 text-center text-label-sm font-label-sm uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-label-sm font-label-sm uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filtered.map((member) => (
                  <tr key={member.id} className="hover:bg-surface-bg transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-label-sm font-label-sm text-on-surface">{member.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-label-sm font-label-sm text-primary">{member.id}</p>
                      <p className="text-label-xs font-label-xs text-on-surface-variant font-mono">{member.nik}</p>
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">{member.hp}</td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">{member.joined}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-label-xs font-label-xs ${statusColors[member.status]}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button title="Lihat Detail" className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button title="Edit" className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        {member.status === "Pending" && (
                          <button title="Verifikasi" className="w-8 h-8 rounded-lg hover:bg-primary-fixed flex items-center justify-center text-primary transition-colors">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                          </button>
                        )}
                        <button title="Nonaktifkan" className="w-8 h-8 rounded-lg hover:bg-error-container flex items-center justify-center text-on-surface-variant hover:text-error transition-colors">
                          <span className="material-symbols-outlined text-[18px]">block</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/30">
            <p className="text-label-xs font-label-xs text-on-surface-variant">
              Menampilkan {filtered.length} dari {members.length} anggota
            </p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all">
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <span className="px-3 py-1 bg-primary text-white rounded-lg text-label-xs font-label-xs">1</span>
              <button className="w-8 h-8 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all">
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
