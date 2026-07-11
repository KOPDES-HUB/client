import Link from "next/link";
import { AppIcon } from "@/components/ui/app-icon";
import LandingNavbar from "@/components/layout/LandingNavbar";

export default function LandingPage() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <LandingNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="max-w-container-max mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-8 max-w-xl">
              <h1 className="text-headline-hero font-headline-hero text-white">
                Satu Kartu, Semua Layanan Koperasi
              </h1>
              <p className="text-white/80 text-body-lg leading-relaxed">
                Transformasi digital ekosistem koperasi Indonesia. Kelola
                keanggotaan, simpan-pinjam, hingga partisipasi dalam pengambilan
                keputusan hanya dengan satu platform terintegrasi yang aman dan
                transparan.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/cari-koperasi"
                  className="bg-[#488451] hover:bg-[#3a6b41] text-white px-8 py-4 rounded-lg text-label-sm font-label-sm transition-all shadow-lg shadow-black/20 hover:-translate-y-0.5 transform"
                >
                  Daftar Jadi Anggota
                </Link>
                <Link
                  href="/login"
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
                  <AppIcon name="contactless" className="text-white text-4xl" />
                </div>
                <div className="w-12 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md mb-8"></div>
                <div className="space-y-4">
                  <div className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">
                    Nomor Anggota
                  </div>
                  <div className="text-white text-2xl font-mono tracking-widest">
                    4802 8812 0092 1104
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <div className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">
                        Nama Pemegang
                      </div>
                      <div className="text-white text-lg font-medium">
                        Budi Setiawan
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                      <AppIcon name="shield_person" className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <AppIcon name="verified_user" className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-tight">
                    Status Aktif
                  </p>
                  <p className="text-sm font-bold text-on-surface">
                    Anggota Premium
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="bg-surface-bg py-24">
          <div className="max-w-container-max mx-auto px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-bold tracking-widest uppercase text-xs">
                Keunggulan Platform
              </span>
              <h2 className="text-headline-lg font-headline-lg text-inverse-surface mt-4">
                Pilar Utama Digitalisasi Koperasi
              </h2>
              <p className="text-on-surface-variant mt-4 text-body-md">
                Sistem yang dirancang untuk mendukung transparansi dan efisiensi
                dalam tata kelola koperasi modern di seluruh pelosok Indonesia.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "badge",
                  title: "KTA Digital",
                  desc: "Identitas digital resmi anggota koperasi yang terintegrasi dengan NIK dan sistem perbankan nasional untuk kemudahan transaksi.",
                },
                {
                  icon: "how_to_vote",
                  title: "E-Voting Transparan",
                  desc: "Berpartisipasi dalam Rapat Anggota Tahunan (RAT) secara online dengan sistem pemungutan suara yang aman dan terverifikasi.",
                },
                {
                  icon: "school",
                  title: "Belajar & Sertifikasi",
                  desc: "Akses ke modul pelatihan manajemen koperasi, literasi keuangan, dan sertifikasi kompetensi untuk seluruh anggota dan pengurus.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="bg-surface-card p-6 rounded-2xl border border-mint-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <AppIcon
                      name={f.icon}
                      className="text-3xl text-primary group-hover:text-white"
                    />
                  </div>
                  <h3 className="text-headline-md font-headline-md text-inverse-surface mb-3">
                    {f.title}
                  </h3>
                  <p className="text-on-surface-variant text-body-md leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="statistik" className="py-20 bg-inverse-surface text-white">
          <div className="max-w-container-max mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "500+", label: "Koperasi Bergabung" },
                { value: "250k", label: "Anggota Aktif" },
                { value: "Rp 12T", label: "Aset Dikelola" },
                { value: "100%", label: "Transparan" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-headline-lg font-headline-lg text-primary-fixed mb-1">
                    {s.value}
                  </div>
                  <p className="text-secondary-fixed-dim text-label-sm font-label-sm uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Empowerment Section */}
        <section id="layanan" className="py-24 bg-surface-bg overflow-hidden">
          <div className="max-w-container-max mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <span className="text-primary font-bold tracking-widest uppercase text-xs">
                Dampak Nyata
              </span>
              <h2 className="text-headline-lg font-headline-lg text-inverse-surface">
                Layanan yang Memberdayakan Masyarakat Desa
              </h2>
              <p className="text-on-surface-variant text-body-lg">
                SIMPUL Merah Putih bekerja sama dengan aparat desa dan pengurus
                koperasi untuk memastikan setiap anggota memiliki akses yang
                sama terhadap modal kerja dan distribusi hasil yang adil.
              </p>
              <ul className="space-y-4">
                {[
                  "Integrasi langsung ke pasar digital (E-Commerce)",
                  "Akses pinjaman modal usaha bunga rendah",
                  "Monitoring saldo SHU secara real-time",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary shrink-0">
                      <AppIcon name="check_circle" className="text-[15px]" />
                    </span>
                    <span className="text-on-surface text-body-md font-semibold">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 pt-2">
                <Link
                  href="/cari-koperasi"
                  className="bg-primary text-white px-8 py-3 rounded-lg text-label-sm font-label-sm hover:bg-primary-container transition-all"
                >
                  Bergabung Sekarang
                </Link>
                <Link
                  href="#"
                  className="border border-primary text-primary px-8 py-3 rounded-lg text-label-sm font-label-sm hover:bg-primary/5 transition-all"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full relative py-6">
              {/* Decorative blobs */}
              <div className="absolute -top-10 -right-6 w-56 h-56 bg-primary/15 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-6 w-48 h-48 bg-mint-200/50 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-gradient-to-br from-primary via-primary-container to-inverse-surface aspect-video flex items-center justify-center">
                {/* Dot-grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                ></div>

                <div className="relative z-10 text-center text-white px-8">
                  <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse"></span>
                    Ekosistem Digital
                  </span>
                  <AppIcon
                    name="groups"
                    className="text-7xl opacity-90 mx-auto"
                  />
                  <p className="mt-5 text-headline-md font-headline-md">
                    Platform Koperasi Digital Indonesia
                  </p>
                  <p className="mt-2 text-body-md text-white/70 max-w-xs mx-auto">
                    Menghubungkan desa, koperasi, dan anggota dalam satu
                    ekosistem yang transparan.
                  </p>
                </div>
              </div>

              {/* Floating badge — aset dikelola */}
              <div className="absolute -top-4 right-2 md:right-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 border border-mint-200">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <AppIcon name="account_balance_wallet" className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-tight">
                    Aset Dikelola
                  </p>
                  <p className="text-sm font-bold text-on-surface">
                    Rp 12 Triliun
                  </p>
                </div>
              </div>

              {/* Floating badge — koperasi aktif */}
              <div className="absolute -bottom-4 left-2 md:left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 border border-mint-200">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <AppIcon name="verified_user" className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-tight">
                    Koperasi Aktif
                  </p>
                  <p className="text-sm font-bold text-on-surface">
                    500+ Terverifikasi
                  </p>
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
            <div className="text-headline-md font-headline-md text-primary-fixed mb-2">
              SIMPUL
            </div>
            <p className="text-label-xs text-secondary-fixed-dim">
              © 2026 SIMPUL Merah Putih. Tata Kelola Koperasi Digital Indonesia.
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-secondary-fixed-dim hover:text-white transition-colors text-label-xs font-label-xs"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="text-secondary-fixed-dim hover:text-white transition-colors text-label-xs font-label-xs"
            >
              Syarat & Ketentuan
            </Link>
            <Link
              href="#"
              className="text-secondary-fixed-dim hover:text-white transition-colors text-label-xs font-label-xs"
            >
              Pusat Bantuan
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
