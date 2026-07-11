import type { VoucherReward } from "./types";

export const BASE_DAILY_POINTS = 10;
export const STREAK_BONUS_PER_DAY = 5;
export const MAX_STREAK_BONUS = 50;

export function calcDailyPoints(streak: number): number {
  const bonus = Math.min((streak - 1) * STREAK_BONUS_PER_DAY, MAX_STREAK_BONUS);
  return BASE_DAILY_POINTS + Math.max(0, bonus);
}

export const VOUCHER_CATALOG: VoucherReward[] = [
  {
    id: "v1",
    nama: "Diskon 5% Gerai KDMP",
    deskripsi: "Berlaku untuk semua produk di Warung Koperasi Merah Putih.",
    poinDibutuhkan: 100,
    nilaiVoucher: "5%",
    icon: "percent",
    berlakuDi: "Warung Koperasi KDMP",
  },
  {
    id: "v2",
    nama: "Potongan Rp 10.000",
    deskripsi: "Minimal belanja Rp 50.000 di gerai unit usaha koperasi.",
    poinDibutuhkan: 200,
    nilaiVoucher: "Rp 10.000",
    icon: "sell",
    berlakuDi: "Semua Unit Usaha",
  },
  {
    id: "v3",
    nama: "Gratis 1 Liter Minyak Goreng",
    deskripsi: "Khusus produk Minyak Koperasi, stok terbatas.",
    poinDibutuhkan: 350,
    nilaiVoucher: "1 Liter",
    icon: "local_grocery_store",
    berlakuDi: "Warung Koperasi KDMP",
  },
  {
    id: "v4",
    nama: "Diskon 15% Pupuk Organik",
    deskripsi: "Untuk anggota unit pertanian koperasi.",
    poinDibutuhkan: 250,
    nilaiVoucher: "15%",
    icon: "compost",
    berlakuDi: "Agro Koperasi",
  },
];
