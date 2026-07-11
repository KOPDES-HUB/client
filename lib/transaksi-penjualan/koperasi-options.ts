import type {
  KoperasiTransaksiOption,
  TransaksiPenjualanRow,
} from "@/types/transaksiPenjualan";

export function extractUniqueKoperasiOptions(
  rows: TransaksiPenjualanRow[],
): KoperasiTransaksiOption[] {
  const map = new Map<string, string | null>();

  for (const row of rows) {
    if (!map.has(row.koperasi_ref)) {
      map.set(row.koperasi_ref, row.nama_koperasi ?? null);
    }
  }

  return Array.from(map.entries())
    .map(([koperasi_ref, nama_koperasi]) => ({
      koperasi_ref,
      nama_koperasi,
      label: nama_koperasi
        ? `${koperasi_ref} — ${nama_koperasi}`
        : koperasi_ref,
    }))
    .sort((a, b) =>
      (a.nama_koperasi ?? a.koperasi_ref).localeCompare(
        b.nama_koperasi ?? b.koperasi_ref,
        "id",
      ),
    );
}
