import type { ProfilKoperasiRaw } from "@/types/cari-koperasi";

/**
 * 5 titik koperasi contoh yang tersebar di Indonesia — dipakai untuk
 * mensimulasikan endpoint POST /api/profil-koperasi/check-location
 * selagi backend belum selesai deploy.
 */
export const MOCK_KOPERASI_LIST: ProfilKoperasiRaw[] = [
  {
    koperasi_ref: "KOP-2024-001",
    nama_koperasi: "Koperasi Desa Merauke Sejahtera",
    status_registrasi: "Aktif",
    bentuk_koperasi: "Koperasi Serba Usaha",
    kategori_usaha: "Pertanian & Perdagangan",
    nik_koperasi: "9401.12.2024.001",
    alamat_lengkap: "Jl. Mandala No. 12, Merauke, Papua Selatan",
    kode_pos: "99611",
    koordinat_dibulatkan: "-8.053, 140.755",
    modal_awal: "Rp 250.000.000",
    sumber_persetujuan: "Dinas Koperasi Kab. Merauke",
    tentang_koperasi:
      "Koperasi yang bergerak di bidang pengadaan pangan, pertanian lokal, dan distribusi kebutuhan pokok masyarakat Merauke.",
  },
  {
    koperasi_ref: "KOP-2024-002",
    nama_koperasi: "Koperasi Borneo Mandiri Sejahtera",
    status_registrasi: "Aktif",
    bentuk_koperasi: "Koperasi Unit Desa",
    kategori_usaha: "Pertambangan & Jasa",
    nik_koperasi: "6401.07.2024.002",
    alamat_lengkap: "Jl. Soekarno-Hatta Km 5, Samarinda, Kalimantan Timur",
    kode_pos: "75124",
    koordinat_dibulatkan: "-0.479, 117.142",
    modal_awal: "Rp 480.000.000",
    sumber_persetujuan: "Dinas Koperasi Prov. Kaltim",
    tentang_koperasi:
      "KUD terbesar di Kalimantan Timur yang mengelola simpanan, pinjaman, dan distribusi kebutuhan rumah tangga anggota.",
  },
  {
    koperasi_ref: "KOP-2024-003",
    nama_koperasi: "Koperasi Desa Bunga Rafflesia",
    status_registrasi: "Aktif",
    bentuk_koperasi: "Koperasi Serba Usaha",
    kategori_usaha: "Agribisnis & Perkebunan",
    nik_koperasi: "1702.03.2024.003",
    alamat_lengkap: "Jl. Pariwisata No. 7, Lebong, Bengkulu",
    kode_pos: "39162",
    koordinat_dibulatkan: "-3.757, 102.267",
    modal_awal: "Rp 175.000.000",
    sumber_persetujuan: "Dinas Koperasi Prov. Bengkulu",
    tentang_koperasi:
      "Koperasi berbasis perkebunan sawit dan karet yang melayani petani desa di dataran tinggi Bengkulu.",
  },
  {
    koperasi_ref: "KOP-2024-004",
    nama_koperasi: "Koperasi Desa Sulawesi Bahari",
    status_registrasi: "Aktif",
    bentuk_koperasi: "Koperasi Perikanan",
    kategori_usaha: "Perikanan & Kelautan",
    nik_koperasi: "7501.04.2024.004",
    alamat_lengkap: "Jl. Pantai Indah No. 3, Gorontalo",
    kode_pos: "96115",
    koordinat_dibulatkan: "0.926, 123.108",
    modal_awal: "Rp 320.000.000",
    sumber_persetujuan: "Dinas Koperasi Prov. Gorontalo",
    tentang_koperasi:
      "Koperasi nelayan yang mengelola hasil tangkapan, cold storage kolektif, dan distribusi ikan ke pasar regional.",
  },
  {
    koperasi_ref: "KOP-2024-005",
    nama_koperasi: "Koperasi Desa Minang Makmur",
    status_registrasi: "Aktif",
    bentuk_koperasi: "Koperasi Konsumen",
    kategori_usaha: "Perdagangan & UMKM",
    nik_koperasi: "1301.09.2024.005",
    alamat_lengkap:
      "Jl. Raya Padang-Bukittinggi Km 12, Padang Pariaman, Sumatera Barat",
    kode_pos: "25581",
    koordinat_dibulatkan: "-1.993, 101.375",
    modal_awal: "Rp 210.000.000",
    sumber_persetujuan: "Dinas Koperasi Prov. Sumatera Barat",
    tentang_koperasi:
      "Koperasi konsumen yang mendukung UMKM lokal dengan penyediaan bahan pokok, modal kerja, dan pemasaran produk ranah Minang.",
  },
];

/** Haversine — jarak (km) antara dua koordinat [lat, long]. */
export function haversineKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a[0] * Math.PI) / 180) *
      Math.cos((b[0] * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(h));
}

function parseKoordinat(value: string | null): [number, number] {
  if (!value) return [0, 0];
  const [lat, lng] = value.split(",").map((v) => Number(v.trim()));
  return [lat, lng];
}

export function withDistanceFrom(
  lat: number,
  long: number,
): ProfilKoperasiRaw[] {
  return MOCK_KOPERASI_LIST.map((item) => ({
    ...item,
    distance: haversineKm([lat, long], parseKoordinat(item.koordinat_dibulatkan)),
  })).sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
}
