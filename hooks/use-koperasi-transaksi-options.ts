import { useQuery } from "@tanstack/react-query";
import { getAllTransaksiPenjualan } from "@/lib/api/transaksiPenjualan";
import { extractUniqueKoperasiOptions } from "@/lib/transaksi-penjualan/koperasi-options";

export function useKoperasiTransaksiOptions() {
  return useQuery({
    queryKey: ["transaksi-penjualan", "koperasi-options"],
    queryFn: getAllTransaksiPenjualan,
    select: (res) => {
      if (!res.success || !res.data) return [];
      return extractUniqueKoperasiOptions(res.data);
    },
    staleTime: 5 * 60 * 1000,
  });
}
