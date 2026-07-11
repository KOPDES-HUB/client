"use client";

import AdminTopBar from "@/components/layout/AdminTopBar";
import { useState } from "react";

// ── Dummy aggregated data ──────────────────────────────────────────────────

const USIA_GROUPS = [
  { label: "< 25 th",   count: 48,  lms: 21, voting: 15, rat: 10, transaksi: 38 },
  { label: "25–35 th",  count: 112, lms: 89, voting: 74, rat: 62, transaksi: 104 },
  { label: "36–45 th",  count: 87,  lms: 61, voting: 58, rat: 52, transaksi: 79 },
  { label: "46–55 th",  count: 74,  lms: 32, voting: 41, rat: 49, transaksi: 55 },
  { label: "> 55 th",   count: 36,  lms: 4,  voting: 12, rat: 28, transaksi: 18 },
];

const WILAYAH_DATA = [
  { dusun: "Dusun Mekar Jaya",  anggota: 68,  lms: 51, voting: 43, rat: 38, transaksi: 62 },
  { dusun: "Dusun Sumber Asri", anggota: 54,  lms: 38, voting: 29, rat: 24, transaksi: 47 },
  { dusun: "Dusun Harapan",     anggota: 91,  lms: 72, voting: 68, rat: 55, transaksi: 84 },
  { dusun: "Dusun Bakti",       anggota: 43,  lms: 18, voting: 22, rat: 31, transaksi: 30 },
  { dusun: "Dusun Subur",       anggota: 101, lms: 88, voting: 79, rat: 71, transaksi: 95 },
];

const TOP_AKTIF = [
  { nama: "Budi Setiawan",   id: "SMP-001", dusun: "Harapan",    usia: 32, lms: 8, voting: 5, rat: 2, transaksi: 24, skor: 94 },
  { nama: "Siti Rahayu",     id: "SMP-002", dusun: "Subur",      usia: 28, lms: 8, voting: 5, rat: 2, transaksi: 20, skor: 91 },
  { nama: "Ahmad Fauzan",    id: "SMP-003", dusun: "Mekar Jaya", usia: 35, lms: 7, voting: 4, rat: 2, transaksi: 18, skor: 85 },
  { nama: "Dewi Kusuma",     id: "SMP-004", dusun: "Subur",      usia: 29, lms: 6, voting: 5, rat: 2, transaksi: 15, skor: 82 },
  { nama: "Eko Prasetyo",    id: "SMP-005", dusun: "Harapan",    usia: 41, lms: 5, voting: 4, rat: 2, transaksi: 12, skor: 78 },
];

const BOTTOM_PASIF = [
  { nama: "Karno Sutrisno",  id: "SMP-087", dusun: "Bakti",       usia: 62, lms: 0, voting: 0, rat: 0, transaksi: 1, skor: 5 },
  { nama: "Mbok Sari",       id: "SMP-093", dusun: "Sumber Asri", usia: 58, lms: 0, voting: 0, rat: 1, transaksi: 2, skor: 8 },
  { nama: "Pak Wagimin",     id: "SMP-055", dusun: "Bakti",       usia: 67, lms: 0, voting: 1, rat: 0, transaksi: 0, skor: 10 },
  { nama: "Lastri Wahyuni",  id: "SMP-102", dusun: "Sumber Asri", usia: 24, lms: 1, voting: 0, rat: 0, transaksi: 3, skor: 14 },
  { nama: "Rusman Hadi",     id: "SMP-071", dusun: "Mekar Jaya",  usia: 55, lms: 0, voting: 1, rat: 1, transaksi: 1, skor: 16 },
];

type MetricKey = "lms" | "voting" | "rat" | "transaksi";

const METRIC_LABELS: Record<MetricKey, string> = {
  lms: "LMS Selesai", voting: "Voting", rat: "Hadir RAT", transaksi: "Transaksi",
};

const METRIC_COLORS: Record<MetricKey, string> = {
  lms: "bg-primary", voting: "bg-tertiary-fixed", rat: "bg-secondary-container", transaksi: "bg-mint-200",
};

