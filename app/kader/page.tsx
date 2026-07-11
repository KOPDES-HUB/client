"use client";

import { AppIcon } from "@/components/ui/app-icon";
import TopBar from "@/components/layout/TopBar";
import { useState } from "react";

const ANGGOTA_DB = [
  { id: "SMP-001", nama: "Budi Setiawan",  usia: 32, dusun: "Harapan",    noHp: "0812-3456-7890" },
  { id: "SMP-002", nama: "Siti Rahayu",    usia: 28, dusun: "Subur",      noHp: "0813-2345-6789" },
  { id: "SMP-003", nama: "Ahmad Fauzan",   usia: 35, dusun: "Mekar Jaya", noHp: "0814-3456-7890" },
  { id: "SMP-004", nama: "Dewi Kusuma",    usia: 29, dusun: "Subur",      noHp: "0815-4567-8901" },
  { id: "SMP-087", nama: "Karno Sutrisno", usia: 62, dusun: "Bakti",      noHp: "0816-5678-9012" },
  { id: "SMP-093", nama: "Mbok Sari",      usia: 58, dusun: "Sumber Asri",noHp: "0817-6789-0123" },
];

const UNIT_OPTIONS = [
  { id: "1", nama: "Warung Koperasi",    paramPoin: 1.0 },
  { id: "2", nama: "Unit Simpan Pinjam", paramPoin: 1.0 },
  { id: "3", nama: "Agro Koperasi",      paramPoin: 1.0 },
  { id: "4", nama: "Unit Jasa Fotocopy", paramPoin: 0.5 },
];

const VOTING_OPTIONS = [
  { id: "v1", judul: "Persetujuan Pengadaan Stok Beras" },
  { id: "v2", judul: "Penetapan Suku Bunga Pinjaman 2025" },
];

const RAT_OPTIONS = [
  { id: "r1", tahun: "RAT 2024 — 15 Jul 2024" },
];

type AksiType = "TRANSAKSI" | "ABSENSI_RAT" | "VOTE" | null;

interface LogEntry {
  id: string;
  waktu: string;
  namaAnggota: string;
  jenisAksi: string;
  deskripsi: string;
}

