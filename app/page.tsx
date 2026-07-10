import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Top Navbar */}
      <header className="bg-surface-bg border-b border-outline-variant fixed w-full top-0 z-50">
        <nav className="flex justify-between items-center px-8 py-4 max-w-container-max mx-auto">
          <div className="text-headline-md font-headline-md font-bold text-primary">
            SIMPUL Merah Putih
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-primary font-bold border-b-2 border-primary text-body-md transition-colors">
              Tentang Kami
            </Link>
            <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors text-body-md">
              Layanan
            </Link>
            <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors text-body-md">
              Program
            </Link>
            <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors text-body-md">
              Kontak
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary transition-colors">
              Masuk
            </Link>
            <Link href="/register" className="bg-primary text-white px-6 py-2.5 rounded-lg text-label-sm font-label-sm hover:bg-primary-container transition-all">
              Daftar Sekarang
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow pt-[72px]">
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden py-24 md:py-32">
          <div className="max-w-container-max mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-8 max-w-xl">
              <h1 className="text-headline-hero font-headline-hero text-white">
                Satu Kartu, Semua Layanan Koperasi
              </h1>
              <p className="text-white/80 text-body-lg leading-relaxed">
                Transformasi digital ekosistem koperasi Indonesia. Kelola keanggotaan, simpan-pinjam, hingga
                partisipasi dalam pengambilan keputusan hanya dengan satu platform terintegrasi yang aman dan
                transparan.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/register"
                  className="bg-[#488451] hover:bg-[#3a6b41] text-white px-8 py-4 rounded-lg text-label-sm font-label-sm transition-all shadow-lg shadow-black/20 hover:-translate-y-0.5 transform"
                >
                  Daftar Jadi Anggota
                </Link>
                <Link
                  href="/dashboard"
                  className="border border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg text-label-sm font-label-sm transition-all"
                >
                  Masuk ke Dashboard
                </Link>
              </div>
            </div>

            {/* KTA Mockup Card */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-md rounded-2xl p-8 glass-card overflow-hidden shadow-2xl border border-white/20 hover:rotate-0 transition-transform duration-700 md:rotate-6">
                <div className="flex justify-between items-start mb-12">
                  <div className="text-white font-bold text-xl tracking-tight">
                    SIMPUL <span className="font-normal opacity-70">MP</span>
                  </div>
                  <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    contactless
                  </span>
                </div>
                <div className="w-12 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md mb-8"></div>
                <div className="space-y-4">
                  <div className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">Nomor Anggota</div>
                  <div className="text-white text-2xl font-mono tracking-widest">4802 8812 0092 1104</div>
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <div className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">Nama Pemegang</div>
                      <div className="text-white text-lg font-medium">Budi Setiawan</div>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                      <span className="material-symbols-outlined text-white">shield_person</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-tight">Status Aktif</p>
                  <p className="text-sm font-bold text-on-surface">Anggota Premium</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-surface-bg py-24">
          <div className="max-w-container-max mx-auto px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-bold tracking-widest uppercase text-xs">Keunggulan Platform</span>
              <h2 className="text-headline-lg font-headline-lg text-inverse-surface mt-4">
                Pilar Utama Digitalisasi Koperasi
              </h2>
              <p className="text-on-surface-variant mt-4 text-body-md">
                Sistem yang dirancang untuk mendukung transparansi dan efisiensi dalam tata kelola koperasi modern
                di seluruh pelosok Indonesia.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "badge", title: "KTA Digital", desc: "Identitas digital resmi anggota koperasi yang terintegrasi dengan NIK dan sistem perbankan nasional untuk kemudahan transaksi." },
                { icon: "how_to_vote", title: "E-Voting Transparan", desc: "Berpartisipasi dalam Rapat Anggota Tahunan (RAT) secara online dengan sistem pemungutan suara yang aman dan terverifikasi." },
                { icon: "school", title: "Belajar & Sertifikasi", desc: "Akses ke modul pelatihan manajemen koperasi, literasi keuangan, dan sertifikasi kompetensi untuk seluruh anggota dan pengurus." },
              ].map((f) => (
                <div
                  key={f.title}
                  className="bg-surface-card p-6 rounded-2xl border border-mint-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white">{f.icon}</span>
                  </div>
                  <h3 className="text-headline-md font-headline-md text-inverse-surface mb-3">{f.title}</h3>
                  <p className="text-on-surface-variant text-body-md leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-inverse-surface text-white">
          <div className="max-w-container-max mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "500+", label: "Koperasi Bergabung" },
                { value: "250k", label: "Anggota Aktif" },
                { value: "Rp 12T", label: "Aset Dikelola" },
                { value: "100%", label: "Transparan" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-headline-lg font-headline-lg text-primary-fixed mb-1">{s.value}</div>
                  <p className="text-secondary-fixed-dim text-label-sm font-label-sm uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Empowerment Section */}
        <section className="py-24 bg-surface-bg">
          <div className="max-w-container-max mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="text-headline-lg font-headline-lg text-inverse-surface">
                Layanan yang Memberdayakan Masyarakat Desa
              </h2>
              <p className="text-on-surface-variant text-body-lg">
                SIMPUL Merah Putih bekerja sama dengan aparat desa dan pengurus koperasi untuk memastikan setiap
                anggota memiliki akses yang sama terhadap modal kerja dan distribusi hasil yang adil.
              </p>
              <ul className="space-y-4">
                {[
                  "Integrasi langsung ke pasar digital (E-Commerce)",
                  "Akses pinjaman modal usaha bunga rendah",
                  "Monitoring saldo SHU secara real-time",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="text-on-surface text-body-md font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 pt-2">
                <Link href="/register" className="bg-primary text-white px-8 py-3 rounded-lg text-label-sm font-label-sm hover:bg-primary-container transition-all">
                  Bergabung Sekarang
                </Link>
                <Link href="#" className="border border-primary text-primary px-8 py-3 rounded-lg text-label-sm font-label-sm hover:bg-primary/5 transition-all">
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-gradient-to-br from-primary to-primary-container aspect-video flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <span className="material-symbols-outlined text-8xl opacity-40">groups</span>
                  <p className="mt-4 text-body-lg opacity-70">Platform Koperasi Digital Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-inverse-surface">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-8 mt-auto max-w-container-max mx-auto">
          <div className="mb-4 md:mb-0">
            <div className="text-headline-md font-headline-md text-primary-fixed mb-2">SIMPUL</div>
            <p className="text-label-xs text-secondary-fixed-dim">
              © 2024 SIMPUL Merah Putih. Tata Kelola Koperasi Digital Indonesia.
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-secondary-fixed-dim hover:text-white transition-colors text-label-xs font-label-xs">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="text-secondary-fixed-dim hover:text-white transition-colors text-label-xs font-label-xs">
              Syarat & Ketentuan
            </Link>
            <Link href="#" className="text-secondary-fixed-dim hover:text-white transition-colors text-label-xs font-label-xs">
              Pusat Bantuan
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
