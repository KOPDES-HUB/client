import TopBar from "@/components/layout/TopBar";
import PengurusKpiSection from "@/components/admin/PengurusKpiSection";
import TrenPenjualanChart from "@/components/charts/TrenPenjualanChart";
import Link from "next/link";

const statCards = [
  { label: "Omzet Harian",        value: "Rp 48,2Jt", change: "+8.3%",  icon: "trending_up",         color: "text-primary", bg: "bg-primary-fixed" },
  { label: "Total Profit",         value: "Rp 12,7Jt", change: "+5.1%",  icon: "account_balance",     color: "text-tertiary", bg: "bg-tertiary-fixed" },
  { label: "Anggota Aktif",        value: "1.248",      change: "+12 baru", icon: "groups",            color: "text-secondary", bg: "bg-secondary-container" },
  { label: "Kuorum RAT Terakhir",  value: "68/120",     change: "56.7%",  icon: "how_to_vote",         color: "text-primary", bg: "bg-mint-200" },
];

export default function AdminDashboardPage() {
  return (
    <>
      <TopBar title="Admin Dashboard" showSearch />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Welcome */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface">Selamat Datang, Admin.</h1>
            <p className="text-body-md text-on-surface-variant mt-1">
              Pantau performa koperasi secara real-time dan ambil keputusan berbasis data.
            </p>
          </div>
          <div className="flex items-center gap-2 text-label-xs font-label-xs text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Data diperbarui otomatis
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <div key={card.label} className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${card.color}`}>{card.icon}</span>
                </div>
                <span className="text-label-xs font-label-xs px-2 py-0.5 bg-primary-fixed/30 text-on-primary-fixed-variant rounded-full">
                  {card.change}
                </span>
              </div>
              <p className="text-label-xs font-label-xs text-on-surface-variant mb-1">{card.label}</p>
              <p className="text-headline-md font-headline-md text-on-surface">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <TrenPenjualanChart variant="admin" />
          </div>

          {/* Ringkasan partisipasi */}
          <div className="lg:col-span-2 bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-4">
              Partisipasi Anggota
            </h3>
            <div className="space-y-4">
              {[
                { label: "Absensi E-RAT", value: 72, icon: "groups" },
                { label: "Absensi E-Voting", value: 58, icon: "how_to_vote" },
                { label: "Login Harian (bulan ini)", value: 64, icon: "local_fire_department" },
                { label: "Simpanan Wajib Tepat Waktu", value: 89, icon: "event_available" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-[16px]">
                        {item.icon}
                      </span>
                      {item.label}
                    </span>
                    <span className="font-bold text-on-surface">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-mint-200/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Evaluasi KPI Pengurus — bar charts */}
        <PengurusKpiSection />

        {/* AI Co-Pilot Card */}
        <div className="bg-gradient-to-r from-primary/5 to-mint-200/20 border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5">
            <span className="material-symbols-outlined text-[200px] text-primary">auto_awesome</span>
          </div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-headline-md font-headline-md text-on-surface">AI Cooperative Co-Pilot</h3>
                <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-label-xs font-label-xs">Beta</span>
              </div>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                📊 <strong className="text-on-surface">Insight hari ini:</strong> Simpanan Sukarela mengalami penurunan 12% dibanding bulan lalu.
                Pertimbangkan program insentif bunga kompetitif atau sosialisasi manfaat simpanan ke anggota baru.
                Tingkat partisipasi E-Voting juga turun — kirim reminder sebelum deadline.
              </p>
              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-label-sm font-label-sm hover:bg-primary-container transition-all">
                  Buat Rekomendasi Program
                </button>
                <button className="px-4 py-2 border border-mint-200 text-on-surface-variant rounded-lg text-label-sm font-label-sm hover:border-primary hover:text-primary transition-all">
                  Lihat Analitik Lengkap
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Admin Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Verifikasi KTA",   href: "/admin/anggota",  icon: "assignment_ind",          count: "8 pending" },
            { label: "Kelola LMS",       href: "/admin/lms",      icon: "school",                  count: "3 kursus" },
            { label: "Input Simpanan",   href: "/admin/simpanan", icon: "account_balance_wallet",  count: "—" },
            { label: "Buat Voting",      href: "/admin/voting",   icon: "how_to_vote",             count: "2 aktif" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="bg-surface-card p-5 rounded-2xl border border-mint-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-[20px]">{item.icon}</span>
              </div>
              <p className="text-label-sm font-label-sm text-on-surface">{item.label}</p>
              <p className="text-label-xs font-label-xs text-on-surface-variant mt-0.5">{item.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
