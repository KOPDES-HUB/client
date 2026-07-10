import Link from "next/link";

export default function ScanAbsensiPage() {
  return (
    <div className="min-h-screen bg-inverse-surface flex flex-col">
      {/* Simple header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-inverse-surface/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-headline-md font-headline-md text-primary-fixed font-bold">SIMPUL</span>
          <span className="text-label-xs text-secondary-fixed-dim">Scan Absensi RAT</span>
        </div>
        <Link href="/dashboard/rat" className="text-label-sm font-label-sm text-secondary-fixed-dim hover:text-white transition-colors">
          ✕ Tutup
        </Link>
      </header>

      {/* Camera area */}
      <div className="flex-1 relative mt-[72px]">
        {/* Camera background simulation */}
        <div className="absolute inset-0 bg-gradient-to-br from-inverse-surface to-[#1a2a1c] flex items-center justify-center">
          {/* Blur overlay simulating camera view */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent"></div>
          </div>

          {/* Scanning overlay UI */}
          <div className="relative flex flex-col items-center justify-center z-20">
            {/* Instruction bar */}
            <div className="mb-10 px-6 py-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
              <span className="material-symbols-outlined text-white text-[18px]">info</span>
              <span className="text-label-sm font-label-sm text-white">Arahkan kamera ke QR di layar rapat</span>
            </div>

            {/* Viewfinder */}
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Corner brackets */}
              {[
                "top-0 left-0 border-t-4 border-l-4 rounded-tl-xl",
                "top-0 right-0 border-t-4 border-r-4 rounded-tr-xl",
                "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-xl",
                "bottom-0 right-0 border-b-4 border-r-4 rounded-br-xl",
              ].map((cls, i) => (
                <div key={i} className={`absolute w-12 h-12 border-primary ${cls}`}></div>
              ))}

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Scanning animation line */}
                <div className="w-full h-0.5 bg-primary opacity-70 animate-bounce"></div>
              </div>

              {/* Overlay tint */}
              <div className="absolute inset-0 border border-white/10"></div>
            </div>

            {/* Helper text */}
            <p className="mt-8 text-white/60 text-body-md text-center max-w-xs">
              Posisikan kode QR di dalam bingkai. Kamera akan mendeteksi secara otomatis.
            </p>

            {/* Manual entry fallback */}
            <Link
              href="/scan/konfirmasi"
              className="mt-8 px-8 py-3 border border-white/30 hover:border-white text-white rounded-xl text-label-sm font-label-sm hover:bg-white/10 transition-all"
            >
              Masuk Manual dengan Kode
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
