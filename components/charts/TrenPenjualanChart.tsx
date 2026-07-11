"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import KoperasiRefSearchSelect from "@/components/kelayakan/KoperasiRefSearchSelect";
import { useKoperasiTransaksiOptions } from "@/hooks/use-koperasi-transaksi-options";
import {
  buildYearOptions,
  BULAN_OPTIONS,
  useTrenPenjualan,
} from "@/hooks/use-tren-penjualan";

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRupiahShort(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} M`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} jt`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} rb`;
  return String(value);
}

interface TrenPenjualanChartProps {
  variant: "admin" | "member";
  className?: string;
}

export default function TrenPenjualanChart({
  variant,
  className = "",
}: TrenPenjualanChartProps) {
  const now = new Date();
  const [koperasiRef, setKoperasiRef] = useState("");
  const [tahun, setTahun] = useState(now.getFullYear());
  const [bulan, setBulan] = useState(now.getMonth() + 1);

  const {
    data: koperasiOptions = [],
    isLoading: isLoadingOptions,
    isError: isOptionsError,
  } = useKoperasiTransaksiOptions();

  const yearOptions = useMemo(() => buildYearOptions(6), []);

  useEffect(() => {
    if (!koperasiOptions.length || koperasiRef) return;
    setKoperasiRef(koperasiOptions[0].koperasi_ref);
  }, [koperasiOptions, koperasiRef]);

  const bulanFilter = variant === "member" ? bulan : null;

  const { data, isLoading, isError, isFetching } = useTrenPenjualan(
    koperasiRef,
    tahun,
    bulanFilter,
  );

  const chartData = useMemo(
    () =>
      (data?.tren ?? []).map((item) => ({
        label: item.label,
        total: item.total_penjualan,
        transaksi: item.jumlah_transaksi,
      })),
    [data],
  );

  const subtitle = useMemo(() => {
    if (!data) return "";
    if (data.granularity === "harian" && data.bulan) {
      const bulanLabel = BULAN_OPTIONS.find((b) => b.value === data.bulan)?.label;
      return `Harian — ${bulanLabel} ${data.tahun}`;
    }
    return `Bulanan — ${data.tahun}`;
  }, [data]);

  return (
    <div
      className={`bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6 ${className}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-headline-md font-headline-md text-on-surface">
            Tren Penjualan
          </h3>
          <p className="text-sm text-on-surface-variant mt-0.5">
            {subtitle || "Transaksi Paid — agregasi total_pembayaran"}
          </p>
          {data?.nama_koperasi && (
            <p className="text-xs text-primary mt-1 font-medium">{data.nama_koperasi}</p>
          )}
        </div>
        {data && (
          <div className="text-right">
            <p className="text-[10px] uppercase text-on-surface-variant">Total Periode</p>
            <p className="text-lg font-bold text-primary">
              {formatRupiah(data.total_penjualan)}
            </p>
            <p className="text-[10px] text-on-surface-variant">
              {data.total_transaksi} transaksi Paid
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="flex-1 min-w-[220px]">
          <label className="block text-[10px] uppercase text-on-surface-variant mb-1">
            Koperasi
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
        </div>
        <div className="w-28">
          <label className="block text-[10px] uppercase text-on-surface-variant mb-1">
            Tahun
          </label>
          <select
            value={tahun}
            onChange={(e) => setTahun(Number(e.target.value))}
            className="w-full px-3 py-2.5 rounded-xl border border-outline-variant/50 bg-surface-bg text-sm focus:outline-none focus:border-primary"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        {variant === "member" && (
          <div className="w-36">
            <label className="block text-[10px] uppercase text-on-surface-variant mb-1">
              Bulan
            </label>
            <select
              value={bulan}
              onChange={(e) => setBulan(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-outline-variant/50 bg-surface-bg text-sm focus:outline-none focus:border-primary"
            >
              {BULAN_OPTIONS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {!koperasiRef ? (
        <div className="py-16 text-center text-sm text-on-surface-variant">
          Pilih koperasi untuk melihat tren penjualan
        </div>
      ) : isLoading || isFetching ? (
        <div className="py-16 text-center text-sm text-on-surface-variant">
          Memuat tren penjualan...
        </div>
      ) : isError ? (
        <div className="py-12 text-center text-sm text-red-500">
          Gagal memuat tren penjualan. Pastikan Anda sudah login.
        </div>
      ) : (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#bddbc2" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#4b5563" }}
                axisLine={{ stroke: "#bddbc2" }}
                interval={variant === "member" ? "preserveStartEnd" : 0}
              />
              <YAxis
                tickFormatter={formatRupiahShort}
                tick={{ fontSize: 10, fill: "#4b5563" }}
                axisLine={{ stroke: "#bddbc2" }}
                width={48}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.[0]) return null;
                  const d = payload[0].payload as (typeof chartData)[0];
                  return (
                    <div className="bg-white border border-mint-200 rounded-lg px-3 py-2 shadow-md text-xs">
                      <p className="font-semibold text-on-surface">{d.label}</p>
                      <p className="text-primary mt-0.5">{formatRupiah(d.total)}</p>
                      <p className="text-on-surface-variant">{d.transaksi} transaksi</p>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="total"
                name="Penjualan"
                fill="#488451"
                radius={[6, 6, 0, 0]}
                maxBarSize={variant === "member" ? 24 : 40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex items-center gap-2 mt-3 text-[10px] text-on-surface-variant">
        <div className="w-3 h-1.5 rounded-full bg-primary" />
        Total Pembayaran (status: Paid) — sumber: tanggal_dibuat
      </div>
    </div>
  );
}
