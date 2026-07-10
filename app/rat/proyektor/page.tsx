"use client";

import { useEffect, useState } from "react";

export default function LayarProyektorPage() {
  const [count, setCount] = useState(68);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCount((c) => c + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-inverse-surface flex flex-col items-center justify-center p-12 gap-10">
      {/* Top Branding */}
      <div className="text-center space-y-4">
        <h2 className="text-headline-md font-headline-md text-primary-fixed uppercase tracking-widest opacity-80">
          SIMPUL Merah Putih
        </h2>
        <div className="inline-flex items-center gap-4 bg-primary text-white px-8 py-3 rounded-full shadow-lg">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            group
          </span>
          <span className="text-headline-md font-headline-md font-bold">{count} Anggota Hadir</span>
        </div>
      </div>

      {/* Central Card */}
      <div className="bg-white rounded-2xl p-12 shadow-2xl flex flex-col items-center gap-8 w-full max-w-3xl">
        <div className="text-center space-y-2">
          <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight leading-tight">
            Rapat Anggota Tahunan (RAT)
          </h1>
          <p className="text-headline-md font-headline-md text-primary font-semibold">Tahun Buku 2023</p>
          <p className="text-body-md text-on-surface-variant">25 Oktober 2024 · Balai Desa Merah Putih</p>
        </div>

        {/* QR Code (visual simulation) */}
        <div className="border-4 border-primary rounded-2xl p-3 bg-white">
          <div className="w-[320px] h-[320px] bg-white p-4 flex items-center justify-center relative">
            {/* QR visual grid */}
            <div className="grid grid-cols-10 gap-1 w-full h-full">
              {Array.from({ length: 100 }).map((_, i) => {
                const isPattern = [
                  0,1,2,3,4,5,6,10,16,20,26,30,36,40,46,50,56,60,66,
                  7,14,21,28,35,42,49,56,63,70,77,84,91,98,99,92,85,78,
                  9,18,27,36,45,54,63,72,81,90,11,22,33,44,55,66,77,88,
                  13,24,35,46,57,68,79,15,37,48,59,70,82,93,
                ].includes(i);
                return (
                  <div
                    key={i}
                    className={`rounded-sm ${isPattern || Math.random() > 0.6 ? "bg-inverse-surface" : "bg-white"}`}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scan URL */}
        <div className="text-center">
          <p className="text-on-surface-variant text-body-md mb-1">atau buka:</p>
          <p className="text-headline-md font-headline-md text-primary font-mono">simpul.id/scan/RAT2024</p>
        </div>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-3 text-primary-fixed">
        <span className="w-3 h-3 rounded-full bg-primary-fixed animate-ping"></span>
        <span className="text-label-sm font-label-sm uppercase tracking-widest opacity-70">Sedang Berlangsung</span>
      </div>
    </div>
  );
}
