"use client";

import Link from "next/link";
import { useDailyLoginStore } from "@/lib/daily-login/store";
import { calcDailyPoints } from "@/lib/daily-login/config";
import { useState } from "react";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyLoginWidget({ compact = false }: { compact?: boolean }) {
  const { totalPoin, currentStreak, longestStreak, lastClaimDate, claimDailyLogin } =
    useDailyLoginStore();
  const [feedback, setFeedback] = useState<string | null>(null);

  const alreadyClaimed = lastClaimDate === todayKey();
  const nextPoints = calcDailyPoints(alreadyClaimed ? currentStreak + 1 : currentStreak);

  const handleClaim = () => {
    const result = claimDailyLogin();
    setFeedback(result.message);
    setTimeout(() => setFeedback(null), 3000);
  };

  if (compact) {
    return (
      <div className="rounded-2xl border border-mint-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5 shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-600">local_fire_department</span>
              <p className="text-label-sm font-label-sm text-on-surface font-semibold">Login Harian</p>
            </div>
            <p className="text-2xl font-bold text-on-surface mt-1">
              {currentStreak} hari <span className="text-sm font-normal text-on-surface-variant">streak</span>
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5">{totalPoin} poin tersedia</p>
          </div>
          <button
            type="button"
            onClick={handleClaim}
            disabled={alreadyClaimed}
            className={`shrink-0 px-4 py-2 rounded-xl text-label-sm font-label-sm transition-all ${
              alreadyClaimed
                ? "bg-mint-200 text-on-surface-variant cursor-default"
                : "bg-primary text-white hover:bg-primary-container shadow-md"
            }`}
          >
            {alreadyClaimed ? "Sudah Klaim" : `+${nextPoints} poin`}
          </button>
        </div>
        {feedback && <p className="text-xs text-primary mt-2 font-medium">{feedback}</p>}
        <Link href="/dashboard/daily-login" className="inline-flex items-center gap-1 text-xs text-primary font-semibold mt-3 hover:underline">
          Tukar voucher gerai KDMP
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-mint-200 bg-surface-card shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            <div>
              <p className="text-label-sm font-label-sm opacity-90">Streak Login Harian</p>
              <p className="text-headline-md font-headline-md">{currentStreak} Hari Berturut-turut</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-label-xs opacity-80">Rekor Terbaik</p>
            <p className="text-xl font-bold">{longestStreak} hari</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-body-md text-on-surface-variant">
          Login setiap hari untuk kumpulkan poin bonus. Poin bisa ditukar voucher diskon di gerai KDMP!
        </p>

        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 7 }).map((_, i) => {
            const dayNum = i + 1;
            const done = dayNum <= currentStreak;
            const isToday = dayNum === currentStreak + (alreadyClaimed ? 0 : 1) && !alreadyClaimed;
            return (
              <div
                key={dayNum}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border ${
                  done
                    ? "bg-primary/10 border-primary/30"
                    : isToday
                      ? "bg-amber-50 border-amber-300 ring-2 ring-amber-200"
                      : "bg-surface-bg border-outline-variant/30"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    done ? "text-primary" : isToday ? "text-amber-600" : "text-outline-variant"
                  }`}
                  style={done ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {done ? "check_circle" : isToday ? "redeem" : "circle"}
                </span>
                <span className="text-[10px] text-on-surface-variant">Hari {dayNum}</span>
                <span className="text-[10px] font-bold text-primary">+{calcDailyPoints(dayNum)}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-label-xs text-on-surface-variant uppercase">Total Poin</p>
            <p className="text-xl font-bold text-on-surface">{totalPoin} poin</p>
          </div>
          <button
            type="button"
            onClick={handleClaim}
            disabled={alreadyClaimed}
            className={`px-6 py-3 rounded-xl text-label-sm font-label-sm transition-all ${
              alreadyClaimed
                ? "bg-mint-200 text-on-surface-variant"
                : "bg-primary text-white hover:bg-primary-container shadow-lg shadow-primary/20"
            }`}
          >
            {alreadyClaimed ? "✓ Sudah Klaim Hari Ini" : `Klaim +${nextPoints} Poin`}
          </button>
        </div>
        {feedback && (
          <p className="text-sm text-primary font-medium text-center">{feedback}</p>
        )}
      </div>
    </div>
  );
}
