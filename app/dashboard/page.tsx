import TopBar from "@/components/layout/TopBar";
import Link from "next/link";
import DashboardEngagement from "@/components/dashboard/DashboardEngagement";
import { AppIcon } from "@/components/ui/app-icon";

const quickActions = [
  {
    icon: "dashboard",
    label: "Overview",
    desc: "Pantau statistik harian.",
    href: "/dashboard",
    color: "bg-primary-fixed",
  },
  {
    icon: "assignment_ind",
    label: "Status KTA",
    desc: "Cek status pengajuan kartu.",
    href: "/register/status",
    color: "bg-tertiary-fixed",
  },
  {
    icon: "account_balance_wallet",
    label: "Simpanan",
    desc: "Mutasi simpanan anggota.",
    href: "/dashboard/simpanan",
    color: "bg-secondary-container",
  },
  {
    icon: "school",
    label: "LMS",
    desc: "Akademi koperasi digital.",
    href: "/dashboard/lms",
    color: "bg-mint-200",
  },
  {
    icon: "how_to_vote",
    label: "E-Voting",
    desc: "Partisipasi pengambilan keputusan.",
    href: "/dashboard/voting",
    color: "bg-tertiary-fixed",
  },
  {
    icon: "groups",
    label: "E-RAT",
    desc: "Rapat Anggota Tahunan.",
    href: "/dashboard/rat",
    color: "bg-secondary-fixed",
  },
  {
    icon: "badge",
    label: "KTA Digital",
    desc: "Kartu Tanda Anggota digital.",
    href: "/dashboard/kta",
    color: "bg-primary-fixed",
  },
  {
    icon: "storefront",
    label: "Unit Usaha",
    desc: "Belanja & kumpulkan poin.",
    href: "/dashboard/unit-usaha",
    color: "bg-mint-200",
  },
  {
    icon: "local_fire_department",
    label: "Login Harian",
    desc: "Streak & tukar voucher KDMP.",
    href: "/dashboard/daily-login",
    color: "bg-amber-100",
  },
  {
    icon: "local_offer",
    label: "Promo Gerai",
    desc: "Harga turun & stok baru.",
    href: "/dashboard/promo",
    color: "bg-tertiary-fixed",
  },
  {
    icon: "receipt_long",
    label: "Transaksi",
    desc: "Riwayat transaksi & poin.",
    href: "/dashboard/transaksi",
    color: "bg-primary-fixed",
  },
  {
    icon: "group_add",
    label: "Referral",
    desc: "Ajak tetangga, dapat reward.",
    href: "/dashboard/referral",
    color: "bg-secondary-fixed",
  },
];

