/** Matches profil_koperasi + metadata schema from kopdes database */
export interface KoperasiData {
  koperasi_ref: string;
  nama_koperasi: string;
  status_registrasi: string;
  bentuk_koperasi: string;
  kategori_usaha: string;
  nik_koperasi: string;
  alamat_lengkap: string;
  kode_pos: string;
  koordinat_dibulatkan: string;
  koordinat: [number, number];
  modal_awal: string;
  sumber_persetujuan: string;
  tentang_koperasi: string;
  distance?: number;
}
