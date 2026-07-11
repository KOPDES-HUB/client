import type {
  ArusKasNpvResponse,
  ArusKasTahunan,
  NpvDetailTahun,
  NpvResult,
  TransaksiPenjualanRow,
  TrenPenjualanItem,
  TrenPenjualanResponse,
} from "@/types/transaksiPenjualan";
import { formatRupiahPlain, randomBetween, seededRandom } from "./utils";

interface KoperasiMeta {
  koperasi_ref: string;
  nama_koperasi: string;
  modal_awal: number;
}

/** Sinkron dengan 5 koperasi di lib/mock/koperasi-list.ts */
export const MOCK_KOPERASI_META: KoperasiMeta[] = [
  { koperasi_ref: "KOP-2024-001", nama_koperasi: "Koperasi Desa Merauke Sejahtera", modal_awal: 250_000_000 },
  { koperasi_ref: "KOP-2024-002", nama_koperasi: "Koperasi Borneo Mandiri Sejahtera", modal_awal: 480_000_000 },
  { koperasi_ref: "KOP-2024-003", nama_koperasi: "Koperasi Desa Bunga Rafflesia", modal_awal: 175_000_000 },
  { koperasi_ref: "KOP-2024-004", nama_koperasi: "Koperasi Desa Sulawesi Bahari", modal_awal: 320_000_000 },
  { koperasi_ref: "KOP-2024-005", nama_koperasi: "Koperasi Desa Minang Makmur", modal_awal: 210_000_000 },
];

const NAMA_PELANGGAN = [
  "Siti Aminah", "Joko Prasetyo", "Made Wirawan", "Rina Kusuma", "Andi Saputra",
  "Dewi Lestari", "Bambang Sutrisno", "Ayu Puspita", "Rudi Hartono", "Nur Fadillah",
];
const METODE_PEMBAYARAN = ["Transfer Bank", "QRIS", "Tunai", "E-Wallet"];
const STATUS_WEIGHTED: { status: string; weight: number }[] = [
  { status: "Paid", weight: 7 },
  { status: "Pending", weight: 2 },
  { status: "Failed", weight: 1 },
];

function pickWeightedStatus(random: () => number): string {
  const total = STATUS_WEIGHTED.reduce((s, w) => s + w.weight, 0);
  let roll = random() * total;
  for (const w of STATUS_WEIGHTED) {
    if (roll < w.weight) return w.status;
    roll -= w.weight;
  }
  return "Paid";
}

function buildRowsForKoperasi(meta: KoperasiMeta): TransaksiPenjualanRow[] {
  const random = seededRandom(`rows-${meta.koperasi_ref}`);
  const count = Math.round(randomBetween(random, 10, 18));
  const now = new Date();

  return Array.from({ length: count }, (_, i) => {
    const daysAgo = Math.round(randomBetween(random, 0, 540));
    const tanggal = new Date(now);
    tanggal.setDate(tanggal.getDate() - daysAgo);

    const total = Math.round(randomBetween(random, 350_000, 15_000_000));
    const status = pickWeightedStatus(random);
    const pelanggan = NAMA_PELANGGAN[Math.floor(random() * NAMA_PELANGGAN.length)];
    const metode = METODE_PEMBAYARAN[Math.floor(random() * METODE_PEMBAYARAN.length)];

    return {
      transaksi_sample_id: `TRX-${meta.koperasi_ref}-${String(i + 1).padStart(3, "0")}`,
      koperasi_ref: meta.koperasi_ref,
      nama_pelanggan: pelanggan,
      tanggal_dibuat: tanggal.toISOString(),
      total_pembayaran: total,
      status_transaksi: status,
      metode_pembayaran: metode,
      dibuat_pada: tanggal.toISOString(),
      diperbarui_pada: tanggal.toISOString(),
      nama_koperasi: meta.nama_koperasi,
    };
  });
}

let _cachedRows: TransaksiPenjualanRow[] | null = null;

/** GET /api/transaksi-penjualan */
export function getMockTransaksiRows(): TransaksiPenjualanRow[] {
  if (!_cachedRows) {
    _cachedRows = MOCK_KOPERASI_META.flatMap(buildRowsForKoperasi).sort(
      (a, b) => new Date(b.tanggal_dibuat ?? 0).getTime() - new Date(a.tanggal_dibuat ?? 0).getTime(),
    );
  }
  return _cachedRows;
}

const BULAN_LABEL = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Ags", "Sep", "Okt", "Nov", "Des",
];