export default function KaderBantuPage() {
  const [query, setQuery] = useState("");
  const [selectedAnggota, setSelectedAnggota] = useState<typeof ANGGOTA_DB[0] | null>(null);
  const [aksi, setAksi] = useState<AksiType>(null);
  const [log, setLog] = useState<LogEntry[]>([]);

  // Transaksi form
  const [txUnit, setTxUnit] = useState("1");
  const [txNominal, setTxNominal] = useState("");

  // Vote form
  const [voteId, setVoteId] = useState("v1");
  const [votePilihan, setVotePilihan] = useState("");
  const [voteKonfirmasi, setVoteKonfirmasi] = useState(false);

  // RAT form
  const [ratId, setRatId] = useState("r1");

  const filtered = ANGGOTA_DB.filter(
    (a) =>
      a.nama.toLowerCase().includes(query.toLowerCase()) ||
      a.id.toLowerCase().includes(query.toLowerCase())
  );

  const addLog = (jenisAksi: string, deskripsi: string) => {
    setLog((l) => [
      {
        id: String(Date.now()),
        waktu: new Date().toLocaleTimeString("id"),
        namaAnggota: selectedAnggota?.nama ?? "–",
        jenisAksi,
        deskripsi,
      },
      ...l,
    ]);
  };

  const handleTransaksi = () => {
    const unit = UNIT_OPTIONS.find((u) => u.id === txUnit)!;
    const poin = Math.floor(Number(txNominal) / 10_000) * unit.paramPoin;
    addLog("TRANSAKSI", `Rp ${Number(txNominal).toLocaleString("id")} di ${unit.nama} → ${poin} poin`);
    setAksi(null);
    setTxNominal("");
  };

  const handleAbsensi = () => {
    const rat = RAT_OPTIONS.find((r) => r.id === ratId)!;
    addLog("ABSENSI_RAT", `Hadir di ${rat.tahun}`);
    setAksi(null);
  };

  const handleVote = () => {
    if (!voteKonfirmasi || !votePilihan) return;
    const sesi = VOTING_OPTIONS.find((v) => v.id === voteId)!;
    addLog("VOTE", `Voting "${sesi.judul}" — pilihan: "${votePilihan}" — atas konfirmasi anggota`);
    setAksi(null);
    setVotePilihan("");
    setVoteKonfirmasi(false);
  };

  return (
    <>
      <TopBar
        title="Bantu Anggota"
        breadcrumb={[{ label: "Panel Kader" }, { label: "Bantu Anggota" }]}
        showSearch={false}
      />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Warning note */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AppIcon name="policy" className="text-amber-500 mt-0.5" />
          <div className="text-sm text-amber-900">
            <strong>Panduan Kader:</strong> Semua aksi yang Anda lakukan atas nama anggota akan dicatat otomatis
            dalam audit trail dengan nama kader, waktu, dan detail aksi. Pastikan anggota memberikan persetujuan
            sebelum Anda melakukan aksi apapun atas namanya.
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {/* Left: Cari anggota */}
          <div className="col-span-2 space-y-4">
            <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-5">
              <h3 className="text-label-sm font-label-sm text-on-surface font-semibold mb-4">Cari Anggota</h3>
              <div className="relative mb-4">
                <AppIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant" />
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedAnggota(null); setAksi(null); }}
                  className="w-full pl-10 pr-4 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Nama atau ID anggota…"
                />
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto" data-lenis-prevent>
                {filtered.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => { setSelectedAnggota(a); setAksi(null); }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedAnggota?.id === a.id
                        ? "border-primary bg-primary/5"
                        : "border-outline-variant/40 hover:border-primary/40 hover:bg-primary/[0.02]"
                    }`}
                  >
                    <p className="text-sm font-semibold text-on-surface">{a.nama}</p>
                    <p className="text-xs text-on-surface-variant">{a.id} · {a.dusun} · {a.usia} th</p>
                  </button>
                ))}
                {filtered.length === 0 && query && (
                  <p className="text-sm text-on-surface-variant text-center py-4">Anggota tidak ditemukan.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Aksi panel */}
          <div className="col-span-3">
            {!selectedAnggota ? (
              <div className="bg-surface-card rounded-2xl border border-outline-variant/30 shadow-md h-full flex flex-col items-center justify-center p-8 text-center">
                <AppIcon name="person_search" className="text-4xl text-on-surface-variant mb-3" />
                <p className="text-label-sm font-label-sm text-on-surface mb-1">Pilih Anggota</p>
                <p className="text-sm text-on-surface-variant">Cari dan pilih anggota dari panel kiri untuk mulai membantu.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Selected anggota card */}
                <div className="bg-inverse-surface rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-inverse-surface font-bold">
                    {selectedAnggota.nama.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-primary-fixed font-bold">{selectedAnggota.nama}</p>
                    <p className="text-secondary-fixed-dim text-sm">{selectedAnggota.id} · {selectedAnggota.dusun} · {selectedAnggota.noHp}</p>
                  </div>
                  <span className="px-3 py-1.5 bg-primary/20 rounded-lg text-primary-fixed text-xs font-bold">
                    Anggota Terpilih
                  </span>
                </div>

                {/* Aksi buttons */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: "TRANSAKSI" as AksiType, icon: "shopping_cart", label: "Input Transaksi" },
                    { type: "ABSENSI_RAT" as AksiType, icon: "qr_code_scanner", label: "Absensi RAT" },
                    { type: "VOTE" as AksiType, icon: "how_to_vote", label: "Bantu Vote" },
                  ].map(({ type, icon, label }) => (
                    <button
                      key={type}
                      onClick={() => setAksi(aksi === type ? null : type)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                        aksi === type
                          ? "border-primary bg-primary/5"
                          : "border-outline-variant/40 hover:border-primary/40 bg-surface-card"
                      }`}
                    >
                      <AppIcon name={icon} className={`text-2xl ${aksi === type ? "text-primary" : "text-on-surface-variant"}`} />
                      <span className={`text-xs font-semibold ${aksi === type ? "text-primary" : "text-on-surface-variant"}`}>{label}</span>
                    </button>
                  ))}
                </div>

                {/* Aksi form */}
                {aksi === "TRANSAKSI" && (
                  <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-5 space-y-4">
                    <h4 className="text-label-sm font-label-sm text-on-surface font-semibold">Input Transaksi atas nama {selectedAnggota.nama}</h4>
                    <div>
                      <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Unit Usaha</label>
                      <select value={txUnit} onChange={(e) => setTxUnit(e.target.value)} className="w-full px-3 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary">
                        {UNIT_OPTIONS.map((u) => <option key={u.id} value={u.id}>{u.nama}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Nominal (Rp)</label>
                      <input type="number" value={txNominal} onChange={(e) => setTxNominal(e.target.value)}
                        className="w-full px-3 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary"
                        placeholder="Contoh: 50000" />
                    </div>
                    {txNominal && (
                      <p className="text-sm text-primary">
                        Poin: {Math.floor(Number(txNominal) / 10_000) * (UNIT_OPTIONS.find(u => u.id === txUnit)?.paramPoin ?? 1)}
                      </p>
                    )}
                    <button onClick={handleTransaksi} className="w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-container transition-all">
                      Konfirmasi & Catat Transaksi
                    </button>
                  </div>
                )}

                {aksi === "ABSENSI_RAT" && (
                  <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-5 space-y-4">
                    <h4 className="text-label-sm font-label-sm text-on-surface font-semibold">Absensi RAT atas nama {selectedAnggota.nama}</h4>
                    <div>
                      <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Sesi RAT</label>
                      <select value={ratId} onChange={(e) => setRatId(e.target.value)} className="w-full px-3 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary">
                        {RAT_OPTIONS.map((r) => <option key={r.id} value={r.id}>{r.tahun}</option>)}
                      </select>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
                      Pastikan anggota hadir secara fisik dan menyetujui pencatatan kehadiran ini.
                    </div>
                    <button onClick={handleAbsensi} className="w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-container transition-all">
                      Konfirmasi Kehadiran
                    </button>
                  </div>
                )}

                {aksi === "VOTE" && (
                  <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-5 space-y-4">
                    <h4 className="text-label-sm font-label-sm text-on-surface font-semibold">Bantu Vote atas nama {selectedAnggota.nama}</h4>
                    <div>
                      <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Sesi Voting</label>
                      <select value={voteId} onChange={(e) => setVoteId(e.target.value)} className="w-full px-3 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary">
                        {VOTING_OPTIONS.map((v) => <option key={v.id} value={v.id}>{v.judul}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">Pilihan Anggota (sebutkan secara verbal)</label>
                      <input value={votePilihan} onChange={(e) => setVotePilihan(e.target.value)}
                        className="w-full px-3 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary"
                        placeholder="Tulis pilihan anggota…" />
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={voteKonfirmasi} onChange={(e) => setVoteKonfirmasi(e.target.checked)} className="mt-0.5" />
                      <span className="text-sm text-on-surface">
                        Saya konfirmasi bahwa <strong>{selectedAnggota.nama}</strong> telah menyampaikan pilihannya secara langsung kepada saya.
                        Aksi ini akan dicatat sebagai &quot;diinput oleh Kader&quot; dalam audit trail.
                      </span>
                    </label>
                    <button
                      onClick={handleVote}
                      disabled={!voteKonfirmasi || !votePilihan}
                      className="w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-container transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Catat Vote atas Nama Anggota
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Session log */}
        {log.length > 0 && (
          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center gap-2">
              <AppIcon name="history" className="text-primary" />
              <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">Log Aksi Sesi Ini</h3>
            </div>
            <div className="divide-y divide-outline-variant/20">
              {log.map((entry) => (
                <div key={entry.id} className="px-6 py-3 flex items-start gap-4">
                  <span className="text-xs text-on-surface-variant w-16 flex-shrink-0 pt-0.5">{entry.waktu}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${
                    entry.jenisAksi === "TRANSAKSI" ? "bg-primary-fixed text-on-primary-fixed-variant" :
                    entry.jenisAksi === "ABSENSI_RAT" ? "bg-tertiary-fixed text-on-tertiary-fixed-variant" :
                    "bg-secondary-container text-on-surface"
                  }`}>{entry.jenisAksi}</span>
                  <div>
                    <span className="text-sm font-medium text-on-surface">{entry.namaAnggota}</span>
                    <span className="text-sm text-on-surface-variant"> — {entry.deskripsi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
