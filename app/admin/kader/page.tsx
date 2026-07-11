"use client";

import AdminTopBar from "@/components/layout/AdminTopBar";
import { useState } from "react";

interface KaderData {
  id: string;
  nama: string;
  nik: string;
  noHp: string;
  wilayah: string;
  isAktif: boolean;
  totalAksi: number;
  anggotaDidampingi: number;
}

const INITIAL_KADER: KaderData[] = [
  { id: "KDR-001", nama: "Sari Handayani",  nik: "3501010101870001", noHp: "0812-1111-2222", wilayah: "Dusun Harapan",     isAktif: true,  totalAksi: 24, anggotaDidampingi: 8 },
  { id: "KDR-002", nama: "Bambang Wijaya",  nik: "3501010202880002", noHp: "0813-2222-3333", wilayah: "Dusun Bakti",       isAktif: true,  totalAksi: 18, anggotaDidampingi: 6 },
  { id: "KDR-003", nama: "Yuli Puspitasari",nik: "3501010303890003", noHp: "0814-3333-4444", wilayah: "Dusun Sumber Asri", isAktif: false, totalAksi: 9,  anggotaDidampingi: 4 },
];

const LOG_MONITOR = [
  { waktu: "10 Jul 09:15", namaKader: "Sari Handayani",   anggota: "Karno Sutrisno", aksi: "TRANSAKSI",   desc: "Rp 50.000 di Warung Koperasi" },
  { waktu: "10 Jul 09:22", namaKader: "Sari Handayani",   anggota: "Mbok Sari",      aksi: "ABSENSI_RAT", desc: "Hadir RAT 2024" },
  { waktu: "9 Jul 14:05",  namaKader: "Bambang Wijaya",   anggota: "Pak Wagimin",    aksi: "VOTE",        desc: "Voting Pengadaan Beras" },
  { waktu: "8 Jul 10:30",  namaKader: "Sari Handayani",   anggota: "Karno Sutrisno", aksi: "TRANSAKSI",   desc: "Rp 30.000 di Agro Koperasi" },
];

const AKSI_COLOR: Record<string, string> = {
  TRANSAKSI:   "bg-primary-fixed text-on-primary-fixed-variant",
  ABSENSI_RAT: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  VOTE:        "bg-secondary-container text-on-surface",
};

const EMPTY_FORM = { nama: "", nik: "", noHp: "", wilayah: "" };

export default function AdminKaderPage() {
  const [kader, setKader] = useState<KaderData[]>(INITIAL_KADER);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); };
  const openEdit = (k: KaderData) => {
    setForm({ nama: k.nama, nik: k.nik, noHp: k.noHp, wilayah: k.wilayah });
    setEditId(k.id);
    setShowModal(true);
  };
  const handleSave = () => {
    if (!form.nama || !form.wilayah) return;
    if (editId) {
      setKader((d) => d.map((k) => k.id === editId ? { ...k, ...form } : k));
    } else {
      setKader((d) => [...d, { ...form, id: `KDR-${String(d.length + 1).padStart(3, "0")}`, isAktif: true, totalAksi: 0, anggotaDidampingi: 0 }]);
    }
    setShowModal(false);
  };
  const toggleAktif = (id: string) => setKader((d) => d.map((k) => k.id === id ? { ...k, isAktif: !k.isAktif } : k));

  return (
    <>
      <AdminTopBar title="Kelola Kader Keliling" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-5">
          {[
            { label: "Total Kader",          value: kader.length,                                   icon: "supervisor_account" },
            { label: "Kader Aktif",          value: kader.filter(k=>k.isAktif).length,              icon: "check_circle" },
            { label: "Total Aksi Bulan Ini", value: kader.reduce((s,k)=>s+k.totalAksi,0),           icon: "history" },
            { label: "Anggota Terbantu",     value: kader.reduce((s,k)=>s+k.anggotaDidampingi,0),   icon: "people" },
          ].map((s) => (
            <div key={s.label} className="bg-surface-card rounded-2xl border border-mint-200 p-5 shadow-md">
              <span className="material-symbols-outlined text-primary mb-2 block">{s.icon}</span>
              <p className="text-2xl font-bold text-on-surface">{s.value}</p>
              <p className="text-sm text-on-surface-variant">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Daftar Kader */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-label-sm font-label-sm text-on-surface font-semibold">Daftar Kader</h2>
            <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Tambah Kader
            </button>
          </div>

          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-bg border-b border-outline-variant/30 text-left">
                    {["ID", "Nama Kader", "Wilayah", "No HP", "Aksi Bulan Ini", "Anggota Dibantu", "Status", "Kelola"].map((h) => (
                      <th key={h} className="px-5 py-3 text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kader.map((k) => (
                    <tr key={k.id} className="border-b border-outline-variant/20 hover:bg-primary/[0.02]">
                      <td className="px-5 py-4 text-xs text-on-surface-variant font-mono">{k.id}</td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-on-surface">{k.nama}</p>
                        <p className="text-xs text-on-surface-variant">{k.nik}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-on-surface">{k.wilayah}</td>
                      <td className="px-5 py-4 text-sm text-on-surface-variant">{k.noHp}</td>
                      <td className="px-5 py-4 text-sm font-bold text-on-surface">{k.totalAksi}</td>
                      <td className="px-5 py-4 text-sm text-on-surface">{k.anggotaDidampingi}</td>
                      <td className="px-5 py-4">
                        <button onClick={() => toggleAktif(k.id)} className={`relative w-11 h-6 rounded-full transition-colors ${k.isAktif ? "bg-primary" : "bg-outline-variant"}`}>
                          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${k.isAktif ? "left-[22px]" : "left-0.5"}`}></span>
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <button onClick={() => openEdit(k)} className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Monitor Aktivitas Kader */}
        <div>
          <h2 className="text-label-sm font-label-sm text-on-surface font-semibold mb-4">Monitor Aktivitas Kader</h2>
          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-bg border-b border-outline-variant/30 text-left">
                    {["Waktu", "Kader", "Anggota Dibantu", "Jenis Aksi", "Deskripsi"].map((h) => (
                      <th key={h} className="px-5 py-3 text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LOG_MONITOR.map((l, i) => (
                    <tr key={i} className="border-b border-outline-variant/20 hover:bg-primary/[0.02]">
                      <td className="px-5 py-4 text-sm text-on-surface-variant whitespace-nowrap">{l.waktu}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-on-surface">{l.namaKader}</td>
                      <td className="px-5 py-4 text-sm text-on-surface">{l.anggota}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${AKSI_COLOR[l.aksi]}`}>
                          {l.aksi.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-on-surface-variant">{l.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between">
              <h3 className="font-semibold text-on-surface">{editId ? "Edit Kader" : "Tambah Kader Baru"}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-surface-bg">
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Nama Lengkap", key: "nama", placeholder: "Nama kader" },
                { label: "NIK", key: "nik", placeholder: "16 digit NIK" },
                { label: "No HP", key: "noHp", placeholder: "08xx-xxxx-xxxx" },
                { label: "Wilayah/Dusun Tanggung Jawab", key: "wilayah", placeholder: "Contoh: Dusun Harapan RT 05" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">{label}</label>
                  <input
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-outline-variant/30 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-outline-variant/50 text-sm text-on-surface-variant hover:bg-surface-bg">Batal</button>
              <button onClick={handleSave} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-container transition-all shadow-md shadow-primary/20">
                {editId ? "Simpan" : "Tambah Kader"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
