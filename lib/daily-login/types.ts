export interface VoucherReward {
  id: string;
  nama: string;
  deskripsi: string;
  poinDibutuhkan: number;
  nilaiVoucher: string;
  icon: string;
  berlakuDi: string;
}

export interface RedeemedVoucher {
  id: string;
  voucherId: string;
  nama: string;
  kode: string;
  redeemedAt: string;
  expiresAt: string;
}

export interface DailyLoginState {
  totalPoin: number;
  currentStreak: number;
  longestStreak: number;
  lastClaimDate: string | null;
  claimedDates: string[];
  redeemedVouchers: RedeemedVoucher[];
  claimDailyLogin: () => { success: boolean; poinEarned: number; message: string };
  redeemVoucher: (voucherId: string) => { success: boolean; message: string };
}
