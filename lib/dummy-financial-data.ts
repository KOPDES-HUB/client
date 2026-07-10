import type { ProyeksiCashflowTahun } from "./financial-calculations";

/** Struktur identik dengan model Prisma `RencanaInvestasi` (future) */
export interface RencanaInvestasi {
  id: string;
  koperasiRef: string;
  namaProyek: string;
  modalAwal: number;
  umurProyek: number;
  discountRate: number;
  proyeksiCashflow: ProyeksiCashflowTahun[];
  dibuatPada: string;
  diperbaruiPada: string;
}

export const KOPERASI_REF = "KOPDES-MP-001";

export const DUMMY_RENCANA_INVESTASI: RencanaInvestasi[] = [
  {
    id: "INV-001",
    koperasiRef: KOPERASI_REF,
    namaProyek: "Mesin Penggilingan Padi",
    modalAwal: 150_000_000,
    umurProyek: 5,
    discountRate: 12,
    dibuatPada: "2025-01-10T08:00:00Z",
    diperbaruiPada: "2025-06-15T10:30:00Z",
    proyeksiCashflow: [
      { tahun: 1, pendapatan: 45_000_000, biayaOperasional: 28_000_000 },
      { tahun: 2, pendapatan: 52_000_000, biayaOperasional: 30_000_000 },
      { tahun: 3, pendapatan: 58_000_000, biayaOperasional: 32_000_000 },
      { tahun: 4, pendapatan: 60_000_000, biayaOperasional: 33_000_000 },
      { tahun: 5, pendapatan: 55_000_000, biayaOperasional: 31_000_000 },
    ],
  },
  {
    id: "INV-002",
    koperasiRef: KOPERASI_REF,
    namaProyek: "Gudang Penyimpanan Hasil Panen",
    modalAwal: 80_000_000,
    umurProyek: 7,
    discountRate: 10,
    dibuatPada: "2025-02-05T08:00:00Z",
    diperbaruiPada: "2025-06-20T14:00:00Z",
    proyeksiCashflow: [
      { tahun: 1, pendapatan: 18_000_000, biayaOperasional: 10_000_000 },
      { tahun: 2, pendapatan: 22_000_000, biayaOperasional: 11_000_000 },
      { tahun: 3, pendapatan: 26_000_000, biayaOperasional: 12_000_000 },
      { tahun: 4, pendapatan: 28_000_000, biayaOperasional: 12_500_000 },
      { tahun: 5, pendapatan: 30_000_000, biayaOperasional: 13_000_000 },
      { tahun: 6, pendapatan: 29_000_000, biayaOperasional: 12_800_000 },
      { tahun: 7, pendapatan: 27_000_000, biayaOperasional: 12_000_000 },
    ],
  },
  {
    id: "INV-003",
    koperasiRef: KOPERASI_REF,
    namaProyek: "Alat Pengolahan Pasca-Panen",
    modalAwal: 120_000_000,
    umurProyek: 5,
    discountRate: 11,
    dibuatPada: "2025-03-12T08:00:00Z",
    diperbaruiPada: "2025-07-01T09:45:00Z",
    proyeksiCashflow: [
      { tahun: 1, pendapatan: 38_000_000, biayaOperasional: 24_000_000 },
      { tahun: 2, pendapatan: 48_000_000, biayaOperasional: 26_000_000 },
      { tahun: 3, pendapatan: 55_000_000, biayaOperasional: 28_000_000 },
      { tahun: 4, pendapatan: 58_000_000, biayaOperasional: 29_000_000 },
      { tahun: 5, pendapatan: 52_000_000, biayaOperasional: 27_000_000 },
    ],
  },
];

export function createEmptyProyeksi(umurProyek: number): ProyeksiCashflowTahun[] {
  return Array.from({ length: umurProyek }, (_, i) => ({
    tahun: i + 1,
    pendapatan: 0,
    biayaOperasional: 0,
  }));
}

export function rencanaToFormState(rencana: RencanaInvestasi) {
  return {
    namaProyek: rencana.namaProyek,
    modalAwal: rencana.modalAwal,
    umurProyek: rencana.umurProyek,
    discountRate: rencana.discountRate,
    proyeksiCashflow: rencana.proyeksiCashflow.map((p) => ({ ...p })),
  };
}

export type RencanaFormState = ReturnType<typeof rencanaToFormState>;

export const DEFAULT_FORM: RencanaFormState = rencanaToFormState(
  DUMMY_RENCANA_INVESTASI[0],
);
