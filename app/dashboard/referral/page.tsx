"use client";

import TopBar from "@/components/layout/TopBar";
import { useState } from "react";

const KODE_REFERRAL = "BSW2024";
const REFERRAL_LINK = `https://simpul.id/cari-koperasi?ref=${KODE_REFERRAL}`;

const REFERRAL_LIST = [
  { nama: "Agus Santoso",    tanggal: "8 Jul 2024",  status: "AKTIF",   reward: "Rp 50.000" },
  { nama: "Rina Wijayanti",  tanggal: "5 Jul 2024",  status: "AKTIF",   reward: "Rp 50.000" },
  { nama: "Hendra Kurniawan",tanggal: "28 Jun 2024", status: "PENDING", reward: "–" },
  { nama: "Suparmi",         tanggal: "20 Jun 2024", status: "AKTIF",   reward: "Rp 50.000" },
  { nama: "Darto Susilo",    tanggal: "10 Jun 2024", status: "DITOLAK", reward: "–" },
];

const STATUS_COLOR: Record<string, string> = {
  AKTIF:   "bg-primary-fixed text-on-primary-fixed-variant",
  PENDING: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  DITOLAK: "bg-error-container text-on-error-container",
};

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const aktif = REFERRAL_LIST.filter((r) => r.status === "AKTIF").length;
  const totalReward = aktif * 50_000;

  return (
    <>
      <TopBar
        title="Ajak Tetangga"
        breadcrumb={[{ label: "Dashboard", href: "/dashboard" }, { label: "Referral" }]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Hero referral card */}
        <div className="bg-inverse-surface rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/3 translate-x-1/4"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary-fixed text-2xl">group_add</span>
              <span className="text-primary-fixed font-bold text-lg">Ajak Tetangga, Tumbuh Bersama</span>
            </div>
            <p className="text-secondary-fixed-dim text-sm leading-relaxed max-w-lg mb-6">
              Setiap tetangga atau kenalan yang berhasil menjadi anggota aktif koperasi lewat kode referral Anda,
              Anda mendapatkan reward langsung ke saldo simpanan. Bantu koperasi tumbuh, nikmati manfaatnya bersama.
            </p>

            {/* Kode referral */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-white/10 rounded-xl px-5 py-3 flex items-center gap-4">
                <div>
                  <p className="text-[10px] text-secondary-fixed-dim uppercase tracking-wider">Kode Referral Anda</p>
                  <p className="text-primary-fixed font-bold text-xl tracking-widest font-mono">{KODE_REFERRAL}</p>
                </div>
                <button
                  onClick={() => handleCopy(KODE_REFERRAL)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-primary-fixed text-sm font-medium transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">{copied ? "check" : "content_copy"}</span>
                  {copied ? "Disalin!" : "Salin"}
                </button>
              </div>

              {/* Share buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(REFERRAL_LINK)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-container transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">link</span>
                  Salin Link
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Halo! Yuk daftar jadi anggota koperasi SIMPUL Merah Putih bareng saya 🌿\n\nDaftar via link ini: ${REFERRAL_LINK}\n\nAtau pakai kode referral: *${KODE_REFERRAL}*`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white rounded-xl text-sm font-semibold hover:bg-[#1da851] transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  Share WA
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5">
          {[
            { label: "Total Diajak",      value: REFERRAL_LIST.length,                  icon: "people",       color: "text-on-surface" },
            { label: "Berhasil Aktif",    value: aktif,                                  icon: "how_to_reg",   color: "text-primary" },
            { label: "Total Reward",      value: `Rp ${totalReward.toLocaleString("id")}`, icon: "redeem",    color: "text-primary" },
          ].map((s) => (
            <div key={s.label} className="bg-surface-card rounded-2xl border border-mint-200 p-6 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-on-surface-variant mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tracker list */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/30">
            <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">Tracker Referral</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Reward diberikan setelah anggota yang Anda ajak diverifikasi dan berstatus AKTIF.
            </p>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-bg border-b border-outline-variant/30 text-left">
                {["Nama", "Tanggal Daftar", "Status", "Reward Anda"].map((h) => (
                  <th key={h} className="px-6 py-3 text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REFERRAL_LIST.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant/20 hover:bg-primary/[0.02]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {r.nama.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-on-surface">{r.nama}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{r.tanggal}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${STATUS_COLOR[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-primary">{r.reward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How it works */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
          <h3 className="text-label-sm font-label-sm text-on-surface font-semibold mb-4">Cara Kerja Program Referral</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { step: "1", icon: "share", title: "Bagikan Kode", desc: "Kirim kode atau link referral ke tetangga atau kenalan Anda lewat WA." },
              { step: "2", icon: "app_registration", title: "Mereka Daftar", desc: "Orang yang Anda ajak mendaftar menggunakan kode referral Anda." },
              { step: "3", icon: "verified_user", title: "Diverifikasi", desc: "Admin memverifikasi dan mengaktifkan KTA anggota baru." },
              { step: "4", icon: "redeem", title: "Reward Masuk", desc: "Reward langsung masuk ke simpanan sukarela Anda otomatis." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-primary">{s.icon}</span>
                </div>
                <p className="text-sm font-bold text-on-surface mb-1">{s.title}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
