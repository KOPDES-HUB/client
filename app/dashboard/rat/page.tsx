import TopBar from "@/components/layout/TopBar";
import Link from "next/link";

const agenda = [
  { no: 1, title: "Pembukaan & Sambutan Ketua Koperasi",       duration: "08:30 – 09:00", done: true },
  { no: 2, title: "Laporan Pertanggungjawaban Pengurus",        duration: "09:00 – 10:30", done: true },
  { no: 3, title: "Laporan Pengawas & Auditor Independen",      duration: "10:30 – 11:00", done: false, current: true },
  { no: 4, title: "Pembahasan & Pengesahan Laporan Keuangan",   duration: "11:00 – 12:00", done: false },
  { no: 5, title: "Istirahat & Makan Siang",                   duration: "12:00 – 13:00", done: false },
  { no: 6, title: "E-Voting — Pengesahan Program Kerja 2025",   duration: "13:00 – 14:00", done: false },
];

const documents = [
  { name: "Laporan Keuangan 2023.pdf",   size: "2.4 MB", icon: "description" },
  { name: "Program Kerja 2024-2025.pdf", size: "1.8 MB", icon: "article" },
  { name: "Daftar Hadir Sementara.xlsx", size: "0.5 MB", icon: "table_chart" },
];

export default function ERATPage() {
  const hadirCount = 68;
  const totalAnggota = 120;
  const kuorumPct = Math.round((hadirCount / totalAnggota) * 100);

  return (
    <>
      <TopBar
        title="E-RAT"
        breadcrumb={[{ label: "Dashboard", href: "/dashboard" }, { label: "Rapat Anggota Tahunan" }]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Header Meeting Card */}
        <section className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[200px] text-inverse-surface">groups</span>
          </div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <span className="inline-block px-3 py-1 bg-mint-200/30 text-primary text-label-sm font-label-sm rounded-full mb-3">
                  Kegiatan Tahunan
                </span>
                <h1 className="text-headline-lg font-headline-lg text-on-surface mb-2">
                  Rapat Anggota Tahunan (RAT) Tahun Buku 2023
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-on-surface-variant text-body-md">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">calendar_month</span>
                    25 Oktober 2024
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                    Balai Desa Merah Putih
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                    08:30 – 14:00 WIB
                  </div>
                </div>
              </div>
            </div>

            {/* Quorum Progress */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-label-sm font-label-sm text-on-surface">
                  Kehadiran: <strong className="text-primary">{hadirCount}/{totalAnggota} Hadir</strong>
                </span>
                <span className={`text-label-sm font-label-sm px-3 py-1 rounded-full ${
                  kuorumPct >= 50 ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-error-container text-on-error-container"
                }`}>
                  {kuorumPct >= 50 ? `✓ Kuorum (${kuorumPct}%)` : `Belum Kuorum (${kuorumPct}%)`}
                </span>
              </div>
              <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-mint-200 to-primary rounded-full transition-all duration-1000"
                  style={{ width: `${kuorumPct}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content: 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Agenda */}
          <div className="lg:col-span-2">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">Agenda Rapat</h2>
            <div className="space-y-3">
              {agenda.map((item) => (
                <div
                  key={item.no}
                  className={`bg-surface-card rounded-xl border p-5 flex items-center gap-4 transition-all ${
                    item.current ? "border-primary shadow-md shadow-primary/10" : "border-mint-200"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.done ? "bg-primary" : item.current ? "border-2 border-primary bg-primary/10" : "border-2 border-outline-variant bg-surface-bg"
                  }`}>
                    {item.done ? (
                      <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    ) : (
                      <span className={`text-label-xs font-bold ${item.current ? "text-primary" : "text-on-surface-variant"}`}>{item.no}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-label-sm font-label-sm ${item.current ? "text-primary" : item.done ? "text-on-surface-variant line-through" : "text-on-surface"}`}>
                      {item.title}
                    </p>
                    <p className="text-label-xs font-label-xs text-on-surface-variant mt-0.5">{item.duration}</p>
                  </div>
                  {item.current && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary text-white rounded-full text-label-xs font-label-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      Berlangsung
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Scan Absensi Card */}
            <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Absensi Digital</h3>
              <p className="text-body-md text-on-surface-variant mb-5">
                Scan QR yang ditampilkan di layar proyektor untuk mencatat kehadiran Anda.
              </p>
              <Link
                href="/scan"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20 mb-3"
              >
                <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                Scan Absensi
              </Link>
              <div className="flex items-center gap-2 text-label-xs font-label-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Atau buka <span className="text-primary font-bold">simpul.id/scan/RAT2024</span>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Dokumen Rapat</h3>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.name} className="flex items-center gap-3 p-3 bg-surface-bg rounded-xl hover:bg-surface-container transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-[18px]">{doc.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-label-xs font-label-xs text-on-surface truncate">{doc.name}</p>
                      <p className="text-[10px] text-on-surface-variant">{doc.size}</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">download</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Proyektor link */}
            <Link
              href="/rat/proyektor"
              className="flex items-center justify-center gap-2 w-full py-3 border border-mint-200 text-on-surface-variant rounded-xl text-label-sm font-label-sm hover:border-primary hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">cast</span>
              Buka Layar Proyektor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
