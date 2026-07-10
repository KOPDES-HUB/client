import type { ParticipationSession } from "./types";

export const RAT_SESSION_2024: ParticipationSession = {
  id: "rat-2024",
  type: "rat",
  title: "Rapat Anggota Tahunan (RAT) Tahun Buku 2023",
  subtitle: "25 Oktober 2024 · 08:30 – 14:00 WIB",
  location: "Balai Desa Merah Putih",
  date: "2024-10-25",
};

export const VOTING_SESSIONS: ParticipationSession[] = [
  {
    id: "voting-1",
    type: "voting",
    title: "Persetujuan Pengadaan Stok Beras Grosir BUMDes",
    requiresRatAttendance: true,
    requiredRatSessionId: RAT_SESSION_2024.id,
  },
  {
    id: "voting-2",
    type: "voting",
    title: "Penetapan Suku Bunga Pinjaman Anggota Tahun 2025",
    requiresRatAttendance: true,
    requiredRatSessionId: RAT_SESSION_2024.id,
  },
  {
    id: "voting-3",
    type: "voting",
    title: "Pengesahan Laporan Keuangan Tahun Buku 2023",
    requiresRatAttendance: true,
    requiredRatSessionId: RAT_SESSION_2024.id,
  },
];

export function getSessionById(sessionId: string): ParticipationSession | undefined {
  if (sessionId === RAT_SESSION_2024.id) return RAT_SESSION_2024;
  return VOTING_SESSIONS.find((s) => s.id === sessionId);
}
