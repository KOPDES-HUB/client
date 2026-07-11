"use client";

import TopBar from "@/components/layout/TopBar";
import Link from "next/link";
import ArusKasNpvPanel from "@/components/kelayakan/ArusKasNpvPanel";

const UNIT_USAHA = [
  {
    id: "1",
    nama: "Warung Koperasi",
    kategori: "RETAIL",
    deskripsi: "Toko kebutuhan sehari-hari anggota dengan harga lebih terjangkau. Stok lengkap mulai sembako, minyak, gula, hingga kebutuhan rumah tangga.",
    paramPoin: 1.0,
    jam: "06.00 – 20.00 WIB",
    lokasi: "Kantor Koperasi, Lt. Dasar",
    totalTransaksi: 1_248,
    icon: "storefront",
    isAktif: true,
  },
  {
    id: "2",
    nama: "Unit Simpan Pinjam",
    kategori: "SIMPAN_PINJAM",
    deskripsi: "Layanan simpanan dan pinjaman dengan bunga ringan untuk anggota aktif. Proses cepat, jaminan fleksibel, dan cicilan sesuai kemampuan.",
    paramPoin: 1.0,
    jam: "08.00 – 15.00 WIB",
    lokasi: "Kantor Koperasi, Lt. 2",
    totalTransaksi: 856,
    icon: "account_balance",
    isAktif: true,
  },
  {
    id: "3",
    nama: "Agro Koperasi",
    kategori: "PERTANIAN",
    deskripsi: "Penyedia bibit, pupuk subsidi, dan alat pertanian. Anggota dapat memperoleh input pertanian dengan harga grosir dan kualitas terjamin.",
    paramPoin: 1.0,
    jam: "07.00 – 16.00 WIB",
    lokasi: "Gudang Koperasi",
    totalTransaksi: 642,
    icon: "agriculture",
    isAktif: true,
  },
  {
    id: "4",
    nama: "Unit Jasa Fotocopy",
    kategori: "JASA",
    deskripsi: "Layanan fotocopy, print, scan, dan laminating dokumen untuk anggota dan masyarakat umum. Harga bersahabat, mesin modern.",
    paramPoin: 0.5,
    jam: "07.30 – 17.00 WIB",
    lokasi: "Kantor Koperasi, Lobby",
    totalTransaksi: 2_104,
    icon: "print",
    isAktif: true,
  },
  {
    id: "5",
    nama: "Apotek Koperasi",
    kategori: "LAINNYA",
    deskripsi: "Apotek mitra koperasi yang menyediakan obat-obatan, vitamin, dan perlengkapan kesehatan dengan diskon khusus anggota.",
    paramPoin: 1.5,
    jam: "08.00 – 21.00 WIB",
    lokasi: "Komplek Koperasi, Blok B",
    totalTransaksi: 389,
    icon: "local_pharmacy",
    isAktif: false,
  },
];

const KATEGORI_COLOR: Record<string, string> = {
  RETAIL:        "bg-primary-fixed text-on-primary-fixed-variant",
  SIMPAN_PINJAM: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  PERTANIAN:     "bg-secondary-container text-on-surface",
  JASA:          "bg-mint-200 text-inverse-surface",
  LAINNYA:       "bg-outline-variant/40 text-on-surface",
};

const KATEGORI_LABEL: Record<string, string> = {
  RETAIL: "Retail", SIMPAN_PINJAM: "Simpan Pinjam",
  PERTANIAN: "Pertanian", JASA: "Jasa", LAINNYA: "Lainnya",
};

export default function UnitUsahaPage() {
  return (
    <>
      <TopBar
        title="Unit Usaha"
        breadcrumb={[{ label: "Dashboard", href: "/dashboard" }, { label: "Unit Usaha Koperasi" }]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Intro */}
        <div className="bg-inverse-surface rounded-2xl p-6 text-primary-fixed flex items-center justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold mb-2">Unit Usaha Koperasi Anda</h2>
            <p className="text-secondary-fixed-dim text-sm leading-relaxed max-w-xl">
              Berbelanja dan bertransaksi di unit usaha koperasi menghasilkan <strong>poin transaksi</strong> yang
              menjadi salah satu faktor SHU Anda. Semakin aktif, semakin besar manfaat yang Anda terima.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              href="/dashboard/transaksi"
              className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              Lihat Transaksi Saya
            </Link>
          </div>
        </div>

        {/* Kelayakan keuangan dari data riil */}
        <ArusKasNpvPanel compact />

        {/* Unit usaha grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {UNIT_USAHA.map((u) => (
            <div
              key={u.id}
              className={`bg-surface-card rounded-2xl border shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden ${
                u.isAktif ? "border-mint-200" : "border-outline-variant/30 opacity-60"
              }`}
            >
              {/* Card header */}
              <div className="p-5 pb-3">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">{u.icon}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${KATEGORI_COLOR[u.kategori]}`}>
                      {KATEGORI_LABEL[u.kategori]}
                    </span>
                    {!u.isAktif && (
                      <span className="px-2 py-0.5 bg-outline-variant/30 rounded text-[10px] text-on-surface-variant font-semibold">
                        Sementara Tutup
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-label-sm font-label-sm text-on-surface font-bold mb-2">{u.nama}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">{u.deskripsi}</p>
              </div>

              {/* Details */}
              <div className="px-5 py-3 bg-surface-bg border-t border-outline-variant/20 space-y-2">
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
                  {u.jam}
                </div>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                  {u.lokasi}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-outline-variant/20 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Poin per Rp 10rb</p>
                  <p className="text-primary font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">stars</span>
                    {u.paramPoin} poin
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Total Transaksi</p>
                  <p className="text-on-surface font-bold">{u.totalTransaksi.toLocaleString("id")}×</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
