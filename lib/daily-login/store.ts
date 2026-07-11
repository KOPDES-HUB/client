"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calcDailyPoints, VOUCHER_CATALOG } from "./config";
import type { DailyLoginState } from "./types";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function generateVoucherCode(): string {
  return `KDMP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export const useDailyLoginStore = create<DailyLoginState>()(
  persist(
    (set, get) => ({
      totalPoin: 120,
      currentStreak: 3,
      longestStreak: 7,
      lastClaimDate: yesterdayKey(),
      claimedDates: [],
      redeemedVouchers: [],

      claimDailyLogin: () => {
        const today = todayKey();
        const state = get();

        if (state.lastClaimDate === today) {
          return { success: false, poinEarned: 0, message: "Anda sudah klaim login hari ini." };
        }

        const wasYesterday = state.lastClaimDate === yesterdayKey();
        const newStreak = wasYesterday ? state.currentStreak + 1 : 1;
        const poinEarned = calcDailyPoints(newStreak);

        set({
          totalPoin: state.totalPoin + poinEarned,
          currentStreak: newStreak,
          longestStreak: Math.max(state.longestStreak, newStreak),
          lastClaimDate: today,
          claimedDates: [...state.claimedDates, today],
        });

        return {
          success: true,
          poinEarned,
          message: `Streak ${newStreak} hari! +${poinEarned} poin`,
        };
      },

      redeemVoucher: (voucherId) => {
        const voucher = VOUCHER_CATALOG.find((v) => v.id === voucherId);
        if (!voucher) {
          return { success: false, message: "Voucher tidak ditemukan." };
        }

        const state = get();
        if (state.totalPoin < voucher.poinDibutuhkan) {
          return {
            success: false,
            message: `Poin tidak cukup. Butuh ${voucher.poinDibutuhkan} poin.`,
          };
        }

        const expires = new Date();
        expires.setDate(expires.getDate() + 30);

        set({
          totalPoin: state.totalPoin - voucher.poinDibutuhkan,
          redeemedVouchers: [
            {
              id: `rv-${Date.now()}`,
              voucherId: voucher.id,
              nama: voucher.nama,
              kode: generateVoucherCode(),
              redeemedAt: new Date().toISOString(),
              expiresAt: expires.toISOString(),
            },
            ...state.redeemedVouchers,
          ],
        });

        return { success: true, message: `Voucher "${voucher.nama}" berhasil ditukar!` };
      },
    }),
    { name: "simpul-daily-login" },
  ),
);
