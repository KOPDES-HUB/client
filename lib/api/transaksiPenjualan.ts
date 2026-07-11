import { api } from "../axios";
import type { ApiResponse } from "@/types/api";
import type {
  ArusKasNpvResponse,
  TransaksiPenjualanRow,
  TrenPenjualanResponse,
} from "@/types/transaksiPenjualan";

export async function getAllTransaksiPenjualan() {
  const { data } = await api.get<ApiResponse<TransaksiPenjualanRow[]>>(
    "/api/transaksi-penjualan",
  );
  return data;
}

export async function getTrenPenjualanByKoperasi(
  koperasiRef: string,
  params: { tahun: number; bulan?: number },
) {
  const { data } = await api.get<ApiResponse<TrenPenjualanResponse>>(
    `/api/transaksi-penjualan/koperasi/${encodeURIComponent(koperasiRef)}/tren-penjualan`,
    {
      params: {
        tahun: params.tahun,
        ...(params.bulan != null ? { bulan: params.bulan } : {}),
      },
    },
  );
  return data;
}

export async function getArusKasDanNPV(
  koperasiRef: string,
  discountRate = 0.1,
) {
  const { data } = await api.get<ApiResponse<ArusKasNpvResponse>>(
    `/api/transaksi-penjualan/koperasi/${encodeURIComponent(koperasiRef)}/arus-kas-npv`,
    { params: { discount_rate: discountRate } },
  );
  return data;
}