export default function DashboardPage() {
  return (
    <>
      <TopBar title="Dashboard" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Welcome Banner + KTA Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-container p-8 text-white shadow-xl flex flex-col justify-between min-h-[240px]">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
              <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-headline-lg font-headline-lg mb-2">
                Selamat Datang, Budi.
              </h3>
              <p className="text-body-lg text-primary-fixed max-w-md">
                Pantau performa koperasi dan kelola keanggotaan dengan instrumen
                tata kelola keuangan yang presisi.
              </p>
            </div>
            <div className="relative z-10 flex gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex-1">
                <p className="text-label-xs font-label-xs opacity-80 uppercase tracking-wider">
                  Total Simpanan
                </p>
                <p className="text-headline-md font-headline-md">Rp 12,4M</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex-1">
                <p className="text-label-xs font-label-xs opacity-80 uppercase tracking-wider">
                  Anggota Aktif
                </p>
                <p className="text-headline-md font-headline-md">1.248</p>
              </div>
            </div>
          </div>

          {/* KTA Mini Card */}
          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6 flex flex-col justify-between overflow-hidden relative group">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 bg-mint-50 text-primary text-label-xs font-label-sm rounded-full">
                  KTA DIGITAL
                </span>
                <h4 className="text-headline-md font-headline-md mt-4">
                  SMP-2024-001
                </h4>
              </div>
              <AppIcon name="qr_code_2" className="text-primary text-4xl" />
            </div>
            <div className="mt-8">
              <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary w-3/4 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-label-xs font-label-xs text-on-surface-variant">
                  Kelengkapan Data
                </span>
                <span className="text-label-sm font-label-sm text-primary">
                  75%
                </span>
              </div>
            </div>
            <Link
              href="/dashboard/kta"
              className="mt-6 w-full py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm text-center hover:bg-primary-container transition-all hover:-translate-y-0.5 transform block shadow-md"
            >
              Lihat KTA Digital
            </Link>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div>
          <h3 className="text-headline-md font-headline-md text-on-surface mb-4">
            Menu Utama
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="bg-surface-card p-5 rounded-2xl border border-mint-200 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform`}
                >
                  <AppIcon name={item.icon} className="text-[20px]" />
                </div>
                <h5 className="text-label-sm font-label-sm text-on-surface">
                  {item.label}
                </h5>
                <p className="text-label-xs font-label-xs text-on-surface-variant mt-0.5">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Daily Login + Promo Notifications */}
        <DashboardEngagement />

        {/* Poin Transaksi Widget — Modul 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[
            {
              label: "Poin Transaksi Bulan Ini",
              value: "157 poin",
              sub: "dari 7 transaksi di unit usaha",
              icon: "stars",
              href: "/dashboard/transaksi",
              cta: "Lihat Riwayat",
              accent: true,
            },
            {
              label: "Kontribusi ke SHU",
              value: "Rp 188.400",
              sub: "estimasi dari poin saat ini",
              icon: "trending_up",
              href: "/dashboard/simpanan",
              cta: "Detail Simpanan",
              accent: false,
            },
            {
              label: "Kode Referral Anda",
              value: "BSW2024",
              sub: "3 anggota aktif dari referral",
              icon: "group_add",
              href: "/dashboard/referral",
              cta: "Ajak Tetangga",
              accent: false,
            },
          ].map((w) => (
            <div
              key={w.label}
              className={`rounded-2xl border shadow-md p-5 flex items-start gap-4 ${
                w.accent
                  ? "bg-primary text-white border-primary"
                  : "bg-surface-card border-mint-200"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${w.accent ? "bg-white/20" : "bg-primary/10"}`}>
                <AppIcon name={w.icon} className={`${w.accent ? "text-white" : "text-primary"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs uppercase tracking-wider ${w.accent ? "text-white/70" : "text-on-surface-variant"}`}>{w.label}</p>
                <p className={`text-xl font-bold mt-0.5 ${w.accent ? "text-white font-mono" : "text-on-surface"}`}>{w.value}</p>
                <p className={`text-xs mt-0.5 ${w.accent ? "text-white/60" : "text-on-surface-variant"}`}>{w.sub}</p>
                <Link
                  href={w.href}
                  className={`inline-flex items-center gap-1 text-xs font-semibold mt-2 ${
                    w.accent ? "text-white hover:opacity-80" : "text-primary hover:underline"
                  }`}
                >
                  {w.cta}
                  <AppIcon name="arrow_forward" className="text-[14px]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Simpanan Stats */}
          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-8">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-headline-md font-headline-md text-zinc-800">
                Rekapitulasi Simpanan
              </h4>
              <Link
                href="/dashboard/simpanan"
                className="text-primary text-label-sm font-label-sm hover:underline"
              >
                Lihat Semua
              </Link>
            </div>
            <div className="space-y-6">
              {[
                {
                  label: "Simpanan Pokok",
                  amount: "Rp 2.450.000.000",
                  trend: "+12% bln ini",
                  color: "bg-primary",
                },
                {
                  label: "Simpanan Wajib",
                  amount: "Rp 8.120.000.000",
                  trend: "+5% bln ini",
                  color: "bg-tertiary",
                },
                {
                  label: "Simpanan Sukarela",
                  amount: "Rp 1.830.000.000",
                  trend: "Stabil",
                  color: "bg-mint-200",
                },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-4">
                  <div
                    className={`w-2 h-12 ${s.color} rounded-full flex-shrink-0`}
                  ></div>
                  <div className="flex-grow">
                    <p className="text-label-xs font-label-xs text-on-surface-variant uppercase">
                      {s.label}
                    </p>
                    <p className="text-body-lg font-bold text-on-surface">
                      {s.amount}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-primary text-label-sm font-label-sm">
                      {s.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KTA Status Notifications */}
          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-8">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-headline-md font-headline-md text-zinc-800">
                Status Aktivasi KTA
              </h4>
              <AppIcon name="filter_list" className="text-on-surface-variant cursor-pointer" />
            </div>
            <div className="space-y-3">
              {[
                {
                  name: "Budi Santoso",
                  id: "SMP-2024-882",
                  status: "DIVERIFIKASI",
                  statusColor: "bg-primary-fixed text-on-primary-fixed-variant",
                },
                {
                  name: "Siti Aminah",
                  id: "SMP-2024-883",
                  status: "MENUNGGU",
                  statusColor:
                    "bg-tertiary-fixed text-on-tertiary-fixed-variant",
                },
                {
                  name: "Ahmad Fauzi",
                  id: "SMP-2024-884",
                  status: "DITOLAK",
                  statusColor: "bg-error-container text-on-error-container",
                },
              ].map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-low transition-colors border border-transparent hover:border-outline-variant/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                      <AppIcon name="person_outline" className="text-on-surface-variant" />
                    </div>
                    <div>
                      <p className="text-label-sm font-label-sm text-on-surface">
                        {member.name}
                      </p>
                      <p className="text-label-xs font-label-xs text-on-surface-variant">
                        {member.id}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 ${member.statusColor} text-[10px] font-bold rounded-full`}
                  >
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group z-50">
        <AppIcon name="add" className="text-2xl" />
        <span className="absolute right-full mr-3 bg-inverse-surface text-white text-label-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
          Tambah Anggota Baru
        </span>
      </button>
    </>
  );
}
