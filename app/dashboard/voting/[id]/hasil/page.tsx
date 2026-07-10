import TopBar from "@/components/layout/TopBar";
import Link from "next/link";

export default function HasilVotingPage() {
  const setuju = 68;
  const tidakSetuju = 32;
  const totalVotes = 82;
  const quorum = 120;

  return (
    <>
      <TopBar
        title="Hasil Voting"
        breadcrumb={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "E-Voting", href: "/dashboard/voting" },
          { label: "Hasil Real-time" },
        ]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full">
        {/* Title card */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-headline-md font-headline-md text-on-surface">
                Persetujuan Pengadaan Stok Beras Grosir BUMDes
              </h1>
              <p className="text-body-md text-on-surface-variant mt-1">Berakhir: 12 Juli 2024 · 23:59 WIB</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-label-sm font-label-sm text-primary font-bold">Live</span>
            </div>
          </div>
        </div>

        {/* Results layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Chart */}
          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-8">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-6">Distribusi Suara</h2>

            {/* Donut chart simulation */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5eeff" strokeWidth="20" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="#488451" strokeWidth="20"
                    strokeDasharray={`${setuju * 2.51} ${(100 - setuju) * 2.51}`}
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="#bddbc2" strokeWidth="20"
                    strokeDasharray={`${tidakSetuju * 2.51} ${(100 - tidakSetuju) * 2.51}`}
                    strokeDashoffset={`${-(setuju) * 2.51}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-headline-lg font-headline-lg text-primary">{setuju}%</span>
                  <span className="text-label-xs font-label-xs text-on-surface-variant">Setuju</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-bg rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <span className="text-body-md text-on-surface font-semibold">Setuju</span>
                </div>
                <div className="text-right">
                  <span className="text-headline-md font-headline-md text-primary">{setuju}%</span>
                  <p className="text-label-xs font-label-xs text-on-surface-variant">{Math.round(totalVotes * setuju / 100)} suara</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-bg rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-mint-200"></div>
                  <span className="text-body-md text-on-surface font-semibold">Tidak Setuju</span>
                </div>
                <div className="text-right">
                  <span className="text-headline-md font-headline-md text-on-surface-variant">{tidakSetuju}%</span>
                  <p className="text-label-xs font-label-xs text-on-surface-variant">{Math.round(totalVotes * tidakSetuju / 100)} suara</p>
                </div>
              </div>
            </div>

            {/* Bar chart */}
            <div className="mt-6">
              <div className="flex justify-between text-label-xs font-label-xs text-on-surface-variant mb-2">
                <span>Setuju</span>
                <span>Tidak Setuju</span>
              </div>
              <div className="h-6 w-full bg-surface-container rounded-full overflow-hidden flex">
                <div className="h-full bg-primary rounded-l-full transition-all" style={{ width: `${setuju}%` }}></div>
                <div className="h-full bg-mint-200" style={{ width: `${tidakSetuju}%` }}></div>
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="space-y-6">
            {/* Total votes + Quorum */}
            <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Status Partisipasi</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-body-md text-on-surface-variant">Total Suara Masuk</span>
                  <span className="text-headline-md font-headline-md text-on-surface">{totalVotes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body-md text-on-surface-variant">Target Kuorum</span>
                  <span className="text-headline-md font-headline-md text-on-surface">{quorum / 2}+</span>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-body-md text-on-surface-variant">Pencapaian Kuorum</span>
                    <span className={`text-label-sm font-label-sm px-2.5 py-1 rounded-full ${
                      totalVotes >= quorum / 2 ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-error-container text-on-error-container"
                    }`}>
                      {totalVotes >= quorum / 2 ? "✓ Kuorum Tercapai" : "Belum Kuorum"}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-mint-200 to-primary rounded-full"
                      style={{ width: `${Math.min(100, (totalVotes / quorum) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-label-xs font-label-xs text-on-surface-variant">{totalVotes} hadir</span>
                    <span className="text-label-xs font-label-xs text-on-surface-variant">{quorum} total anggota</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Participation Breakdown */}
            <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Rincian Partisipasi</h3>
              <div className="space-y-3">
                {[
                  { label: "Sudah Memilih",      count: totalVotes, color: "text-primary", bgColor: "bg-primary" },
                  { label: "Belum Memilih",       count: quorum - totalVotes, color: "text-on-surface-variant", bgColor: "bg-outline-variant" },
                  { label: "Suara Tidak Sah",     count: 0, color: "text-error", bgColor: "bg-error" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.bgColor}`}></div>
                      <span className="text-body-md text-on-surface">{item.label}</span>
                    </div>
                    <span className={`text-label-sm font-label-sm ${item.color}`}>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <Link
              href="/dashboard/voting/1"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[18px]">how_to_vote</span>
              Berikan Suara Anda
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
