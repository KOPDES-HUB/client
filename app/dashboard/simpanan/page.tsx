import TopBar from "@/components/layout/TopBar";
import Link from "next/link";
import { AppIcon } from "@/components/ui/app-icon";

export default function SimpananRingkasanPage() {
  return (
    <>
      <TopBar
        title="Simpanan"
        breadcrumb={[{ label: "Dashboard", href: "/dashboard" }, { label: "Simpanan Saya" }]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* 3 Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "Simpanan Pokok",
              amount: "Rp 1.000.000",
              status: "Lunas",
              icon: "account_balance",
              trend: "trending_up",
              trendLabel: "Status: Lunas",
              sparkData: [40, 60, 50, 80, 100],
            },
            {
              label: "Simpanan Wajib",
              amount: "Rp 1.850.000",
              status: "Aktif",
              icon: "calendar_month",
              trend: "trending_up",
              trendLabel: "+Rp 150rb bulan ini",
              sparkData: [30, 45, 55, 70, 85],
            },
            {
              label: "Simpanan Sukarela",
              amount: "Rp 500.000",
              status: "Aktif",
              icon: "savings",
              trend: "trending_flat",
              trendLabel: "Tidak ada setoran baru",
              sparkData: [60, 60, 65, 60, 65],
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-surface-card rounded-2xl p-6 border border-mint-200 shadow-md hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <AppIcon name={s.icon} className="text-primary" />
                </div>
                {/* Sparkline */}
                <div className="flex items-end gap-1 h-10">
                  {s.sparkData.map((h, i) => (
                    <div
                      key={i}
                      className={`w-2 rounded-t-sm bg-primary`}
                      style={{ height: `${h}%`, opacity: 0.2 + (i / s.sparkData.length) * 0.8 }}
                    ></div>
                  ))}
                </div>
              </div>
              <p className="text-on-surface-variant text-label-sm font-label-sm mb-1">{s.label}</p>
              <h3 className="text-on-background text-headline-md font-headline-md">{s.amount}</h3>
              <p className="text-[11px] text-primary flex items-center gap-1 mt-2">
                <AppIcon name={s.trend} className="text-xs" />
                {s.trendLabel}
              </p>
            </div>
          ))}
        </section>

        {/* SHU Banner */}
        <section className="bg-inverse-surface rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
            <AppIcon name="payments" className="text-[200px] text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AppIcon name="info" className="text-primary-fixed text-[18px]" />
              <span className="text-label-xs font-label-xs text-secondary-fixed-dim uppercase tracking-wider">
                Estimasi SHU Tahun Ini
              </span>
            </div>
            <h2 className="text-headline-lg font-headline-lg text-white mb-2">Rp 456.000</h2>
            <p className="text-body-md text-secondary-fixed-dim max-w-lg">
              SHU dihitung berdasarkan kontribusi simpanan dan partisipasi transaksi Anda selama tahun buku 2024.
              Nilai final akan ditentukan pada RAT.
            </p>
          </div>
          <Link
            href="/dashboard/simpanan/riwayat"
            className="flex-shrink-0 px-6 py-3 border border-primary-fixed text-primary-fixed rounded-xl text-label-sm font-label-sm hover:bg-white/10 transition-all whitespace-nowrap"
          >
            Lihat Riwayat Transaksi →
          </Link>
        </section>

        {/* Recent Transactions preview */}
        <section className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-outline-variant/30">
            <h3 className="text-headline-md font-headline-md text-on-surface">Transaksi Terbaru</h3>
            <Link href="/dashboard/simpanan/riwayat" className="text-primary text-label-sm font-label-sm hover:underline">
              Lihat Semua →
            </Link>
          </div>
          <div className="divide-y divide-outline-variant/20">
            {[
              { date: "10 Jul 2024", desc: "Setoran Simpanan Wajib",   jenis: "Kredit",  amount: "+Rp 150.000", status: "Berhasil" },
              { date: "1 Jul 2024",  desc: "Setoran Simpanan Wajib",   jenis: "Kredit",  amount: "+Rp 150.000", status: "Berhasil" },
              { date: "15 Jun 2024", desc: "Setoran Simpanan Sukarela", jenis: "Kredit",  amount: "+Rp 200.000", status: "Berhasil" },
              { date: "1 Jun 2024",  desc: "Setoran Simpanan Wajib",   jenis: "Kredit",  amount: "+Rp 150.000", status: "Berhasil" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-surface-bg transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <AppIcon name="arrow_downward" className="text-primary text-[18px]" />
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface">{tx.desc}</p>
                    <p className="text-label-xs font-label-xs text-on-surface-variant">{tx.date} · {tx.jenis}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-label-sm font-label-sm text-primary">{tx.amount}</p>
                  <span className="text-label-xs font-label-xs px-2 py-0.5 bg-primary-fixed/30 text-on-primary-fixed-variant rounded-full">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center gap-4 p-5 bg-surface-card rounded-2xl border border-mint-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <AppIcon name="add_circle" className="text-primary group-hover:text-white" />
            </div>
            <div className="text-left">
              <p className="text-label-sm font-label-sm text-on-surface">Setor Simpanan Sukarela</p>
              <p className="text-label-xs font-label-xs text-on-surface-variant">Tambah simpanan kapan saja</p>
            </div>
          </button>
          <button className="flex items-center gap-4 p-5 bg-surface-card rounded-2xl border border-mint-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center group-hover:bg-tertiary group-hover:text-white transition-colors">
              <AppIcon name="download" className="text-tertiary group-hover:text-white" />
            </div>
            <div className="text-left">
              <p className="text-label-sm font-label-sm text-on-surface">Unduh Laporan Simpanan</p>
              <p className="text-label-xs font-label-xs text-on-surface-variant">Format PDF / Excel</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
