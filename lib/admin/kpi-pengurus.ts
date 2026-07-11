export interface KpiPengurus {
  id: string;
  nama: string;
  jabatan: string;
  /** Kehadiran e-RAT (%) */
  absensiRat: number;
  /** Kehadiran e-Voting (%) */
  absensiVoting: number;
  /** Intensitas pembelian di gerai KDMP (transaksi/bulan) */
  intensitasPembelian: number;
  /** Task kader mendampingi warga desa (selesai / target) */
  taskKaderSelesai: number;
  taskKaderTarget: number;
  /** Total poin (login harian, simpanan sukarela, transaksi, dll) */
  totalPoin: number;
  /** Ketepatan bayar simpanan wajib per bulan (%) */
  ketepatanSimpananWajib: number;
  /** Anggota baru via kode referral */
  referralAnggota: number;
}

export const KPI_METRICS = [
  {
    key: "absensiRat" as const,
    label: "Absensi E-RAT",
    shortLabel: "E-RAT",
    unit: "%",
    icon: "groups",
    color: "#488451",
    description: "Kehadiran Rapat Anggota Tahunan via scan KTA",
  },
  {
    key: "absensiVoting" as const,
    label: "Absensi E-Voting",
    shortLabel: "E-Voting",
    unit: "%",
    icon: "how_to_vote",
    color: "#6b9e72",
    description: "Partisipasi voting setelah absensi KTA",
  },
  {
    key: "intensitasPembelian" as const,
    label: "Intensitas Pembelian",
    shortLabel: "Pembelian",
    unit: "trx/bln",
    icon: "shopping_cart",
    color: "#2c6848",
    description: "Frekuensi belanja di unit usaha koperasi",
  },
  {
    key: "taskKader" as const,
    label: "Task Kader Desa",
    shortLabel: "Task Kader",
    unit: "task",
    icon: "supervisor_account",
    color: "#7a9e6a",
    description: "Pendampingan warga desa yang diselesaikan",
  },
  {
    key: "totalPoin" as const,
    label: "Total Poin",
    shortLabel: "Poin",
    unit: "poin",
    icon: "stars",
    color: "#d97706",
    description: "Login harian, simpanan sukarela, transaksi, referral",
  },
  {
    key: "ketepatanSimpananWajib" as const,
    label: "Ketepatan Simpanan Wajib",
    shortLabel: "Simp. Wajib",
    unit: "%",
    icon: "event_available",
    color: "#488451",
    description: "Bayar tepat waktu setiap bulan",
  },
  {
    key: "referralAnggota" as const,
    label: "Referral Anggota Baru",
    shortLabel: "Referral",
    unit: "org",
    icon: "group_add",
    color: "#059669",
    description: "Pendaftar anggota via kode referral pengurus",
  },
] as const;

export type KpiMetricKey = (typeof KPI_METRICS)[number]["key"];

export const DUMMY_KPI_PENGURUS: KpiPengurus[] = [
  {
    id: "p1",
    nama: "Siti Nurhaliza",
    jabatan: "Ketua",
    absensiRat: 100,
    absensiVoting: 95,
    intensitasPembelian: 18,
    taskKaderSelesai: 24,
    taskKaderTarget: 25,
    totalPoin: 842,
    ketepatanSimpananWajib: 100,
    referralAnggota: 12,
  },
  {
    id: "p2",
    nama: "Ahmad Fauzi",
    jabatan: "Bendahara",
    absensiRat: 92,
    absensiVoting: 88,
    intensitasPembelian: 14,
    taskKaderSelesai: 18,
    taskKaderTarget: 22,
    totalPoin: 620,
    ketepatanSimpananWajib: 92,
    referralAnggota: 8,
  },
  {
    id: "p3",
    nama: "Budi Santoso",
    jabatan: "Sekretaris",
    absensiRat: 96,
    absensiVoting: 91,
    intensitasPembelian: 11,
    taskKaderSelesai: 20,
    taskKaderTarget: 20,
    totalPoin: 710,
    ketepatanSimpananWajib: 96,
    referralAnggota: 15,
  },
  {
    id: "p4",
    nama: "Dewi Ratna",
    jabatan: "Pengawas",
    absensiRat: 85,
    absensiVoting: 78,
    intensitasPembelian: 8,
    taskKaderSelesai: 14,
    taskKaderTarget: 20,
    totalPoin: 455,
    ketepatanSimpananWajib: 83,
    referralAnggota: 5,
  },
];

export function getKpiValue(pengurus: KpiPengurus, key: KpiMetricKey): number {
  switch (key) {
    case "taskKader":
      return pengurus.taskKaderSelesai;
    default:
      return pengurus[key];
  }
}

export function getKpiMax(key: KpiMetricKey): number {
  switch (key) {
    case "absensiRat":
    case "absensiVoting":
    case "ketepatanSimpananWajib":
      return 100;
    case "taskKader":
      return Math.max(...DUMMY_KPI_PENGURUS.map((p) => p.taskKaderTarget));
    case "intensitasPembelian":
      return 25;
    case "totalPoin":
      return 1000;
    case "referralAnggota":
      return 20;
    default:
      return 100;
  }
}

export function formatKpiValue(key: KpiMetricKey, value: number): string {
  const metric = KPI_METRICS.find((m) => m.key === key)!;
  if (metric.unit === "%") return `${value}%`;
  if (metric.unit === "poin") return `${value} poin`;
  if (metric.unit === "org") return `${value} anggota`;
  if (metric.unit === "trx/bln") return `${value} trx/bln`;
  if (key === "taskKader") return `${value} task`;
  return String(value);
}

export function kpiScorePercent(key: KpiMetricKey, value: number, pengurus?: KpiPengurus): number {
  if (key === "taskKader" && pengurus) {
    return Math.round((pengurus.taskKaderSelesai / pengurus.taskKaderTarget) * 100);
  }
  return Math.round((value / getKpiMax(key)) * 100);
}
