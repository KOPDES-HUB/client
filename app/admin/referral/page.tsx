"use client";

import { AppIcon } from "@/components/ui/app-icon";
import AdminTopBar from "@/components/layout/AdminTopBar";
import { useState } from "react";

const REFERRAL_DATA = [
  { id: "SMP-001", nama: "Budi Setiawan",   kode: "BSW2024", referralCount: 5, aktif: 3, konversi: 60, totalReward: 150_000 },
  { id: "SMP-002", nama: "Siti Rahayu",     kode: "SRH2024", referralCount: 4, aktif: 4, konversi: 100, totalReward: 200_000 },
  { id: "SMP-003", nama: "Ahmad Fauzan",    kode: "AFZ2024", referralCount: 7, aktif: 5, konversi: 71,  totalReward: 250_000 },
  { id: "SMP-004", nama: "Dewi Kusuma",     kode: "DKM2024", referralCount: 2, aktif: 1, konversi: 50,  totalReward: 50_000 },
  { id: "SMP-005", nama: "Eko Prasetyo",    kode: "EPR2024", referralCount: 3, aktif: 2, konversi: 67,  totalReward: 100_000 },
];

const PENDING_LIST = [
  { nama: "Hendra Kurniawan", referrer: "Budi Setiawan",  tanggal: "28 Jun 2024", status: "PENDING" },
  { nama: "Suparno",          referrer: "Ahmad Fauzan",   tanggal: "25 Jun 2024", status: "PENDING" },
  { nama: "Lastri Wahyuni",   referrer: "Dewi Kusuma",    tanggal: "20 Jun 2024", status: "PENDING" },
];

export default function AdminReferralPage() {
  const [rewardPerReferral, setRewardPerReferral] = useState(50_000);
  const [rewardDraftSaved, setRewardDraftSaved] = useState(false);

  const totalAnggotaBaru = REFERRAL_DATA.reduce((s, r) => s + r.referralCount, 0);
  const totalAktif = REFERRAL_DATA.reduce((s, r) => s + r.aktif, 0);
  const avgKonversi = Math.round(REFERRAL_DATA.reduce((s, r) => s + r.konversi, 0) / REFERRAL_DATA.length);
  const totalRewardDibayar = REFERRAL_DATA.reduce((s, r) => s + r.totalReward, 0);

  const saveReward = () => { setRewardDraftSaved(true); setTimeout(() => setRewardDraftSaved(false), 2000); };

  return (
    <>
      <AdminTopBar title="Program Referral" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-5">
          {[
            { label: "Total Diajak",      value: totalAnggotaBaru, icon: "people",     color: "text-on-surface" },
            { label: "Berhasil Aktif",    value: totalAktif,       icon: "how_to_reg", color: "text-primary" },
            { label: "Rata-rata Konversi",value: `${avgKonversi}%`,icon: "analytics",  color: "text-primary" },
            { label: "Total Reward Dibayar",value: `Rp ${(totalRewardDibayar/1e6).toFixed(2)}jt`, icon: "redeem", color: "text-on-surface" },
          ].map((s) => (
            <div key={s.label} className="bg-surface-card rounded-2xl border border-mint-200 p-5 shadow-md">
              <AppIcon name={s.icon} className={`mb-2 block ${s.color}`} />
              <p className="text-2xl font-bold text-on-surface">{s.value}</p>
              <p className="text-sm text-on-surface-variant">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Setting reward */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <AppIcon name="tune" className="text-primary" />
            <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">Setting Reward Referral</h3>
          </div>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">
                Reward per referral berhasil aktif (Rp)
              </label>
              <input
                type="number"
                min={0}
                step={10000}
                value={rewardPerReferral}
                onChange={(e) => setRewardPerReferral(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="pb-1">
              <p className="text-sm text-on-surface-variant">
                Reward dikirim ke simpanan sukarela referrer secara otomatis setelah KTA disetujui.
              </p>
            </div>
            <button
              onClick={saveReward}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                rewardDraftSaved ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-primary text-white hover:bg-primary-container shadow-md shadow-primary/20"
              }`}
            >
              <AppIcon name={rewardDraftSaved ? "check" : "save"} className="text-[18px]" />
              {rewardDraftSaved ? "Tersimpan!" : "Simpan Setting"}
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center gap-2">
            <AppIcon name="leaderboard" className="text-primary" />
            <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">Laporan Referral — Top Referrer</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg border-b border-outline-variant/30 text-left">
                  {["#", "Anggota", "Kode Referral", "Total Diajak", "Berhasil Aktif", "Konversi", "Total Reward"].map((h) => (
                    <th key={h} className="px-5 py-3 text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...REFERRAL_DATA].sort((a,b) => b.aktif - a.aktif).map((r, i) => (
                  <tr key={r.id} className="border-b border-outline-variant/20 hover:bg-primary/[0.02]">
                    <td className="px-5 py-4">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        i === 0 ? "bg-yellow-100 text-yellow-700" : i === 1 ? "bg-gray-100 text-gray-600" : i === 2 ? "bg-orange-100 text-orange-600" : "bg-surface-bg text-on-surface-variant"
                      }`}>{i + 1}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-on-surface">{r.nama}</p>
                      <p className="text-xs text-on-surface-variant">{r.id}</p>
                    </td>
                    <td className="px-5 py-4 font-mono text-sm text-primary font-bold">{r.kode}</td>
                    <td className="px-5 py-4 text-sm text-on-surface">{r.referralCount}</td>
                    <td className="px-5 py-4 text-sm font-bold text-primary">{r.aktif}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-20 h-2 bg-surface-bg rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${r.konversi}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-on-surface">{r.konversi}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-on-surface">
                      Rp {r.totalReward.toLocaleString("id")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending verifikasi */}
        {PENDING_LIST.length > 0 && (
          <div className="bg-surface-card rounded-2xl border border-amber-200 shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-amber-200 flex items-center gap-2 bg-amber-50">
              <AppIcon name="pending_actions" className="text-amber-600" />
              <h3 className="text-label-sm font-label-sm text-amber-900 font-semibold">
                Pendaftar Referral — Menunggu Verifikasi ({PENDING_LIST.length})
              </h3>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg border-b border-outline-variant/30 text-left">
                  {["Nama Pendaftar", "Dirujuk Oleh", "Tanggal Daftar", "Aksi"].map((h) => (
                    <th key={h} className="px-5 py-3 text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PENDING_LIST.map((p, i) => (
                  <tr key={i} className="border-b border-outline-variant/20">
                    <td className="px-5 py-4 text-sm font-semibold text-on-surface">{p.nama}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{p.referrer}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{p.tanggal}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-container transition-all">
                          Setujui
                        </button>
                        <button className="px-3 py-1.5 border border-outline-variant/50 text-on-surface-variant rounded-lg text-xs hover:bg-surface-bg transition-all">
                          Lihat Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
