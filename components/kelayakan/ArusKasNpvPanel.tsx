"use client";

import { AppIcon } from "@/components/ui/app-icon";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useArusKasNpv } from "@/hooks/use-arus-kas-npv";
import { useKoperasiTransaksiOptions } from "@/hooks/use-koperasi-transaksi-options";
import { buildNpvTahunanRows, isLayakByNpv } from "@/lib/financial-npv";
import KoperasiRefSearchSelect from "./KoperasiRefSearchSelect";

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

interface ArusKasNpvPanelProps {
  compact?: boolean;
  defaultDiscountRate?: number;
}

export default function ArusKasNpvPanel({
  compact = false,
  defaultDiscountRate = 10,
}: ArusKasNpvPanelProps) {
  const [koperasiRef, setKoperasiRef] = useState("");
  const [discountRate, setDiscountRate] = useState(defaultDiscountRate);

  const {
    data: koperasiOptions = [],
    isLoading: isLoadingOptions,
    isError: isOptionsError,
  } = useKoperasiTransaksiOptions();

  const hasSelectedKoperasi = Boolean(koperasiRef.trim());

  const { data, isLoading, isError, error, refetch, isFetching } = useArusKasNpv(
    koperasiRef,
    discountRate,
  );

  const npvTahunan = useMemo(() => {
    if (!data?.npv) return [];
    return buildNpvTahunanRows(data.modal_awal, data.npv.detail_per_tahun);
  }, [data]);

  const chartData = useMemo(
    () =>
      npvTahunan.map((row) => ({
        tahun: String(row.tahun),
        arus_kas: row.arus_kas,
        pv_tahunan: row.discounted,
        npv_kumulatif: row.npv_kumulatif,
      })),
    [npvTahunan],
  );

  const layak = data ? isLayakByNpv(data.npv.nilai) : false;

  const emptyState = (
    <div className="py-10 px-4 text-center rounded-xl bg-surface-bg border border-dashed border-mint-200">
      <AppIcon name="storefront" className="text-4xl text-on-surface-variant/50 mb-2 block" />
      <p className="text-sm font-medium text-on-surface">Pilih koperasi terlebih dahulu</p>
      <p className="text-xs text-on-surface-variant mt-1">
        Ketik <strong>KOP-</strong> lalu pilih koperasi dari daftar untuk memuat analisis NPV
      </p>
    </div>
  );

  const koperasiControls = (
    <div className={`flex flex-wrap items-end gap-4 ${compact ? "flex-col items-stretch" : ""}`}>
      <div className={compact ? "w-full" : "flex-1 min-w-[280px]"}>
        <label className="block text-xs text-on-surface-variant mb-1.5 uppercase">
          Pilih Koperasi
        </label>
        <KoperasiRefSearchSelect
          value={koperasiRef}
          onChange={setKoperasiRef}
          options={koperasiOptions}
          isLoading={isLoadingOptions}
          disabled={isOptionsError}
          defaultQuery="KOP-"
          placeholder="KOP-"
        />
        {isOptionsError && (
          <p className="text-xs text-red-500 mt-1">
            Gagal memuat daftar koperasi dari transaksi penjualan
          </p>
        )}
      </div>
      {!compact && (
        <>
          <div className="w-40">
            <label className="block text-xs text-on-surface-variant mb-1.5 uppercase">
              Discount Rate (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step={0.5}
              value={discountRate}
              onChange={(e) => setDiscountRate(Number(e.target.value) || 0)}
              disabled={!hasSelectedKoperasi}
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface-bg text-sm focus:outline-none focus:border-primary disabled:opacity-60"
            />
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching || !koperasiRef}
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-container disabled:opacity-60"
          >
            {isFetching ? "Memuat..." : "Hitung Ulang"}
          </button>
        </>
      )}
    </div>
  );

  if (compact) {
    return (
      <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <AppIcon name="query_stats" className="text-primary" />
            <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">
              Kelayakan Unit Usaha KDMP
            </h3>
          </div>
          {data && (
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                layak
                  ? "bg-primary-fixed text-on-primary-fixed-variant"
                  : "bg-error-container text-on-error-container"
              }`}
            >
              {layak ? "Layak (NPV > 0)" : "Tidak Layak"}
            </span>
          )}
        </div>

        <div className="p-6 space-y-4">
          {koperasiControls}
          {!hasSelectedKoperasi ? (
            emptyState
          ) : isLoading ? (
            <p className="text-sm text-on-surface-variant">Memuat data arus kas...</p>
          ) : isError ? (
            <p className="text-sm text-red-500">
              {(error as Error)?.message ?? "Gagal memuat data kelayakan keuangan"}
            </p>
          ) : data ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-surface-bg p-4">
                  <p className="text-[10px] uppercase text-on-surface-variant">NPV Total</p>
                  <p className={`text-lg font-bold ${layak ? "text-primary" : "text-red-500"}`}>
                    {formatRupiah(data.npv.nilai)}
                  </p>
                </div>
                <div className="rounded-xl bg-surface-bg p-4">
                  <p className="text-[10px] uppercase text-on-surface-variant">Total Arus Kas</p>
                  <p className="text-lg font-bold text-on-surface">
                    {formatRupiah(data.npv.total_arus_kas)}
                  </p>
                </div>
              </div>
              {npvTahunan.length > 0 && (
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#bddbc2" vertical={false} />
                      <XAxis dataKey="tahun" tick={{ fontSize: 10 }} />
                      <YAxis
                        tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}jt`}
                        tick={{ fontSize: 10 }}
                        width={40}
                      />
                      <Tooltip formatter={(v) => formatRupiah(Number(v))} />
                      <Line
                        type="monotone"
                        dataKey="npv_kumulatif"
                        stroke="#488451"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name="NPV Kumulatif"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              <p className="text-xs text-on-surface-variant">{data.interpretasi}</p>
            </>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
      <div className="px-6 py-5 border-b border-outline-variant/30">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AppIcon name="analytics" className="text-primary" />
              <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">
                Kelayakan Keuangan — Data Riil Transaksi Penjualan
              </h3>
            </div>
            <p className="text-sm text-on-surface-variant max-w-2xl">
              Arus kas dihitung dari transaksi berstatus <strong>Paid</strong>.{" "}
              <strong>Kriteria:</strong> jika NPV &gt; 0, proyek unit usaha KDMP layak dijalankan.
            </p>
          </div>
          {data && (
            <div
              className={`rounded-xl px-5 py-3 text-center min-w-[160px] ${
                layak ? "bg-primary text-white" : "bg-error-container text-on-error-container"
              }`}
            >
              <AppIcon name={layak ? "check_circle" : "cancel"} className="text-2xl block mb-0.5" />
              <p className="font-bold">{layak ? "Layak" : "Tidak Layak"}</p>
              <p className="text-[10px] opacity-80 mt-0.5">NPV {layak ? ">" : "≤"} 0</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {koperasiControls}

        {!hasSelectedKoperasi ? (
          emptyState
        ) : (
          <>
        {isLoading && (
          <div className="py-12 text-center text-on-surface-variant text-sm">
            Menghitung arus kas & NPV...
          </div>
        )}

        {isError && (
          <div className="py-8 px-4 rounded-xl bg-error-container/30 text-on-error-container text-sm">
            Gagal memuat data. Pastikan backend berjalan dan Anda sudah login.
          </div>
        )}

        {data && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Nama Koperasi", value: data.nama_koperasi ?? "—", highlight: false },
                { label: "Modal Awal", value: formatRupiah(data.modal_awal), highlight: false },
                { label: "NPV Total", value: formatRupiah(data.npv.nilai), highlight: true, positive: layak },
                { label: "Total Arus Kas", value: formatRupiah(data.npv.total_arus_kas), highlight: false },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-surface-bg border border-mint-200 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">{s.label}</p>
                  <p
                    className={`text-lg font-bold mt-1 ${
                      s.highlight ? (s.positive ? "text-primary" : "text-red-500") : "text-on-surface"
                    }`}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {npvTahunan.length > 0 ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold mb-3">
                      Arus Kas vs PV Tahunan
                    </p>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#bddbc2" vertical={false} />
                          <XAxis dataKey="tahun" tick={{ fontSize: 12 }} />
                          <YAxis
                            tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)} jt`}
                            tick={{ fontSize: 11 }}
                          />
                          <Tooltip formatter={(v) => formatRupiah(Number(v))} />
                          <Legend />
                          <Bar dataKey="arus_kas" name="Arus Kas" fill="#6b9e72" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="pv_tahunan" name="PV Tahunan (NPV)" fill="#488451" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold mb-3">
                      NPV Kumulatif per Tahun
                    </p>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#bddbc2" vertical={false} />
                          <XAxis dataKey="tahun" tick={{ fontSize: 12 }} />
                          <YAxis
                            tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)} jt`}
                            tick={{ fontSize: 11 }}
                          />
                          <Tooltip formatter={(v) => formatRupiah(Number(v))} />
                          <Line
                            type="monotone"
                            dataKey="npv_kumulatif"
                            stroke="#488451"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: "#488451" }}
                            name="NPV Kumulatif"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-surface-bg border-b border-outline-variant/30">
                        {[
                          "Tahun",
                          "Arus Kas (Paid)",
                          "Periode",
                          "PV Tahunan",
                          "NPV Kumulatif",
                          "Status",
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left text-label-xs font-label-xs text-on-surface-variant uppercase"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-outline-variant/20 bg-primary/[0.03]">
                        <td className="px-4 py-3 font-medium text-on-surface">T=0</td>
                        <td className="px-4 py-3 text-on-surface-variant">—</td>
                        <td className="px-4 py-3 text-on-surface-variant">0</td>
                        <td className="px-4 py-3 text-red-500 font-semibold">
                          -{formatRupiah(data.modal_awal)}
                        </td>
                        <td className="px-4 py-3 font-semibold text-red-500">
                          {formatRupiah(-data.modal_awal)}
                        </td>
                        <td className="px-4 py-3 text-on-surface-variant text-xs">Investasi awal</td>
                      </tr>
                      {npvTahunan.map((row) => (
                        <tr key={row.tahun} className="border-b border-outline-variant/20 hover:bg-primary/[0.02]">
                          <td className="px-4 py-3 font-medium text-on-surface">{row.tahun}</td>
                          <td className="px-4 py-3 text-on-surface">{formatRupiah(row.arus_kas)}</td>
                          <td className="px-4 py-3 text-on-surface-variant">{row.period}</td>
                          <td className="px-4 py-3 text-primary font-semibold">
                            {formatRupiah(row.discounted)}
                          </td>
                          <td
                            className={`px-4 py-3 font-bold ${
                              row.npv_kumulatif >= 0 ? "text-primary" : "text-red-500"
                            }`}
                          >
                            {formatRupiah(row.npv_kumulatif)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                row.npv_kumulatif > 0
                                  ? "bg-primary-fixed text-on-primary-fixed-variant"
                                  : "bg-outline-variant/30 text-on-surface-variant"
                              }`}
                            >
                              {row.npv_kumulatif > 0 ? "Positif" : "Belum positif"}
                            </span>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-surface-bg font-bold">
                        <td className="px-4 py-3" colSpan={3}>
                          NPV Total
                        </td>
                        <td className="px-4 py-3" colSpan={2}>
                          <span className={layak ? "text-primary" : "text-red-500"}>
                            {formatRupiah(data.npv.nilai)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] ${
                              layak
                                ? "bg-primary text-white"
                                : "bg-error-container text-on-error-container"
                            }`}
                          >
                            {layak ? "Layak dijalankan" : "Tidak layak"}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-on-surface-variant text-sm rounded-xl bg-surface-bg border border-mint-200">
                Belum ada transaksi Paid untuk koperasi ini. NPV = {formatRupiah(-data.modal_awal)} (hanya modal awal).
              </div>
            )}

            <p className="text-sm text-on-surface-variant italic">{data.interpretasi}</p>
          </>
        )}
          </>
        )}
      </div>
    </div>
  );
}
