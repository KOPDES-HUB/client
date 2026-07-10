import TopBar from "@/components/layout/TopBar";
import Link from "next/link";

const statCards = [
  { label: "Omzet Harian",        value: "Rp 48,2Jt", change: "+8.3%",  icon: "trending_up",         color: "text-primary", bg: "bg-primary-fixed" },
  { label: "Total Profit",         value: "Rp 12,7Jt", change: "+5.1%",  icon: "account_balance",     color: "text-tertiary", bg: "bg-tertiary-fixed" },
  { label: "Anggota Aktif",        value: "1.248",      change: "+12 baru", icon: "groups",            color: "text-secondary", bg: "bg-secondary-container" },
  { label: "Kuorum RAT Terakhir",  value: "68/120",     change: "56.7%",  icon: "how_to_vote",         color: "text-primary", bg: "bg-mint-200" },
];

const kpiData = [
  { name: "Siti Nurhaliza",  absensi: "98%", taskCompletion: "94%" },
  { name: "Ahmad Fauzi",    absensi: "91%", taskCompletion: "87%" },
  { name: "Budi Santoso",   absensi: "95%", taskCompletion: "90%" },
  { name: "Dewi Ratna",     absensi: "88%", taskCompletion: "82%" },
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
          {/* Line chart simulation */}
          <div className="lg:col-span-3 bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-headline-md font-headline-md text-on-surface">Tren Penjualan Bulanan</h3>
                <p className="text-body-md text-on-surface-variant text-[13px] mt-0.5">Jan – Jul 2024</p>
              </div>
              <div className="flex gap-2">
                {["Omzet", "Profit"].map((t, i) => (
                  <div key={t} className="flex items-center gap-1.5 text-label-xs font-label-xs text-on-surface-variant">
                    <div className={`w-3 h-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-mint-200"}`}></div>
                    {t}
                  </div>
                ))}
              </div>
            </div>
            {/* Chart bars */}
            <div className="flex items-end justify-between h-40 gap-2">
              {["Jan","Feb","Mar","Apr","Mei","Jun","Jul"].map((month, i) => {
                const heights = [55, 65, 72, 68, 80, 75, 90];
                const profitH = [30, 38, 40, 35, 48, 44, 55];
                return (
                  <div key={month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex items-end gap-1 w-full">
                      <div
                        className="flex-1 bg-primary rounded-t-md transition-all hover:opacity-80"
                        style={{ height: `${heights[i]}%` }}
                      ></div>
                      <div
                        className="flex-1 bg-mint-200 rounded-t-md transition-all hover:opacity-80"
                        style={{ height: `${profitH[i]}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-on-surface-variant">{month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* KPI Table */}
          <div className="lg:col-span-2 bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Evaluasi KPI Pengurus</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-label-xs font-label-xs text-on-surface-variant">
                    <th className="text-left pb-3">Nama</th>
                    <th className="text-center pb-3">Absensi</th>
                    <th className="text-center pb-3">Task</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {kpiData.map((row) => (
                    <tr key={row.name} className="hover:bg-surface-bg transition-colors">
                      <td className="py-3 text-label-sm font-label-sm text-on-surface">{row.name}</td>
                      <td className="py-3 text-center">
                        <span className={`text-label-xs font-label-xs px-2 py-0.5 rounded-full ${
                          parseInt(row.absensi) >= 95 ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                        }`}>{row.absensi}</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`text-label-xs font-label-xs px-2 py-0.5 rounded-full ${
                          parseInt(row.taskCompletion) >= 90 ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                        }`}>{row.taskCompletion}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

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
