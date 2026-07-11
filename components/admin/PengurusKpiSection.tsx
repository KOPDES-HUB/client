"use client";

import { AppIcon } from "@/components/ui/app-icon";
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
import {
  DUMMY_KPI_PENGURUS,
  formatKpiValue,
  getKpiValue,
  KPI_METRICS,
  kpiScorePercent,
  type KpiMetricKey,
  type KpiPengurus,
} from "@/lib/admin/kpi-pengurus";

const BAR_COLORS = ["#488451", "#6b9e72", "#2c6848", "#7a9e6a"];

function shortName(nama: string): string {
  return nama.split(" ")[0];
}

function MetricBarChart({
  metricKey,
  pengurusList,
  highlightId,
}: {
  metricKey: KpiMetricKey;
  pengurusList: KpiPengurus[];
  highlightId: string | null;
}) {
  const metric = KPI_METRICS.find((m) => m.key === metricKey)!;

  const chartData = pengurusList.map((p) => {
    const raw = getKpiValue(p, metricKey);
    const score =
      metricKey === "taskKader"
        ? kpiScorePercent(metricKey, raw, p)
        : kpiScorePercent(metricKey, raw);
    return {
      nama: shortName(p.nama),
      fullName: p.nama,
      raw,
      score,
      pengurusId: p.id,
      label:
        metricKey === "taskKader"
          ? `${p.taskKaderSelesai}/${p.taskKaderTarget}`
          : formatKpiValue(metricKey, raw),
    };
  });

  return (
    <div className="bg-surface-bg rounded-xl border border-mint-200/60 p-4">
      <div className="flex items-start gap-2 mb-3">
        <AppIcon name={metric.icon} className="text-primary text-[18px] mt-0.5" />
        <div className="min-w-0">
          <p className="text-label-sm font-label-sm text-on-surface font-semibold leading-tight">
            {metric.label}
          </p>
          <p className="text-[10px] text-on-surface-variant mt-0.5 line-clamp-2">
            {metric.description}
          </p>
        </div>
      </div>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#bddbc2" vertical={false} />
            <XAxis
              dataKey="nama"
              tick={{ fontSize: 11, fill: "#4b5563" }}
              axisLine={{ stroke: "#bddbc2" }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "#4b5563" }}
              axisLine={{ stroke: "#bddbc2" }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const d = payload[0].payload as (typeof chartData)[0];
                return (
                  <div className="bg-white border border-mint-200 rounded-lg px-3 py-2 shadow-md text-xs">
                    <p className="font-semibold text-on-surface">{d.fullName}</p>
                    <p className="text-primary mt-0.5">{d.label}</p>
                    <p className="text-on-surface-variant">Skor: {d.score}%</p>
                  </div>
                );
              }}
            />
            <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {chartData.map((entry, i) => (
                <Cell
                  key={entry.pengurusId}
                  fill={
                    highlightId && entry.pengurusId !== highlightId
                      ? "#bddbc2"
                      : BAR_COLORS[i % BAR_COLORS.length]
                  }
                  opacity={highlightId && entry.pengurusId !== highlightId ? 0.45 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PengurusDetailCard({ pengurus }: { pengurus: KpiPengurus }) {
  const rows = KPI_METRICS.map((m) => {
    const raw = getKpiValue(pengurus, m.key);
    const score = kpiScorePercent(m.key, raw, pengurus);
    return { ...m, raw, score };
  });

  const avgScore = Math.round(rows.reduce((s, r) => s + r.score, 0) / rows.length);

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-headline-md font-headline-md text-on-surface">{pengurus.nama}</p>
          <p className="text-sm text-on-surface-variant">{pengurus.jabatan}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase text-on-surface-variant">Skor KPI Rata-rata</p>
          <p className="text-2xl font-bold text-primary">{avgScore}%</p>
        </div>
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center gap-3">
            <AppIcon name={r.icon} className="text-primary text-[16px] w-5" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-on-surface-variant truncate pr-2">{r.shortLabel}</span>
                <span className="font-semibold text-on-surface shrink-0">
                  {r.key === "taskKader"
                    ? `${pengurus.taskKaderSelesai}/${pengurus.taskKaderTarget}`
                    : formatKpiValue(r.key, r.raw)}
                </span>
              </div>
              <div className="h-1.5 bg-mint-200/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${r.score}%` }}
                />
              </div>
            </div>
            <span className="text-[10px] font-bold text-primary w-8 text-right">{r.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PengurusKpiSection() {
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const selected = useMemo(
    () => DUMMY_KPI_PENGURUS.find((p) => p.id === highlightId) ?? null,
    [highlightId],
  );

  const ranking = useMemo(() => {
    return [...DUMMY_KPI_PENGURUS]
      .map((p) => {
        const scores = KPI_METRICS.map((m) =>
          kpiScorePercent(m.key, getKpiValue(p, m.key), p),
        );
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        return { ...p, avgScore: avg };
      })
      .sort((a, b) => b.avgScore - a.avgScore);
  }, []);

  return (
    <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AppIcon name="leaderboard" className="text-primary" />
            <h3 className="text-headline-md font-headline-md text-on-surface">
              Evaluasi KPI Pengurus
            </h3>
          </div>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Perbandingan kinerja berdasarkan absensi e-RAT & e-Voting, intensitas pembelian,
            task kader, total poin, ketepatan simpanan wajib, dan referral anggota.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setHighlightId(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              !highlightId
                ? "bg-primary text-white"
                : "bg-surface-bg text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Semua
          </button>
          {DUMMY_KPI_PENGURUS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setHighlightId(p.id === highlightId ? null : p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                highlightId === p.id
                  ? "bg-primary text-white"
                  : "bg-surface-bg text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {shortName(p.nama)}
            </button>
          ))}
        </div>
      </div>

      {selected && <PengurusDetailCard pengurus={selected} />}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {KPI_METRICS.map((m) => (
          <MetricBarChart
            key={m.key}
            metricKey={m.key}
            pengurusList={DUMMY_KPI_PENGURUS}
            highlightId={highlightId}
          />
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-surface-bg border-b border-outline-variant/30">
              <th className="px-4 py-3 text-left text-label-xs font-label-xs text-on-surface-variant uppercase">
                Pengurus
              </th>
              {KPI_METRICS.map((m) => (
                <th
                  key={m.key}
                  className="px-3 py-3 text-center text-label-xs font-label-xs text-on-surface-variant uppercase whitespace-nowrap"
                >
                  {m.shortLabel}
                </th>
              ))}
              <th className="px-4 py-3 text-center text-label-xs font-label-xs text-on-surface-variant uppercase">
                Rata-rata
              </th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((p, idx) => (
              <tr
                key={p.id}
                className={`border-b border-outline-variant/20 hover:bg-primary/2 cursor-pointer transition-colors ${
                  highlightId === p.id ? "bg-primary/5" : ""
                }`}
                onClick={() => setHighlightId(p.id === highlightId ? null : p.id)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-on-surface-variant w-4">
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-on-surface">{p.nama}</p>
                      <p className="text-[10px] text-on-surface-variant">{p.jabatan}</p>
                    </div>
                  </div>
                </td>
                {KPI_METRICS.map((m) => {
                  const raw = getKpiValue(p, m.key);
                  const score = kpiScorePercent(m.key, raw, p);
                  return (
                    <td key={m.key} className="px-3 py-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          score >= 90
                            ? "bg-primary-fixed text-on-primary-fixed-variant"
                            : score >= 75
                              ? "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                              : "bg-error-container/40 text-on-error-container"
                        }`}
                      >
                        {m.key === "taskKader"
                          ? `${p.taskKaderSelesai}/${p.taskKaderTarget}`
                          : formatKpiValue(m.key, raw)}
                      </span>
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-center">
                  <span className="font-bold text-primary">{p.avgScore}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
