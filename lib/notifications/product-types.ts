export type ProductNotificationType =
  | "harga_turun"
  | "diskon_promo"
  | "barang_masuk_produk"
  | "stok_rendah";

export interface ProductNotification {
  id: string;
  type: ProductNotificationType;
  title: string;
  message: string;
  produk: string;
  inventaris_ref: string;
  hargaBaru?: number;
  hargaLama?: number;
  diskonPersen?: number;
  stokBaru?: number;
  createdAt: string;
  waSent: boolean;
}
