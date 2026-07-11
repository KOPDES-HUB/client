export interface ArusKasTahunan {
  tahun: number;
  arus_kas: number;
}

export interface TransaksiPenjualanRow {
  transaksi_sample_id: string;
  koperasi_ref: string;
  nama_pelanggan: string | null;
  tanggal_dibuat: string | null;
  total_pembayaran: string | number | null;
  status_transaksi: string | null;
  metode_pembayaran: string | null;
  dibuat_pada: string | null;
  diperbarui_pada: string | null;
  nama_koperasi: string | null;
}

export interface KoperasiTransaksiOption {
  koperasi_ref: string;
  nama_koperasi: string | null;
  label: string;
}

export interface NpvDetailTahun {
  tahun: number;
  arus_kas: number;
  period: number;
  discounted: number;
}

export interface NpvResult {
  nilai: number;
  modal_awal: number;
  discount_rate: number;
  rumus: string;
  detail_per_tahun: NpvDetailTahun[];
  total_arus_kas: number;
}

export interface ArusKasNpvResponse {
  koperasi_ref: string;
  nama_koperasi: string | null;
  modal_awal_raw: string | null;
  modal_awal: number;
  discount_rate: number;
  arus_kas_per_tahun: ArusKasTahunan[];
  npv: NpvResult;
  interpretasi: string;
}

export interface NpvTahunanRow extends NpvDetailTahun {
  npv_kumulatif: number;
}

export interface TrenPenjualanItem {
  periode: number;
  label: string;
  total_penjualan: number;
  jumlah_transaksi: number;
}

export interface TrenPenjualanResponse {
  koperasi_ref: string;
  nama_koperasi: string | null;
  tahun: number;
  bulan: number | null;
  granularity: "bulanan" | "harian";
  tren: TrenPenjualanItem[];
  total_penjualan: number;
  total_transaksi: number;
}
