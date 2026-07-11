export type SessionType = "rat" | "voting";

export type ParticipationSession = {
  id: string;
  type: SessionType;
  title: string;
  subtitle?: string;
  location?: string;
  date?: string;
  /** Voting yang memerlukan absensi RAT terlebih dahulu */
  requiresRatAttendance?: boolean;
  /** ID sesi RAT yang wajib hadir sebelum voting ini */
  requiredRatSessionId?: string;
};

export type AttendanceRecord = {
  sessionId: string;
  sessionType: SessionType;
  sessionTitle: string;
  nomorKta: string;
  anggotaRef: string;
  nama: string;
  scannedAt: string;
  method: "kta_qr";
};

export type KtaQrPayload = {
  type: "SIMPUL_KTA";
  v: 1;
  anggotaRef: string;
  nomorKta: string;
  nik: string;
  nama: string;
  koperasi: string;
};

export type SessionQrPayload = {
  type: "SIMPUL_SESSION";
  v: 1;
  sessionId: string;
  sessionType: SessionType;
  title: string;
};
