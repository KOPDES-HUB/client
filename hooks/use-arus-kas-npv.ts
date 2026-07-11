import { useQuery } from "@tanstack/react-query";
import { getArusKasDanNPV } from "@/lib/api/transaksiPenjualan";

export function useArusKasNpv(koperasiRef: string, discountRatePercent: number) {
  const discountRate = discountRatePercent / 100;

  return useQuery({
    queryKey: ["arus-kas-npv", koperasiRef, discountRate],
    queryFn: () => getArusKasDanNPV(koperasiRef, discountRate),
    enabled: Boolean(koperasiRef?.trim()),
    select: (res) => (res.success ? res.data : undefined),
  });
}