function findMeta(koperasiRef: string): KoperasiMeta {
  return (
    MOCK_KOPERASI_META.find((m) => m.koperasi_ref === koperasiRef) ?? {
      koperasi_ref: koperasiRef,
      nama_koperasi: null as unknown as string,
      modal_awal: 150_000_000,
    }
  );
}

/** GET /api/transaksi-penjualan/koperasi/:ref/tren-penjualan */
export function getMockTrenPenjualan(
  koperasiRef: string,
  tahun: number,
  bulan?: number,
): TrenPenjualanResponse {
  const meta = findMeta(koperasiRef);
  const scale = meta.modal_awal / 250_000_000;

  let tren: TrenPenjualanItem[];
  let granularity: "bulanan" | "harian";

  if (bulan) {
    const random = seededRandom(`tren-${koperasiRef}-${tahun}-${bulan}`);
    const daysInMonth = new Date(tahun, bulan, 0).getDate();
    tren = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const total = Math.round(randomBetween(random, 300_000, 1_800_000) * scale);
      const jumlah = Math.round(randomBetween(random, 1, 7));
      return { periode: day, label: String(day), total_penjualan: total, jumlah_transaksi: jumlah };
    });
    granularity = "harian";
  } else {
    const random = seededRandom(`tren-${koperasiRef}-${tahun}`);
    tren = BULAN_LABEL.map((label, i) => {
      const total = Math.round(randomBetween(random, 8_000_000, 22_000_000) * scale);
      const jumlah = Math.round(randomBetween(random, 15, 55));
      return { periode: i + 1, label, total_penjualan: total, jumlah_transaksi: jumlah };
    });
    granularity = "bulanan";
  }

  return {
    koperasi_ref: koperasiRef,
    nama_koperasi: meta.nama_koperasi,
    tahun,
    bulan: bulan ?? null,
    granularity,
    tren,
    total_penjualan: tren.reduce((s, t) => s + t.total_penjualan, 0),
    total_transaksi: tren.reduce((s, t) => s + t.jumlah_transaksi, 0),
  };
}

function buildNpv(
  modalAwal: number,
  arusKasPerTahun: ArusKasTahunan[],
  discountRate: number,
): NpvResult {
  const sorted = [...arusKasPerTahun].sort((a, b) => a.tahun - b.tahun);
  const detail: NpvDetailTahun[] = sorted.map((row, idx) => {
    const period = idx + 1;
    const discounted = row.arus_kas / Math.pow(1 + discountRate, period);
    return { tahun: row.tahun, arus_kas: row.arus_kas, period, discounted: Math.round(discounted) };
  });

  const totalArusKas = sorted.reduce((s, r) => s + r.arus_kas, 0);
  const totalDiscounted = detail.reduce((s, d) => s + d.discounted, 0);
  const nilai = Math.round(totalDiscounted - modalAwal);

  return {
    nilai,
    modal_awal: modalAwal,
    discount_rate: discountRate,
    rumus: "NPV = Σ (Arus Kas_t / (1 + r)^t) − Modal Awal",
    detail_per_tahun: detail,
    total_arus_kas: totalArusKas,
  };
}

/** GET /api/transaksi-penjualan/koperasi/:ref/arus-kas-npv */
export function getMockArusKasNpv(
  koperasiRef: string,
  discountRate: number,
): ArusKasNpvResponse {
  const meta = findMeta(koperasiRef);
  const random = seededRandom(`aruskas-${koperasiRef}`);
  const currentYear = new Date().getFullYear();

  const arusKasPerTahun: ArusKasTahunan[] = Array.from({ length: 5 }, (_, i) => {
    const tahun = currentYear - 4 + i;
    const growth = 1 + i * 0.08;
    const arusKas = Math.round(
      randomBetween(random, meta.modal_awal * 0.18, meta.modal_awal * 0.32) * growth,
    );
    return { tahun, arus_kas: arusKas };
  });

  const npv = buildNpv(meta.modal_awal, arusKasPerTahun, discountRate);
  const layak = npv.nilai > 0;

  return {
    koperasi_ref: koperasiRef,
    nama_koperasi: meta.nama_koperasi,
    modal_awal_raw: formatRupiahPlain(meta.modal_awal),
    modal_awal: meta.modal_awal,
    discount_rate: discountRate,
    arus_kas_per_tahun: arusKasPerTahun,
    npv,
    interpretasi: layak
      ? `Proyek unit usaha layak dijalankan karena NPV bernilai positif (${formatRupiahPlain(npv.nilai)}) pada discount rate ${(discountRate * 100).toFixed(1)}%.`
      : `Proyek unit usaha belum layak pada discount rate ${(discountRate * 100).toFixed(1)}% karena NPV masih negatif (${formatRupiahPlain(npv.nilai)}).`,
  };
}
