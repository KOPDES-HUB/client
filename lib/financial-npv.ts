import type { NpvTahunanRow } from "@/types/transaksiPenjualan";

export function buildNpvTahunanRows(
  modalAwal: number,
  detailPerTahun: { tahun: number; arus_kas: number; period: number; discounted: number }[],
): NpvTahunanRow[] {
  let cumulative = -modalAwal;
  return [...detailPerTahun]
    .sort((a, b) => a.tahun - b.tahun)
    .map((row) => {
      cumulative += row.discounted;
      return {
        ...row,
        npv_kumulatif: Math.round(cumulative * 100) / 100,
      };
    });
}

export function isLayakByNpv(npv: number): boolean {
  return npv > 0;
}
