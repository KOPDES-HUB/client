import TopBar from "@/components/layout/TopBar";
import Link from "next/link";

const polls = [
  {
    id: "1",
    title: "Persetujuan Pengadaan Stok Beras Grosir BUMDes",
    desc: "Usulan pengadaan stok beras 10 ton untuk didistribusikan melalui jaringan BUMDes desa Merah Putih.",
    deadline: "Berakhir 2 hari lagi",
    setuju: 68,
    tidakSetuju: 32,
    status: "Aktif",
  },
  {
    id: "2",
    title: "Penetapan Suku Bunga Pinjaman Anggota Tahun 2025",
    desc: "Penentuan suku bunga pinjaman anggota untuk tahun 2025 berdasarkan kondisi pasar keuangan.",
    deadline: "Berakhir 5 hari lagi",
    setuju: 82,
    tidakSetuju: 18,
    status: "Aktif",
  },
  {
    id: "3",
    title: "Pengesahan Laporan Keuangan Tahun Buku 2023",
    desc: "Pemungutan suara untuk mengesahkan laporan keuangan tahunan koperasi.",
    deadline: "Berakhir 10 hari lagi",
    setuju: 55,
    tidakSetuju: 45,
    status: "Aktif",
  },
  {
    id: "4",
    title: "Pemilihan Pengurus Koperasi Periode 2025-2027",
    desc: "Pemilihan ketua, sekretaris, dan bendahara koperasi periode mendatang.",
    deadline: "Mulai 1 Agustus 2024",
    setuju: 0,
    tidakSetuju: 0,
    status: "Draft",
  },
];

const historyVotes = [
  { title: "Persetujuan Program Beasiswa Anggota 2023", voted: "Setuju", result: "Disetujui", date: "15 Mar 2024" },
  { title: "Revisi AD/ART Koperasi", voted: "Setuju", result: "Disetujui", date: "10 Jan 2024" },
  { title: "Penolakan Rencana Ekspansi Usaha", voted: "Tidak Setuju", result: "Ditolak", date: "20 Nov 2023" },
];

export default function EVotingPage() {
  return (
    <>
      <TopBar
        title="E-Voting"
        breadcrumb={[{ label: "Dashboard", href: "/dashboard" }, { label: "E-Voting" }]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface">Pengambilan Suara</h1>
            <p className="text-body-md text-on-surface-variant mt-1">
              Partisipasi Anda penting untuk keputusan koperasi yang demokratis.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-label-sm font-label-sm text-primary">{polls.filter(p => p.status === "Aktif").length} Voting Aktif</span>
            </div>
          </div>
        </div>

        {/* Active Polls Grid */}
        <section>
          <h2 className="text-headline-md font-headline-md text-on-surface mb-4">Voting Aktif</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {polls.filter(p => p.status === "Aktif").map((poll) => (
              <div key={poll.id} className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6 flex flex-col gap-4 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-label-sm font-label-sm text-on-surface leading-snug flex-1">{poll.title}</h3>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-error-container text-on-error-container rounded-full text-label-xs font-label-xs flex-shrink-0">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    {poll.deadline}
                  </span>
                </div>

                <p className="text-body-md text-on-surface-variant text-[13px] leading-relaxed">{poll.desc}</p>

                {/* Progress bars */}
                <div className="space-y-2">
                  <div className="flex justify-between text-label-xs font-label-xs mb-1">
                    <span className="text-primary">Setuju {poll.setuju}%</span>
                    <span className="text-on-surface-variant">Tidak Setuju {poll.tidakSetuju}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden flex">
                    <div className="h-full bg-primary rounded-l-full transition-all" style={{ width: `${poll.setuju}%` }}></div>
                    <div className="h-full bg-outline-variant rounded-r-full" style={{ width: `${poll.tidakSetuju}%` }}></div>
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <Link
                    href={`/dashboard/voting/${poll.id}`}
                    className="flex-1 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm text-center hover:bg-primary-container transition-all"
                  >
                    Lihat Detail & Vote
                  </Link>
                  <Link
                    href={`/dashboard/voting/${poll.id}/hasil`}
                    className="py-2.5 px-4 border border-mint-200 text-on-surface-variant rounded-xl text-label-sm font-label-sm hover:border-primary hover:text-primary transition-all"
                  >
                    Hasil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* History Table */}
        <section className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-outline-variant/30">
            <h2 className="text-headline-md font-headline-md text-on-surface">Riwayat Voting</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg text-on-surface-variant">
                  <th className="px-6 py-3 text-left text-label-sm font-label-sm uppercase tracking-wider">Judul Voting</th>
                  <th className="px-6 py-3 text-center text-label-sm font-label-sm uppercase tracking-wider">Pilihan Anda</th>
                  <th className="px-6 py-3 text-center text-label-sm font-label-sm uppercase tracking-wider">Hasil</th>
                  <th className="px-6 py-3 text-right text-label-sm font-label-sm uppercase tracking-wider">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {historyVotes.map((v, i) => (
                  <tr key={i} className="hover:bg-surface-bg transition-colors">
                    <td className="px-6 py-4 text-body-md text-on-surface">{v.title}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-label-xs font-label-xs ${
                        v.voted === "Setuju" ? "bg-primary/10 text-primary" : "bg-outline-variant/30 text-on-surface-variant"
                      }`}>{v.voted}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-label-xs font-label-xs ${
                        v.result === "Disetujui" ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-error-container text-on-error-container"
                      }`}>{v.result}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-body-md text-on-surface-variant">{v.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
