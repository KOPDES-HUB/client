"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect, Suspense } from "react";
import type { KoperasiData } from "@/types/koperasi";
import { useCheckLocation } from "@/hooks/use-check-location";

/* Leaflet must only render on the client */
const KoperasiMap = dynamic(() => import("@/components/map/KoperasiMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-surface-container gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      <p className="text-body-md text-on-surface-variant">Memuat peta…</p>
    </div>
  ),
});

/* ── Dummy data — 5 titik koordinat ──────────────────────────────── */
const KOPERASI_LIST: KoperasiData[] = [
  {
    koperasi_ref: "KOP-2024-001",
    nama_koperasi: "Koperasi Desa Merauke Sejahtera",
    status_registrasi: "Aktif",
    bentuk_koperasi: "Koperasi Serba Usaha",
    kategori_usaha: "Pertanian & Perdagangan",
    nik_koperasi: "9401.12.2024.001",
    alamat_lengkap: "Jl. Mandala No. 12, Merauke, Papua Selatan",
    kode_pos: "99611",
    koordinat_dibulatkan: "-8.053, 140.755",
    koordinat: [-8.053, 140.755],
    modal_awal: "Rp 250.000.000",
    sumber_persetujuan: "Dinas Koperasi Kab. Merauke",
    tentang_koperasi:
      "Koperasi yang bergerak di bidang pengadaan pangan, pertanian lokal, dan distribusi kebutuhan pokok masyarakat Merauke.",
  },
  {
    koperasi_ref: "KOP-2024-002",
    nama_koperasi: "Koperasi Borneo Mandiri Sejahtera",
    status_registrasi: "Aktif",
    bentuk_koperasi: "Koperasi Unit Desa",
    kategori_usaha: "Pertambangan & Jasa",
    nik_koperasi: "6401.07.2024.002",
    alamat_lengkap: "Jl. Soekarno-Hatta Km 5, Samarinda, Kalimantan Timur",
    kode_pos: "75124",
    koordinat_dibulatkan: "-0.479, 117.142",
    koordinat: [-0.479, 117.142],
    modal_awal: "Rp 480.000.000",
    sumber_persetujuan: "Dinas Koperasi Prov. Kaltim",
    tentang_koperasi:
      "KUD terbesar di Kalimantan Timur yang mengelola simpanan, pinjaman, dan distribusi kebutuhan rumah tangga anggota.",
  },
  {
    koperasi_ref: "KOP-2024-003",
    nama_koperasi: "Koperasi Desa Bunga Rafflesia",
    status_registrasi: "Aktif",
    bentuk_koperasi: "Koperasi Serba Usaha",
    kategori_usaha: "Agribisnis & Perkebunan",
    nik_koperasi: "1702.03.2024.003",
    alamat_lengkap: "Jl. Pariwisata No. 7, Lebong, Bengkulu",
    kode_pos: "39162",
    koordinat_dibulatkan: "-3.757, 102.267", // ← metadata koordinat_dibulatkan
    koordinat: [-3.757, 102.267],
    modal_awal: "Rp 175.000.000",
    sumber_persetujuan: "Dinas Koperasi Prov. Bengkulu",
    tentang_koperasi:
      "Koperasi berbasis perkebunan sawit dan karet yang melayani petani desa di dataran tinggi Bengkulu.",
  },
  {
    koperasi_ref: "KOP-2024-004",
    nama_koperasi: "Koperasi Desa Sulawesi Bahari",
    status_registrasi: "Aktif",
    bentuk_koperasi: "Koperasi Perikanan",
    kategori_usaha: "Perikanan & Kelautan",
    nik_koperasi: "7501.04.2024.004",
    alamat_lengkap: "Jl. Pantai Indah No. 3, Gorontalo",
    kode_pos: "96115",
    koordinat_dibulatkan: "0.926, 123.108",
    koordinat: [0.926, 123.108],
    modal_awal: "Rp 320.000.000",
    sumber_persetujuan: "Dinas Koperasi Prov. Gorontalo",
    tentang_koperasi:
      "Koperasi nelayan yang mengelola hasil tangkapan, cold storage kolektif, dan distribusi ikan ke pasar regional.",
  },
  {
    koperasi_ref: "KOP-2024-005",
    nama_koperasi: "Koperasi Desa Minang Makmur",
    status_registrasi: "Aktif",
    bentuk_koperasi: "Koperasi Konsumen",
    kategori_usaha: "Perdagangan & UMKM",
    nik_koperasi: "1301.09.2024.005",
    alamat_lengkap:
      "Jl. Raya Padang-Bukittinggi Km 12, Padang Pariaman, Sumatera Barat",
    kode_pos: "25581",
    koordinat_dibulatkan: "-1.993, 101.375",
    koordinat: [-1.993, 101.375],
    modal_awal: "Rp 210.000.000",
    sumber_persetujuan: "Dinas Koperasi Prov. Sumatera Barat",
    tentang_koperasi:
      "Koperasi konsumen yang mendukung UMKM lokal dengan penyediaan bahan pokok, modal kerja, dan pemasaran produk ranah Minang.",
  },
];

