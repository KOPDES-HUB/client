import { useQuery } from "@tanstack/react-query";
import { getTrenPenjualanByKoperasi } from "@/lib/api/transaksiPenjualan";

export function useTrenPenjualan(
  koperasiRef: string,
  tahun: number,
  bulan?: number | null,
) {
  return useQuery({
    queryKey: ["tren-penjualan", koperasiRef, tahun, bulan ?? null],
    queryFn: () =>
      getTrenPenjualanByKoperasi(koperasiRef, {
        tahun,
        ...(bulan != null ? { bulan } : {}),
      }),
    enabled: Boolean(koperasiRef?.trim()),
    select: (res) => (res.success ? res.data : undefined),
  });
}

export const BULAN_OPTIONS = [
  { value: 1, label: "Januari" },
  { value: 2, label: "Februari" },
  { value: 3, label: "Maret" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "Juni" },
  { value: 7, label: "Juli" },
  { value: 8, label: "Agustus" },
  { value: 9, label: "September" },
  { value: 10, label: "Oktober" },
  { value: 11, label: "November" },
  { value: 12, label: "Desember" },
];

export function buildYearOptions(count = 6): number[] {
  const current = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) => current - i);
}
