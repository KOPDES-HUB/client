import type { ApiResponse } from "@/types/api";

export interface ProfilKoperasiRaw {
  koperasi_ref: string;
  nama_koperasi: string | null;
  status_registrasi: string | null;
  bentuk_koperasi: string | null;
  kategori_usaha: string | null;
  nik_koperasi: string | null;
  alamat_lengkap: string | null;
  kode_pos: string | null;
  koordinat_dibulatkan: string | null;
  modal_awal: string | null;
  sumber_persetujuan: string | null;
  tentang_koperasi: string | null;
  pola_pengelolaan?: string | null;
  metode_pengisian?: string | null;
  dibuat_pada?: string | null;
  diperbarui_pada?: string | null;
  distance?: number;
}

export interface CheckLocationPayload {
  lat: number;
  long: number;
}

export type CheckLocationResponse = ApiResponse<ProfilKoperasiRaw[]>;
