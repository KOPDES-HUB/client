import type { ProductNotification } from "./product-types";

export const DUMMY_PRODUCT_NOTIFICATIONS: ProductNotification[] = [
  {
    id: "pn-1",
    type: "harga_turun",
    title: "Harga Turun!",
    message: "Beras Premium 5kg turun dari Rp 78.000 menjadi Rp 72.000",
    produk: "Beras Premium 5kg",
    inventaris_ref: "INV-2024-001",
    hargaBaru: 72000,
    hargaLama: 78000,
    createdAt: "2024-07-09T14:30:00Z",
    waSent: true,
  },
  {
    id: "pn-2",
    type: "diskon_promo",
    title: "Promo Akhir Pekan",
    message: "Diskon 15% Pupuk Organik 5kg — khusus anggota e-KTA",
    produk: "Pupuk Organik 5kg",
    inventaris_ref: "INV-2024-003",
    diskonPersen: 15,
    hargaBaru: 38250,
    hargaLama: 45000,
    createdAt: "2024-07-08T11:00:00Z",
    waSent: true,
  },
  {
    id: "pn-3",
    type: "barang_masuk_produk",
    title: "Stok Baru Tersedia",
    message: "Bibit Padi IR64 5kg baru masuk +20 pack. Stok sekarang 40 pack.",
    produk: "Bibit Padi IR64 5kg",
    inventaris_ref: "INV-2024-005",
    stokBaru: 40,
    createdAt: "2024-07-10T10:00:00Z",
    waSent: true,
  },
  {
    id: "pn-4",
    type: "stok_rendah",
    title: "Stok Terbatas",
    message: "Gula Pasir 1kg tersisa 8 pack — segera beli di gerai KDMP!",
    produk: "Gula Pasir 1kg",
    inventaris_ref: "INV-2024-004",
    stokBaru: 8,
    createdAt: "2024-07-10T07:45:00Z",
    waSent: false,
  },
  {
    id: "pn-5",
    type: "barang_masuk_produk",
    title: "Restock Sembako",
    message: "Beras Premium 5kg restock +50 pack dari supplier lokal.",
    produk: "Beras Premium 5kg",
    inventaris_ref: "INV-2024-001",
    stokBaru: 142,
    createdAt: "2024-07-09T14:30:00Z",
    waSent: true,
  },
];

export const NOTIFICATION_TYPE_META: Record<
  ProductNotification["type"],
  { icon: string; color: string; label: string }
> = {
  harga_turun: {
    icon: "trending_down",
    color: "bg-primary-fixed text-on-primary-fixed-variant",
    label: "Harga Turun",
  },
  diskon_promo: {
    icon: "local_offer",
    color: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    label: "Diskon/Promo",
  },
  barang_masuk_produk: {
    icon: "inventory_2",
    color: "bg-secondary-container text-on-surface",
    label: "Barang Masuk",
  },
  stok_rendah: {
    icon: "warning",
    color: "bg-error-container text-on-error-container",
    label: "Stok Rendah",
  },
};
