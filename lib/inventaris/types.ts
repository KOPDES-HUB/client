export type TipeMutasiStok = "barang_masuk_produk" | "barang_keluar_produk";

export interface InventarisProduk {
  inventaris_ref: string;
  produk_sample_id: string;
  koperasi_ref: string;
  nama_produk: string;
  stok: number;
  dibuat_pada: string;
  diperbarui_pada: string;
  kode_barcode: string;
  harga_jual: number;
  harga_sebelumnya?: number;
  kategori: string;
  satuan: string;
}

export interface MutasiInventaris {
  id: string;
  inventaris_ref: string;
  nama_produk: string;
  tipe: TipeMutasiStok;
  jumlah: number;
  stok_sebelum: number;
  stok_sesudah: number;
  keterangan: string;
  dibuat_pada: string;
}
