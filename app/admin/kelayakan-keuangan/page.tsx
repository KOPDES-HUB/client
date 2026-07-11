"use client";

import AdminTopBar from "@/components/layout/AdminTopBar";
import ArusKasNpvPanel from "@/components/kelayakan/ArusKasNpvPanel";
import {
  applyBenefitDelay,
  applyCostChange,
  applyRevenueChange,
  applySensitivityScenarios,
  assessFeasibility,
  calculateIRR,
  calculateNPV,
  calculateSwitchingValue,
  proyeksiToCashflowYears,
  type CashflowYear,
} from "@/lib/financial-calculations";
import {
  createEmptyProyeksi,
  DEFAULT_FORM,
  DUMMY_RENCANA_INVESTASI,
  rencanaToFormState,
  type RencanaFormState,
} from "@/lib/dummy-financial-data";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  if (Number.isNaN(value)) return "—";
  return `${value.toFixed(2)}%`;
}

function formatPayback(years: number): string {
  if (!Number.isFinite(years)) return "—";
  if (years > 99) return "> umur proyek";
  return `${years.toFixed(1)} tahun`;
}

const CHART_COLORS = {
  Optimis: "#488451",
  Moderat: "#6b9e72",
  Pesimis: "#9ca3af",
};

export default function AdminKelayakanKeuanganPage() {
  const [form, setForm] = useState<RencanaFormState>(DEFAULT_FORM);
  const [selectedPreset, setSelectedPreset] = useState(
    DUMMY_RENCANA_INVESTASI[0].id,
  );

  const [s1Enabled, setS1Enabled] = useState(false);
  const [s1RevenueChange, setS1RevenueChange] = useState(-20);
  const [s2Enabled, setS2Enabled] = useState(false);
  const [s2CostChange, setS2CostChange] = useState(15);
  const [s3Enabled, setS3Enabled] = useState(false);
  const [s3DelayYears, setS3DelayYears] = useState(1);

  const baseCashflows = useMemo(
    () => proyeksiToCashflowYears(form.proyeksiCashflow),
    [form.proyeksiCashflow],
  );

  const metrics = useMemo(
    () => assessFeasibility(form.modalAwal, baseCashflows, form.discountRate),
    [form.modalAwal, baseCashflows, form.discountRate],
  );

  const switchingRevenue = useMemo(
    () =>
      calculateSwitchingValue(
        form.modalAwal,
        baseCashflows,
        form.discountRate,
        "pendapatan",
      ),
    [form.modalAwal, baseCashflows, form.discountRate],
  );

  const switchingBiaya = useMemo(
    () =>
      calculateSwitchingValue(
        form.modalAwal,
        baseCashflows,
        form.discountRate,
        "biaya",
      ),
    [form.modalAwal, baseCashflows, form.discountRate],
  );

  const scenarioResults = useMemo(() => {
    const build = (label: string, flows: CashflowYear[]) => {
      const m = assessFeasibility(form.modalAwal, flows, form.discountRate);
      return { label, ...m };
    };

    const s1Flows = applyRevenueChange(baseCashflows, s1RevenueChange);
    const s2Flows = applyCostChange(baseCashflows, s2CostChange);
    const s3Flows = applyBenefitDelay(baseCashflows, s3DelayYears);

    return [
      build("Penurunan Pendapatan", s1Flows),
      build("Kenaikan Biaya Ops.", s2Flows),
      build("Keterlambatan Manfaat", s3Flows),
    ];
  }, [
    baseCashflows,
    form.modalAwal,
    form.discountRate,
    s1RevenueChange,
    s2CostChange,
    s3DelayYears,
  ]);

  const activeSensitivityFlows = useMemo(
    () =>
      applySensitivityScenarios(baseCashflows, {
        revenueEnabled: s1Enabled,
        revenueChange: s1RevenueChange,
        costEnabled: s2Enabled,
        costChange: s2CostChange,
        delayEnabled: s3Enabled,
        delayYears: s3DelayYears,
      }),
    [
      baseCashflows,
      s1Enabled,
      s1RevenueChange,
      s2Enabled,
      s2CostChange,
      s3Enabled,
      s3DelayYears,
    ],
  );

  const activeSensitivityMetrics = useMemo(
    () =>
      assessFeasibility(
        form.modalAwal,
        activeSensitivityFlows,
        form.discountRate,
      ),
    [form.modalAwal, activeSensitivityFlows, form.discountRate],
  );

  const comparisonChartData = useMemo(() => {
    const optimistic = applyRevenueChange(baseCashflows, 10);
    const moderate = baseCashflows;
    const pessimistic = applySensitivityScenarios(baseCashflows, {
      revenueEnabled: true,
      revenueChange: -20,
      costEnabled: true,
      costChange: 15,
      delayEnabled: true,
      delayYears: 2,
    });

    return [
      {
        skenario: "Optimis",
        npv: calculateNPV(form.modalAwal, optimistic, form.discountRate),
        irr: calculateIRR(form.modalAwal, optimistic),
      },
      {
        skenario: "Moderat",
        npv: calculateNPV(form.modalAwal, moderate, form.discountRate),
        irr: calculateIRR(form.modalAwal, moderate),
      },
      {
        skenario: "Pesimis",
        npv: calculateNPV(form.modalAwal, pessimistic, form.discountRate),
        irr: calculateIRR(form.modalAwal, pessimistic),
      },
    ];
  }, [baseCashflows, form.modalAwal, form.discountRate]);

  const loadPreset = (id: string) => {
    const preset = DUMMY_RENCANA_INVESTASI.find((r) => r.id === id);
    if (!preset) return;
    setSelectedPreset(id);
    setForm(rencanaToFormState(preset));
    setS1Enabled(false);
    setS2Enabled(false);
    setS3Enabled(false);
  };

  const updateUmurProyek = (umur: number) => {
    const clamped = Math.max(1, Math.min(20, umur));
    setForm((prev) => {
      const next = createEmptyProyeksi(clamped);
      prev.proyeksiCashflow.forEach((row, i) => {
        if (i < clamped) next[i] = { ...row, tahun: i + 1 };
      });
      return { ...prev, umurProyek: clamped, proyeksiCashflow: next };
    });
  };

  const updateCashflow = (
    index: number,
    field: "pendapatan" | "biayaOperasional",
    value: number,
  ) => {
    setForm((prev) => ({
      ...prev,
      proyeksiCashflow: prev.proyeksiCashflow.map((row, i) =>
        i === index ? { ...row, [field]: value } : row,
      ),
    }));
  };

  const anyScenarioActive = s1Enabled || s2Enabled || s3Enabled;
  const displayMetrics = anyScenarioActive ? activeSensitivityMetrics : metrics;

  return (
    <>
      <AdminTopBar title="Analisis Kelayakan Keuangan" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Data riil dari API transaksi penjualan */}
        <ArusKasNpvPanel />

        <div className="border-t border-mint-200 pt-2">
          <p className="text-label-sm font-label-sm text-on-surface-variant mb-6">
            Simulasi proyeksi manual (dummy) — bandingkan dengan data riil di atas
          </p>
        </div>

        {/* Preset selector */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-label-sm font-label-sm text-on-surface font-semibold">
              Rencana Investasi
            </p>
            <p className="text-sm text-on-surface-variant mt-0.5">
              Pilih contoh dummy atau sesuaikan input untuk simulasi real-time.
            </p>
          </div>
          <select
            value={selectedPreset}
            onChange={(e) => loadPreset(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-mint-200 bg-surface-card text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary min-w-[280px]"
          >
            {DUMMY_RENCANA_INVESTASI.map((r) => (
              <option key={r.id} value={r.id}>
                {r.namaProyek}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Input */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-surface-card rounded-2xl border border-mint-200 p-6 shadow-md space-y-5">
              <h3 className="text-label-sm font-label-sm text-on-surface font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  edit_note
                </span>
                Form Input Rencana Investasi
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs  mb-1.5">
                    Nama Proyek / Unit Usaha
                  </label>
                  <input
                    type="text"
                    value={form.namaProyek}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, namaProyek: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface-bg text-sm text-on-surface-variant text-zinc-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Contoh: Alat Pengolahan Pasca-Panen"
                  />
                </div>
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1.5">
                    Modal Awal (Rp)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.modalAwal}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        modalAwal: Number(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface-bg text-sm text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1.5">
                    Umur Proyek (tahun)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={form.umurProyek}
                    onChange={(e) =>
                      updateUmurProyek(Number(e.target.value) || 1)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface-bg text-sm text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1.5">
                    Discount Rate / Cost of Capital (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={form.discountRate}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        discountRate: Number(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface-bg text-sm text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs text-on-surface-variant mb-3 uppercase tracking-wider font-semibold">
                  Proyeksi Cashflow per Tahun
                </p>
                <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-surface-bg border-b border-outline-variant/30">
                        <th className="px-4 py-3 text-left text-label-xs font-label-xs text-on-surface-variant uppercase">
                          Tahun
                        </th>
                        <th className="px-4 py-3 text-left text-label-xs font-label-xs text-on-surface-variant uppercase">
                          Pendapatan (Rp)
                        </th>
                        <th className="px-4 py-3 text-left text-label-xs font-label-xs text-on-surface-variant uppercase">
                          Biaya Operasional (Rp)
                        </th>
                        <th className="px-4 py-3 text-right text-label-xs font-label-xs text-on-surface-variant uppercase">
                          Net Cashflow
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.proyeksiCashflow.map((row, i) => {
                        const net = row.pendapatan - row.biayaOperasional;
                        return (
                          <tr
                            key={row.tahun}
                            className="border-b border-outline-variant/20 hover:bg-primary/[0.02]"
                          >
                            <td className="px-4 py-3 font-medium text-on-surface">
                              Tahun {row.tahun}
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                min={0}
                                value={row.pendapatan}
                                onChange={(e) =>
                                  updateCashflow(
                                    i,
                                    "pendapatan",
                                    Number(e.target.value) || 0,
                                  )
                                }
                                className="w-full px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-white text-sm text-on-surface-variant focus:outline-none focus:border-primary"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                min={0}
                                value={row.biayaOperasional}
                                onChange={(e) =>
                                  updateCashflow(
                                    i,
                                    "biayaOperasional",
                                    Number(e.target.value) || 0,
                                  )
                                }
                                className="w-full px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-white text-sm text-on-surface-variant focus:outline-none focus:border-primary"
                              />
                            </td>
                            <td
                              className={`px-4 py-3 text-right font-semibold ${
                                net >= 0 ? "text-primary" : "text-red-500"
                              }`}
                            >
                              {formatRupiah(net)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sensitivity Analysis */}
            <div className="bg-surface-card rounded-2xl border border-mint-200 p-6 shadow-md space-y-5">
              <h3 className="text-label-sm font-label-sm text-on-surface font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  tune
                </span>
                Analisis Sensitivitas
              </h3>

              <div className="space-y-4">
                {/* Scenario 1 */}
                <div className="rounded-xl border border-outline-variant/30 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-on-surface">
                        Skenario 1: Penurunan Pendapatan
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Simulasi penurunan pendapatan tahunan
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setS1Enabled((v) => !v)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        s1Enabled ? "bg-primary" : "bg-outline-variant/60"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          s1Enabled ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={-50}
                      max={0}
                      step={1}
                      value={s1RevenueChange}
                      onChange={(e) =>
                        setS1RevenueChange(Number(e.target.value))
                      }
                      className="flex-1 accent-primary"
                    />
                    <span className="text-sm font-bold text-on-surface w-16 text-right">
                      {s1RevenueChange}%
                    </span>
                  </div>
                  {s1Enabled && (
                    <div className="flex gap-4 text-xs pt-1">
                      <span>
                        NPV:{" "}
                        <strong>{formatRupiah(scenarioResults[0].npv)}</strong>
                      </span>
                      <span>
                        IRR:{" "}
                        <strong>{formatPercent(scenarioResults[0].irr)}</strong>
                      </span>
                      <span
                        className={
                          scenarioResults[0].layak
                            ? "text-primary font-semibold"
                            : "text-on-surface-variant"
                        }
                      >
                        {scenarioResults[0].layak ? "Layak" : "Tidak Layak"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Scenario 2 */}
                <div className="rounded-xl border border-outline-variant/30 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-on-surface">
                        Skenario 2: Kenaikan Biaya Operasional
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Simulasi kenaikan biaya operasional
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setS2Enabled((v) => !v)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        s2Enabled ? "bg-primary" : "bg-outline-variant/60"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          s2Enabled ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={0}
                      max={50}
                      step={1}
                      value={s2CostChange}
                      onChange={(e) => setS2CostChange(Number(e.target.value))}
                      className="flex-1 accent-primary"
                    />
                    <span className="text-sm font-bold text-on-surface w-16 text-right">
                      +{s2CostChange}%
                    </span>
                  </div>
                  {s2Enabled && (
                    <div className="flex gap-4 text-xs pt-1">
                      <span>
                        NPV:{" "}
                        <strong>{formatRupiah(scenarioResults[1].npv)}</strong>
                      </span>
                      <span>
                        IRR:{" "}
                        <strong>{formatPercent(scenarioResults[1].irr)}</strong>
                      </span>
                      <span
                        className={
                          scenarioResults[1].layak
                            ? "text-primary font-semibold"
                            : "text-on-surface-variant"
                        }
                      >
                        {scenarioResults[1].layak ? "Layak" : "Tidak Layak"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Scenario 3 */}
                <div className="rounded-xl border border-outline-variant/30 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-on-surface">
                        Skenario 3: Keterlambatan Realisasi Manfaat
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Pendapatan tertunda, biaya operasional tetap berjalan
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setS3Enabled((v) => !v)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        s3Enabled ? "bg-primary" : "bg-outline-variant/60"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          s3Enabled ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  <select
                    value={s3DelayYears}
                    onChange={(e) => setS3DelayYears(Number(e.target.value))}
                    className="px-4 py-2 rounded-lg border border-outline-variant/40 bg-surface-bg text-sm focus:outline-none focus:border-primary"
                  >
                    <option value={1}>Tunda 1 tahun</option>
                    <option value={2}>Tunda 2 tahun</option>
                  </select>
                  {s3Enabled && (
                    <div className="flex gap-4 text-xs pt-1">
                      <span>
                        NPV:{" "}
                        <strong>{formatRupiah(scenarioResults[2].npv)}</strong>
                      </span>
                      <span>
                        IRR:{" "}
                        <strong>{formatPercent(scenarioResults[2].irr)}</strong>
                      </span>
                      <span
                        className={
                          scenarioResults[2].layak
                            ? "text-primary font-semibold"
                            : "text-on-surface-variant"
                        }
                      >
                        {scenarioResults[2].layak ? "Layak" : "Tidak Layak"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Switching Value */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl bg-surface-bg border border-mint-200 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-on-surface-variant mb-1">
                    Switching Value — Pendapatan
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {switchingRevenue.toFixed(1)}%
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Penurunan maksimum sebelum NPV = 0
                  </p>
                </div>
                <div className="rounded-xl bg-surface-bg border border-mint-200 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-on-surface-variant mb-1">
                    Switching Value — Biaya
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {switchingBiaya.toFixed(1)}%
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Kenaikan maksimum sebelum NPV = 0
                  </p>
                </div>
              </div>

              {/* Comparison Chart */}
              <div className="pt-2">
                <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-4">
                  Perbandingan NPV — Optimis / Moderat / Pesimis
                </p>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={comparisonChartData}
                      margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#bddbc2"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="skenario"
                        tick={{ fontSize: 12, fill: "#4b5563" }}
                        axisLine={{ stroke: "#bddbc2" }}
                      />
                      <YAxis
                        tickFormatter={(v) =>
                          `${(v / 1_000_000).toFixed(0)} jt`
                        }
                        tick={{ fontSize: 11, fill: "#4b5563" }}
                        axisLine={{ stroke: "#bddbc2" }}
                      />
                      <Tooltip
                        formatter={(value) => [
                          formatRupiah(Number(value)),
                          "NPV",
                        ]}
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #bddbc2",
                          fontSize: 13,
                        }}
                      />
                      <Bar dataKey="npv" radius={[8, 8, 0, 0]}>
                        {comparisonChartData.map((entry) => (
                          <Cell
                            key={entry.skenario}
                            fill={
                              CHART_COLORS[
                                entry.skenario as keyof typeof CHART_COLORS
                              ]
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="space-y-4">
            <div
              className={`rounded-2xl p-5 text-center shadow-md ${
                displayMetrics.layak
                  ? "bg-primary text-white"
                  : "bg-outline-variant/30 text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-[28px] mb-1 block">
                {displayMetrics.layak ? "check_circle" : "cancel"}
              </span>
              <p className="text-lg font-bold">
                {displayMetrics.layak ? "Layak" : "Tidak Layak"}
              </p>
              <p className="text-xs opacity-80 mt-1">
                {anyScenarioActive
                  ? "Hasil dengan skenario sensitivitas aktif"
                  : "NPV > 0, IRR > discount rate, BCR > 1"}
              </p>
            </div>

            {[
              {
                label: "NPV",
                value: formatRupiah(displayMetrics.npv),
                sub: "Net Present Value",
                icon: "account_balance",
                highlight: displayMetrics.npv > 0,
              },
              {
                label: "IRR",
                value: formatPercent(displayMetrics.irr),
                sub: `vs discount rate ${form.discountRate}%`,
                icon: "trending_up",
                highlight:
                  !Number.isNaN(displayMetrics.irr) &&
                  displayMetrics.irr > form.discountRate,
              },
              {
                label: "Payback Period",
                value: formatPayback(displayMetrics.paybackPeriod),
                sub: "Waktu balik modal",
                icon: "schedule",
                highlight: displayMetrics.paybackPeriod <= form.umurProyek,
              },
              {
                label: "BCR",
                value: displayMetrics.bcr.toFixed(2),
                sub: "Benefit-Cost Ratio",
                icon: "balance",
                highlight: displayMetrics.bcr > 1,
              },
            ].map((m) => (
              <div
                key={m.label}
                className="bg-surface-card rounded-2xl border border-mint-200 p-5 shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      m.highlight ? "bg-primary/10" : "bg-surface-bg"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        m.highlight ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      {m.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-on-surface-variant">
                      {m.label}
                    </p>
                    <p
                      className={`text-xl font-bold mt-0.5 ${
                        m.highlight ? "text-primary" : "text-on-surface"
                      }`}
                    >
                      {m.value}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {m.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
