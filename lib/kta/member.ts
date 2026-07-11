import type { KtaQrPayload } from "@/lib/participation/types";

/** Data KTA anggota demo — nanti diganti dari API / auth store */
export const DEMO_KTA_MEMBER = {
  anggotaRef: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  nomorKta: "4802 8812 0092 1104",
  anggotaId: "SMP-2024-001",
  nama: "Budi Setiawan",
  nik: "3271012345670001",
  koperasi: "Koperasi Desa Merah Putih Sukamaju",
  berlakuHingga: "31 Des 2026",
  status: "AKTIF" as const,
  tanggalBergabung: "15 Januari 2024",
  jenisKeanggotaan: "Anggota Biasa",
  totalSimpanan: "Rp 3.250.000",
};

export function buildKtaQrPayload(
  member: typeof DEMO_KTA_MEMBER = DEMO_KTA_MEMBER,
): KtaQrPayload {
  return {
    type: "SIMPUL_KTA",
    v: 1,
    anggotaRef: member.anggotaRef,
    nomorKta: member.nomorKta,
    nik: member.nik,
    nama: member.nama,
    koperasi: member.koperasi,
  };
}

export function encodeKtaQr(member: typeof DEMO_KTA_MEMBER = DEMO_KTA_MEMBER): string {
  return JSON.stringify(buildKtaQrPayload(member));
}

export function parseKtaQr(raw: string): KtaQrPayload | null {
  try {
    const data = JSON.parse(raw) as KtaQrPayload;
    if (data.type !== "SIMPUL_KTA" || !data.nomorKta || !data.anggotaRef) return null;
    return data;
  } catch {
    return null;
  }
}
