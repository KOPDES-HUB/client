"use client";

import TopBar from "@/components/layout/TopBar";
import DailyLoginWidget from "@/components/daily-login/DailyLoginWidget";
import { useDailyLoginStore } from "@/lib/daily-login/store";
import { VOUCHER_CATALOG } from "@/lib/daily-login/config";
import { useState } from "react";

export default function DailyLoginPage() {
  const { totalPoin, redeemedVouchers, redeemVoucher } = useDailyLoginStore();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleRedeem = (id: string) => {
    const result = redeemVoucher(id);
    setFeedback(result.message);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <>
      <TopBar
        title="Login Harian & Reward"
        breadcrumb={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Login Harian" },
        ]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        <DailyLoginWidget />

        {feedback && (
          <div className="px-4 py-3 bg-primary-fixed text-on-primary-fixed-variant rounded-xl text-sm font-medium">
            {feedback}
          </div>
        )}

        {/* Voucher catalog */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-headline-md font-headline-md text-on-surface">
                Tukar Poin → Voucher Gerai KDMP
              </h3>
              <p className="text-body-md text-on-surface-variant mt-1">
                Gunakan poin login harian untuk diskon belanja di unit usaha koperasi.
              </p>
            </div>
            <div className="text-right">
              <p className="text-label-xs text-on-surface-variant uppercase">Saldo Poin</p>
              <p className="text-2xl font-bold text-primary">{totalPoin}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VOUCHER_CATALOG.map((v) => {
              const canRedeem = totalPoin >= v.poinDibutuhkan;
              return (
                <div
                  key={v.id}
                  className="bg-surface-card rounded-2xl border border-mint-200 p-6 shadow-md flex gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-2xl">{v.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-label-sm font-label-sm text-on-surface font-semibold">{v.nama}</p>
                    <p className="text-xs text-on-surface-variant mt-1">{v.deskripsi}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold rounded-full">
                        {v.nilaiVoucher}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">{v.berlakuDi}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-bold text-primary">{v.poinDibutuhkan} poin</span>
                      <button
                        type="button"
                        onClick={() => handleRedeem(v.id)}
                        disabled={!canRedeem}
                        className={`px-4 py-2 rounded-xl text-label-sm font-label-sm transition-all ${
                          canRedeem
                            ? "bg-primary text-white hover:bg-primary-container"
                            : "bg-mint-200 text-on-surface-variant cursor-not-allowed"
                        }`}
                      >
                        Tukar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Redeemed vouchers */}
        {redeemedVouchers.length > 0 && (
          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant/30">
              <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">
                Voucher Saya
              </h3>
            </div>
            <div className="divide-y divide-outline-variant/20">
              {redeemedVouchers.map((v) => (
                <div key={v.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{v.nama}</p>
                    <p className="text-xs font-mono text-primary mt-0.5">{v.kode}</p>
                  </div>
                  <div className="text-right text-xs text-on-surface-variant">
                    <p>Ditukar: {new Date(v.redeemedAt).toLocaleDateString("id-ID")}</p>
                    <p>Berlaku s/d: {new Date(v.expiresAt).toLocaleDateString("id-ID")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Persuasive tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: "local_fire_department",
              title: "Jaga Streak!",
              desc: "Login 7 hari berturut-turut untuk bonus poin maksimal +50/hari.",
            },
            {
              icon: "storefront",
              title: "Belanja di Gerai KDMP",
              desc: "Tunjukkan kode voucher saat checkout di Warung Koperasi.",
            },
            {
              icon: "chat",
              title: "Notifikasi WA",
              desc: "Dapatkan info promo & stok terbaru langsung ke WhatsApp Anda.",
            },
          ].map((tip) => (
            <div
              key={tip.title}
              className="bg-surface-bg rounded-xl border border-mint-200 p-5"
            >
              <span className="material-symbols-outlined text-primary text-2xl">{tip.icon}</span>
              <p className="text-label-sm font-label-sm text-on-surface mt-2 font-semibold">{tip.title}</p>
              <p className="text-xs text-on-surface-variant mt-1">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
