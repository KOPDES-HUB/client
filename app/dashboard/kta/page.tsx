import TopBar from "@/components/layout/TopBar";
import Link from "next/link";

export default function KTADigitalPage() {
  return (
    <>
      <TopBar
        title="KTA Digital"
        breadcrumb={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Kartu Tanda Anggota Digital" },
        ]}
      />

      <div className="flex-1 p-8 flex flex-col items-center max-w-container-max mx-auto w-full">
        {/* KTA Card Section */}
        <div className="w-full max-w-[800px] flex flex-col items-center">
          {/* The KTA Digital Card */}
          <div className="relative w-full kta-card-glow rounded-2xl overflow-hidden transition-transform hover:scale-[1.01] duration-500 ease-out cursor-default group"
            style={{ aspectRatio: "1.6/1", maxHeight: "420px" }}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#122114] via-[#1a3a24] to-[#488451]"></div>
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 transform translate-x-20"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col p-10 justify-between text-white">
              {/* Top Row: Logo & Status */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-headline-md font-headline-md font-extrabold tracking-tight">SIMPUL</span>
                  <span className="text-label-xs opacity-70 tracking-widest uppercase">Merah Putih</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-label-xs text-white/90">Anggota Terverifikasi</span>
                </div>
              </div>

              {/* Middle: Member photo + details */}
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <span className="material-symbols-outlined text-white/60 text-5xl">person</span>
                </div>
                <div className="flex-1">
                  <p className="text-label-xs opacity-70 uppercase tracking-widest mb-1">Nama Anggota</p>
                  <h2 className="text-2xl font-bold tracking-tight mb-1">Budi Setiawan</h2>
                  <p className="text-label-xs opacity-70">NIK: 3271xxxxxxxxxxxx</p>
                </div>
                {/* QR Code block */}
                <div className="bg-white p-3 rounded-xl flex-shrink-0">
                  <div className="w-24 h-24 grid grid-cols-5 gap-0.5">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${[0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24,6,12,18].includes(i) ? "bg-inverse-surface" : "bg-white"}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: Member number */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-label-xs opacity-70 uppercase tracking-widest mb-1">Nomor Anggota</p>
                  <p className="text-xl font-mono tracking-widest">SMP-2024-001</p>
                </div>
                <div className="text-right">
                  <p className="text-label-xs opacity-70">Koperasi Desa Merah Putih</p>
                  <p className="text-label-xs opacity-70">Berlaku s.d. 31 Des 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8 w-full">
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 transform">
              <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
              Perbesar QR
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-mint-200 text-primary rounded-xl text-label-sm font-label-sm hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-[18px]">share</span>
              Bagikan KTA
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 border border-mint-200 text-on-surface-variant rounded-xl text-label-sm font-label-sm hover:bg-surface-container transition-all">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Unduh
            </button>
          </div>

          {/* Info Note */}
          <div className="mt-6 w-full bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">info</span>
            <p className="text-body-md text-on-surface-variant">
              KTA Digital ini merupakan identitas resmi Anda sebagai anggota Koperasi Desa Merah Putih. QR Code
              pada kartu digunakan untuk verifikasi kehadiran di E-RAT dan konfirmasi transaksi tertentu.
            </p>
          </div>

          {/* Member Details Card */}
          <div className="mt-6 w-full bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Detail Keanggotaan</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Status",          value: "Anggota Terverifikasi", highlight: true },
                { label: "Tanggal Bergabung", value: "15 Januari 2024" },
                { label: "Jenis Keanggotaan", value: "Anggota Biasa" },
                { label: "Total Simpanan",  value: "Rp 3.250.000", highlight: true },
                { label: "SHU Terakhir",    value: "Rp 450.000" },
                { label: "Kelas LMS",       value: "3 Kursus Aktif" },
              ].map((d) => (
                <div key={d.label} className="p-4 bg-surface-bg rounded-xl">
                  <p className="text-label-xs font-label-xs text-on-surface-variant mb-1">{d.label}</p>
                  <p className={`text-body-md font-semibold ${d.highlight ? "text-primary" : "text-on-surface"}`}>
                    {d.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