function BarChart({
  data, keyField, valueFields, maxVal,
}: {
  data: { label?: string; dusun?: string; count?: number; anggota?: number; [key: string]: number | string | undefined }[];
  keyField: string;
  valueFields: MetricKey[];
  maxVal: number;
}) {
  return (
    <div className="space-y-4">
      {data.map((row) => {
        const key = (row[keyField] as string) ?? "";
        const total = (row.count ?? row.anggota ?? 0) as number;
        return (
          <div key={key}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-on-surface font-medium">{key}</span>
              <span className="text-xs text-on-surface-variant">{total} anggota</span>
            </div>
            <div className="flex flex-col gap-1">
              {valueFields.map((vf) => {
                const val = (row[vf] ?? 0) as number;
                const pct = Math.round((val / Math.max(total, 1)) * 100);
                return (
                  <div key={vf} className="flex items-center gap-2">
                    <span className="w-24 text-xs text-on-surface-variant text-right">{METRIC_LABELS[vf]}</span>
                    <div className="flex-1 h-5 bg-surface-bg rounded-full overflow-hidden">
                      <div
                        className={`h-full ${METRIC_COLORS[vf]} rounded-full transition-all duration-700`}
                        style={{ width: `${(val / maxVal) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-on-surface w-16">{val} ({pct}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminPartisipasiPage() {
  const [dimension, setDimension] = useState<"usia" | "wilayah">("usia");
  const [activeMetrics, setActiveMetrics] = useState<MetricKey[]>(["lms", "voting", "rat", "transaksi"]);

  const toggleMetric = (m: MetricKey) =>
    setActiveMetrics((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );

  const chartData = dimension === "usia" ? USIA_GROUPS : WILAYAH_DATA;
  const chartKeyField = dimension === "usia" ? "label" : "dusun";
  const maxVal = dimension === "usia"
    ? Math.max(...USIA_GROUPS.map((g) => g.count))
    : Math.max(...WILAYAH_DATA.map((g) => g.anggota));

  const totalAnggota = USIA_GROUPS.reduce((s, g) => s + g.count, 0);
  const avgPartisipasi = Math.round(
    USIA_GROUPS.reduce((s, g) => s + ((g.lms + g.voting + g.rat + g.transaksi) / (g.count * 4)) * 100, 0) / USIA_GROUPS.length
  );
  const pasifCount = USIA_GROUPS.filter((g) => g.label.includes("55")).reduce((s, g) => s + g.count, 0);

  return (
    <>
      <AdminTopBar title="Peta Partisipasi" />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-8">
        {/* Insight banner — jawab challenge question */}
        <div className="bg-inverse-surface rounded-2xl p-6 grid grid-cols-3 gap-6 text-primary-fixed">
          <div>
            <p className="text-[11px] text-secondary-fixed-dim uppercase tracking-wider mb-1">Total Anggota</p>
            <p className="text-3xl font-bold">{totalAnggota}</p>
          </div>
          <div>
            <p className="text-[11px] text-secondary-fixed-dim uppercase tracking-wider mb-1">Rata-rata Partisipasi</p>
            <p className="text-3xl font-bold">{avgPartisipasi}%</p>
            <p className="text-xs text-secondary-fixed-dim mt-0.5">lintas semua modul</p>
          </div>
          <div>
            <p className="text-[11px] text-secondary-fixed-dim uppercase tracking-wider mb-1">⚠ Kelompok Risiko Rendah</p>
            <p className="text-3xl font-bold text-red-300">&gt; 55 th</p>
            <p className="text-xs text-secondary-fixed-dim mt-0.5">{pasifCount} anggota perlu pendampingan Kader</p>
          </div>
        </div>

        {/* Chart controls */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex bg-surface-card border border-mint-200 rounded-xl p-1 gap-1">
            <button
              onClick={() => setDimension("usia")}
              className={`px-4 py-2 rounded-lg text-label-xs font-label-xs transition-all ${
                dimension === "usia" ? "bg-primary text-white" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Kelompok Usia
            </button>
            <button
              onClick={() => setDimension("wilayah")}
              className={`px-4 py-2 rounded-lg text-label-xs font-label-xs transition-all ${
                dimension === "wilayah" ? "bg-primary text-white" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Per Wilayah/Dusun
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {(Object.entries(METRIC_LABELS) as [MetricKey, string][]).map(([k, l]) => (
              <button
                key={k}
                onClick={() => toggleMetric(k)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                  activeMetrics.includes(k)
                    ? "bg-primary text-white border-primary"
                    : "border-outline-variant/50 text-on-surface-variant"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${METRIC_COLORS[k]}`}></span>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
          <h3 className="text-label-sm font-label-sm text-on-surface font-semibold mb-6">
            Partisipasi per {dimension === "usia" ? "Kelompok Usia" : "Wilayah/Dusun"}
          </h3>
          {activeMetrics.length > 0 ? (
            <BarChart data={chartData} keyField={chartKeyField} valueFields={activeMetrics} maxVal={maxVal} />
          ) : (
            <p className="text-sm text-on-surface-variant text-center py-8">Pilih minimal satu modul di filter atas.</p>
          )}
        </div>

        {/* Heatmap-like grid — partisipasi rate */}
        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
          <h3 className="text-label-sm font-label-sm text-on-surface font-semibold mb-4">
            Heatmap Tingkat Partisipasi (%) per Usia × Modul
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs text-on-surface-variant">Usia</th>
                  {(Object.entries(METRIC_LABELS) as [MetricKey, string][]).map(([k, l]) => (
                    <th key={k} className="px-4 py-2 text-center text-xs text-on-surface-variant">{l}</th>
                  ))}
                  <th className="px-4 py-2 text-center text-xs text-on-surface-variant font-bold">Avg</th>
                </tr>
              </thead>
              <tbody>
                {USIA_GROUPS.map((g) => {
                  const metrics: MetricKey[] = ["lms", "voting", "rat", "transaksi"];
                  const rates = metrics.map((m) => Math.round((g[m] / g.count) * 100));
                  const avg = Math.round(rates.reduce((s, r) => s + r, 0) / rates.length);

                  return (
                    <tr key={g.label} className="border-t border-outline-variant/20">
                      <td className="px-4 py-3 text-sm font-medium text-on-surface">{g.label}</td>
                      {rates.map((r, i) => {
                        const intensity = r < 30 ? "bg-red-100 text-red-700" : r < 60 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700";
                        return (
                          <td key={i} className="px-4 py-3 text-center">
                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${intensity}`}>{r}%</span>
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${avg < 30 ? "bg-red-200 text-red-800" : avg < 60 ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>
                          {avg}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 mt-4 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100"></span> &lt; 30% (Rendah)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-100"></span> 30–60% (Sedang)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-100"></span> &gt; 60% (Tinggi)</span>
          </div>
        </div>

        {/* Ranking tables */}
        <div className="grid grid-cols-2 gap-6">
          {/* Top aktif */}
          <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">emoji_events</span>
              <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">5 Anggota Paling Aktif</h3>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg">
                  <th className="px-5 py-2.5 text-left text-xs text-on-surface-variant">#</th>
                  <th className="px-5 py-2.5 text-left text-xs text-on-surface-variant">Nama</th>
                  <th className="px-5 py-2.5 text-left text-xs text-on-surface-variant">Usia</th>
                  <th className="px-5 py-2.5 text-left text-xs text-on-surface-variant">Dusun</th>
                  <th className="px-5 py-2.5 text-center text-xs text-on-surface-variant">Skor</th>
                </tr>
              </thead>
              <tbody>
                {TOP_AKTIF.map((a, i) => (
                  <tr key={a.id} className="border-t border-outline-variant/20 hover:bg-primary/[0.02]">
                    <td className="px-5 py-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        i === 0 ? "bg-yellow-100 text-yellow-700" : i === 1 ? "bg-gray-100 text-gray-600" : i === 2 ? "bg-orange-100 text-orange-600" : "bg-surface-bg text-on-surface-variant"
                      }`}>{i + 1}</span>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-sm font-semibold text-on-surface">{a.nama}</p>
                      <p className="text-xs text-on-surface-variant">{a.id}</p>
                    </td>
                    <td className="px-5 py-3 text-sm text-on-surface-variant">{a.usia} th</td>
                    <td className="px-5 py-3 text-sm text-on-surface-variant">{a.dusun}</td>
                    <td className="px-5 py-3 text-center">
                      <span className="bg-primary/10 text-primary font-bold text-sm px-2 py-0.5 rounded-full">{a.skor}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom pasif */}
          <div className="bg-surface-card rounded-2xl border border-outline-variant/30 shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-400">warning</span>
              <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">5 Anggota Paling Pasif (Perlu Follow-up)</h3>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg">
                  <th className="px-5 py-2.5 text-left text-xs text-on-surface-variant">Nama</th>
                  <th className="px-5 py-2.5 text-left text-xs text-on-surface-variant">Usia</th>
                  <th className="px-5 py-2.5 text-left text-xs text-on-surface-variant">Dusun</th>
                  <th className="px-5 py-2.5 text-center text-xs text-on-surface-variant">Skor</th>
                  <th className="px-5 py-2.5 text-center text-xs text-on-surface-variant">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {BOTTOM_PASIF.map((a) => (
                  <tr key={a.id} className="border-t border-outline-variant/20 hover:bg-red-50/50">
                    <td className="px-5 py-3">
                      <p className="text-sm font-semibold text-on-surface">{a.nama}</p>
                      <p className="text-xs text-on-surface-variant">{a.id}</p>
                    </td>
                    <td className="px-5 py-3 text-sm text-on-surface-variant">{a.usia} th</td>
                    <td className="px-5 py-3 text-sm text-on-surface-variant">{a.dusun}</td>
                    <td className="px-5 py-3 text-center">
                      <span className="bg-red-100 text-red-700 font-bold text-sm px-2 py-0.5 rounded-full">{a.skor}</span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <button className="text-xs text-primary hover:underline font-medium">Tugaskan Kader</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
