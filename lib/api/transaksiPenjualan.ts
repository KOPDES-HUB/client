import type { ApiResponse } from "@/types/api";
import type {
  ArusKasNpvResponse,
  TransaksiPenjualanRow,
  TrenPenjualanResponse,
} from "@/types/transaksiPenjualan";
import {
  getMockArusKasNpv,
  getMockTransaksiRows,
  getMockTrenPenjualan,
} from "@/lib/mock/transaksi-penjualan";
import { mockDelay } from "@/lib/mock/utils";

/**
 * Backend belum selesai deploy — 3 endpoint transaksi penjualan ini
 * memakai data dummy yang dibangkitkan secara deterministik.
 */
export async function getAllTransaksiPenjualan() {
  return mockDelay<ApiResponse<TransaksiPenjualanRow[]>>({
    success: true,
    message: "OK",
    data: getMockTransaksiRows(),
  });
}

export async function getTrenPenjualanByKoperasi(
  koperasiRef: string,
  params: { tahun: number; bulan?: number },
) {
  return mockDelay<ApiResponse<TrenPenjualanResponse>>({
    success: true,
    message: "OK",
    data: getMockTrenPenjualan(koperasiRef, params.tahun, params.bulan),
  });
}

export async function getArusKasDanNPV(
  koperasiRef: string,
  discountRate = 0.1,
) {
  return mockDelay<ApiResponse<ArusKasNpvResponse>>({
    success: true,
    message: "OK",
    data: getMockArusKasNpv(koperasiRef, discountRate),
  });
}
