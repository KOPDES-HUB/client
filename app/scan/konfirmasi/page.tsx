import Link from "next/link";

export default function KonfirmasiHadirPage() {
  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center p-6">
      {/* Simple header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-surface-bg/80 backdrop-blur-md border-b border-outline-variant/30 px-6 py-4 flex items-center gap-2">
        <span className="text-headline-md font-headline-md text-primary font-bold">SIMPUL</span>
        <span className="text-label-xs text-on-surface-variant">Konfirmasi Absensi</span>
      </div>

      <div className="w-full max-w-[800px] mt-16">
        {/* Browser-like frame */}
        <div className="bg-white rounded-2xl border border-mint-200 shadow-2xl overflow-hidden">
          {/* Browser header */}
          <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/60"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400/60"></div>
              <div className="w-3 h-3 rounded-full bg-primary/60"></div>
            </div>
            <div className="bg-white rounded-lg px-4 py-1.5 text-label-xs text-on-surface-variant flex items-center gap-2 border border-outline-variant/30">
              <span className="material-symbols-outlined text-[14px] text-primary">lock</span>
              simpul-merahputih.co.id/absensi/success
            </div>
            <div className="w-16"></div>
          </div>

          {/* Success content */}
          <div className="p-12 md:p-16 flex flex-col items-center text-center">
            {/* Check badge */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary rounded-full opacity-10 scale-150 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/30">
                <span className="material-symbols-outlined text-white text-5xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              </div>
            </div>

            <h1 className="text-headline-lg font-headline-lg text-on-surface mb-3">Absensi Berhasil!</h1>
            <p className="text-body-lg text-on-surface-variant mb-2">
              Kehadiran Anda telah dicatat untuk:
            </p>
            <p className="text-headline-md font-headline-md text-primary mb-1">
              RAT Tahun Buku 2023
            </p>
            <p className="text-body-md text-on-surface-variant mb-8">
              25 Oktober 2024 · {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
            </p>

            {/* Info card */}
            <div className="w-full max-w-md bg-surface-bg rounded-2xl p-5 mb-8 text-left space-y-3">
              {[
                { label: "Nama Anggota",  value: "Budi Setiawan" },
                { label: "ID Anggota",    value: "SMP-2024-001" },
                { label: "Waktu Scan",    value: new Date().toLocaleString("id-ID") },
                { label: "Lokasi",        value: "Balai Desa Merah Putih" },
              ].map((d) => (
                <div key={d.label} className="flex justify-between items-center">
                  <span className="text-label-xs font-label-xs text-on-surface-variant">{d.label}</span>
                  <span className="text-label-sm font-label-sm text-on-surface">{d.value}</span>
                </div>
              ))}
            </div>

            <Link
              href="/dashboard/voting/1"
              className="px-8 py-3.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 transform"
            >
              Lanjut ke Voting RAT →
            </Link>

            <Link href="/dashboard/rat" className="mt-4 text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors">
              Kembali ke Detail RAT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