/* ── Haversine: jarak km antara dua koordinat ─────────────────────── */
function haversineKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a[0] * Math.PI) / 180) *
      Math.cos((b[0] * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(h));
}

/* ── Page ─────────────────────────────────────────────────────────── */
function CariKoperasiContent() {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref") ?? "";
  const [selected, setSelected] = useState<KoperasiData | null>(null);
  const [search, setSearch] = useState("");
  const [userCoords, setUserCoords] = useState<{
    lat: number;
    long: number;
  } | null>(null);

  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Browser tidak mendukung geolocation.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        });
      },
      () => {
        setGeoError(
          "Izin lokasi ditolak. Aktifkan GPS/lokasi untuk mencari koperasi terdekat.",
        );
      },
      { enableHighAccuracy: true, timeout: 15000 },
    );
  }, []);

  const {
    data: koperasiList = [],
    isLoading,
    isError,
    error,
  } = useCheckLocation({
    lat: userCoords?.lat ?? null,
    long: userCoords?.long ?? null,
  });
  const sorted = useMemo(() => {
    return koperasiList
      .filter((k) =>
        k.nama_koperasi.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
  }, [koperasiList, search]);

  const nearestId = sorted[0]?.koperasi_ref ?? null;

  const registerHref = selected
    ? (() => {
        const params = new URLSearchParams({
          koperasi: selected.koperasi_ref,
          nama: selected.nama_koperasi,
        });
        if (referralCode) params.set("ref", referralCode);
        return `/register?${params.toString()}`;
      })()
    : "/register";

  const handleSelect = (k: KoperasiData) => setSelected(k);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* ── Top header bar ─────────────────────────────────── */}

      <header className="shrink-0 h-14 flex items-center justify-between px-6 bg-inverse-surface border-b border-white/10 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-headline-md font-headline-md text-primary-fixed font-bold">
              SIMPUL
            </span>
            <span className="text-label-xs text-secondary-fixed-dim">
              Merah Putih
            </span>
          </Link>

          {/* Step indicator */}
          <div className="hidden md:flex items-center gap-2 text-label-xs font-label-xs">
            <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px]">
              1
            </span>
            <span className="text-primary-fixed font-semibold">
              Pilih Koperasi
            </span>
            <span className="material-symbols-outlined text-[14px] text-secondary-fixed-dim">
              chevron_right
            </span>
            <span className="w-5 h-5 rounded-full border border-white/20 text-secondary-fixed-dim flex items-center justify-center font-bold text-[10px]">
              2
            </span>
            <span className="text-secondary-fixed-dim">Isi Data Diri</span>
            <span className="material-symbols-outlined text-[14px] text-secondary-fixed-dim">
              chevron_right
            </span>
            <span className="w-5 h-5 rounded-full border border-white/20 text-secondary-fixed-dim flex items-center justify-center font-bold text-[10px]">
              3
            </span>
            <span className="text-secondary-fixed-dim">Review & Kirim</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-label-xs text-secondary-fixed-dim hover:text-white transition-colors"
          >
            ← Kembali
          </Link>
        </div>
      </header>

      {/* ── Body: info panel + map ─────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Left info panel ──────────────────────────────── */}
        <aside className="w-[380px] flex-shrink-0 flex flex-col bg-surface-bg border-r border-outline-variant/30 overflow-hidden">
          {/* Panel header */}
          <div className="p-5 border-b border-outline-variant/30">
            <h1 className="text-headline-md font-headline-md text-on-surface mb-1">
              Pilih Koperasi Terdekat
            </h1>
            <p className="text-body-md text-on-surface-variant text-[13px]">
              Klik marker di peta atau pilih dari daftar berikut.
            </p>

            {/* Search */}
            <div className="relative mt-3">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
                search
              </span>
              <input
                type="text"
                placeholder="Cari nama koperasi…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/50 bg-white text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Koperasi list */}
          <div className="flex-1 overflow-y-auto">
            {/* Loading */}
            {isLoading && (
              <div className="p-6 text-center text-on-surface-variant">
                Mencari koperasi terdekat...
              </div>
            )}
            {/* Geolocation error */}
            {geoError && (
              <div className="m-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {geoError}
              </div>
            )}
            {/* API error */}
            {isError && (
              <div className="m-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {(error as Error)?.message ?? "Gagal memuat data koperasi"}
              </div>
            )}
            {/* Empty */}
            {!isLoading && !isError && sorted.length === 0 && (
              <div className="p-6 text-center text-on-surface-variant">
                Tidak ada koperasi dalam radius 5 km dari lokasi Anda.
              </div>
            )}

            <div className="p-3 space-y-2">
              {sorted.map((k, idx) => {
                const isSelected = selected?.koperasi_ref === k.koperasi_ref;
                const isNearest = k.koperasi_ref === nearestId;
                const dist = k.distance ?? 0;

                return (
                  <button
                    key={k.koperasi_ref}
                    onClick={() => handleSelect(k)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-outline-variant/40 bg-white hover:border-primary/40 hover:bg-primary/[0.03]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Rank number */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-label-xs font-bold flex-shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-primary text-white"
                            : isNearest
                              ? "bg-primary-fixed text-on-primary-fixed-variant"
                              : "bg-surface-container text-on-surface-variant"
                        }`}
                      >
                        {idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p
                            className={`text-label-sm font-label-sm truncate ${isSelected ? "text-primary" : "text-on-surface"}`}
                          >
                            {k.nama_koperasi}
                          </p>
                          {isNearest && (
                            <span className="flex-shrink-0 px-1.5 py-0.5 bg-primary-fixed rounded text-[9px] font-bold text-on-primary-fixed-variant">
                              TERDEKAT
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] text-on-surface-variant truncate">
                          {k.alamat_lengkap}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px] text-primary">
                              straighten
                            </span>
                            {dist < 50
                              ? `${dist.toFixed(1)} km`
                              : `${Math.round(dist)} km`}
                          </span>
                          <span className="text-[11px] text-on-surface-variant">
                            {k.kategori_usaha}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0">
                          check_circle
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Detail panel / CTA ───────────────────────────── */}
          <div className="border-t border-outline-variant/30 bg-white">
            {selected ? (
              <div className="p-5 space-y-4">
                {/* Selected koperasi header */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-inverse-surface flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary-fixed text-[20px]">
                      account_balance
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-label-sm font-label-sm text-on-surface leading-snug">
                      {selected.nama_koperasi}
                    </p>
                    <p className="text-[11px] text-primary mt-0.5">
                      {selected.bentuk_koperasi}
                    </p>
                  </div>
                </div>

                {/* Key fields grid */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "NIK Koperasi", value: selected.nik_koperasi },
                    { label: "Modal Awal", value: selected.modal_awal },
                    { label: "Kategori", value: selected.kategori_usaha },
                    { label: "Status", value: selected.status_registrasi },
                  ].map((d) => (
                    <div
                      key={d.label}
                      className="bg-surface-bg rounded-lg p-2.5"
                    >
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                        {d.label}
                      </p>
                      <p className="text-[12px] font-semibold text-on-surface mt-0.5 truncate">
                        {d.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-surface-bg rounded-lg p-2.5">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">
                    Tentang
                  </p>
                  <p className="text-[12px] text-on-surface-variant leading-relaxed line-clamp-3">
                    {selected.tentang_koperasi}
                  </p>
                </div>

                {/* Sumber persetujuan */}
                <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    verified
                  </span>
                  Disetujui oleh:{" "}
                  <span className="font-semibold text-on-surface">
                    {selected.sumber_persetujuan}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={registerHref}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 transform"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    how_to_reg
                  </span>
                  Daftar ke Koperasi Ini
                </Link>
              </div>
            ) : (
              <div className="p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-surface-bg flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-2xl">
                    touch_app
                  </span>
                </div>
                <p className="text-label-sm font-label-sm text-on-surface mb-1">
                  Pilih Koperasi
                </p>
                <p className="text-[12px] text-on-surface-variant">
                  Klik marker di peta atau pilih dari daftar di atas untuk
                  melihat detail koperasi.
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* ── Map area ────────────────────────────────────────── */}
        <div className="flex-1 relative">
          {/* Map attribution badge */}
          <div className="absolute top-4 left-4 z-[1000] bg-inverse-surface/90 backdrop-blur-sm text-primary-fixed text-[10px] px-3 py-1.5 rounded-full font-semibold tracking-widest uppercase shadow-lg">
            {koperasiList.length} Koperasi Terdaftar
          </div>

          {/* Legend */}
          <div className="absolute top-4 right-4 z-[1000] bg-white rounded-xl border border-outline-variant/30 shadow-lg p-3 min-w-[160px]">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
              Legenda
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-sm"></div>
                <span className="text-[11px] text-on-surface">Koperasi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#3a6b41] border-2 border-white shadow-sm"></div>
                <span className="text-[11px] text-on-surface">Terdekat</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-inverse-surface border-2 border-white shadow-sm"></div>
                <span className="text-[11px] text-on-surface">Dipilih</span>
              </div>
            </div>
          </div>

          {/* Hint tooltip if nothing selected */}
          {!selected && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] bg-inverse-surface/95 text-white text-label-xs font-label-xs px-5 py-3 rounded-full shadow-xl flex items-center gap-2 pointer-events-none">
              <span className="material-symbols-outlined text-primary-fixed text-[16px]">
                info
              </span>
              Klik atau hover marker untuk melihat info koperasi
            </div>
          )}

          <KoperasiMap
            koperasiList={koperasiList}
            selectedId={selected?.koperasi_ref ?? null}
            nearestId={nearestId}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default function CariKoperasiPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-on-surface-variant">
          Memuat peta koperasi…
        </div>
      }
    >
      <CariKoperasiContent />
    </Suspense>
  );
}
