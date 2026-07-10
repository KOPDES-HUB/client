import type { ProfilKoperasiRaw } from "@/types/cari-koperasi";
import type { KoperasiData } from "@/types/koperasi";

function parseKoordinat(koordinatDibulatkan: string | null): [number, number] {
  if (!koordinatDibulatkan) return [0, 0];

  // Format DB: "latitude,longitude" (contoh: -6.154, 106.829)
  const [lat, lng] = koordinatDibulatkan
    .split(",")
    .map((v) => Number(v.trim()));

  return [lat, lng]; // Leaflet: [lat, lng]
}

export function mapProfilKoperasiToKoperasiData(
  item: ProfilKoperasiRaw,
): KoperasiData {
  return {
    koperasi_ref: item.koperasi_ref,
    nama_koperasi: item.nama_koperasi ?? "-",
    status_registrasi: item.status_registrasi ?? "-",
    bentuk_koperasi: item.bentuk_koperasi ?? "-",
    kategori_usaha: item.kategori_usaha ?? "-",
    nik_koperasi: item.nik_koperasi ?? "-",
    alamat_lengkap: item.alamat_lengkap ?? "-",
    kode_pos: item.kode_pos ?? "-",
    koordinat_dibulatkan: item.koordinat_dibulatkan ?? "-",
    koordinat: parseKoordinat(item.koordinat_dibulatkan),
    modal_awal: item.modal_awal ?? "-",
    sumber_persetujuan: item.sumber_persetujuan ?? "-",
    tentang_koperasi: item.tentang_koperasi ?? "-",
    distance: item.distance,
  };
}
