"use client";

import { AppIcon } from "@/components/ui/app-icon";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { RAT_SESSION_2024 } from "@/lib/participation/sessions";
import { encodeSessionQr } from "@/lib/participation/qr";

export default function LayarProyektorPage() {
  const [count, setCount] = useState(68);
  const sessionQr = encodeSessionQr(RAT_SESSION_2024);

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
      <div className="text-center space-y-4">
        <h2 className="text-headline-md font-headline-md text-primary-fixed uppercase tracking-widest opacity-80">
          SIMPUL Merah Putih
        </h2>
        <div className="inline-flex items-center gap-4 bg-primary text-white px-8 py-3 rounded-full shadow-lg">
          <AppIcon name="group" className="text-2xl" />
          <span className="text-headline-md font-headline-md font-bold">{count} Anggota Hadir</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-12 shadow-2xl flex flex-col items-center gap-8 w-full max-w-3xl">
        <div className="text-center space-y-2">
          <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight leading-tight">
            Rapat Anggota Tahunan (RAT)
          </h1>
          <p className="text-headline-md font-headline-md text-primary font-semibold">Tahun Buku 2023</p>
          <p className="text-body-md text-on-surface-variant">25 Oktober 2024 · Balai Desa Merah Putih</p>
        </div>

        <div className="border-4 border-primary rounded-2xl p-3 bg-white">
          <QRCodeSVG value={sessionQr} size={300} level="M" includeMargin />
        </div>

        <div className="text-center space-y-3">
          <p className="text-on-surface-variant text-body-md">
            Anggota: buka <strong className="text-primary">KTA Digital</strong> → Absen dengan scan KTA
          </p>
          <p className="text-label-xs text-on-surface-variant">
            QR di atas = identitas sesi RAT · Petugas memindai QR KTA anggota
          </p>
          <p className="text-headline-md font-headline-md text-primary font-mono">
            /scan?sessionId=rat-2024&sessionType=rat
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-primary-fixed">
        <span className="w-3 h-3 rounded-full bg-primary-fixed animate-ping" />
        <span className="text-label-sm font-label-sm uppercase tracking-widest opacity-70">Sedang Berlangsung</span>
      </div>
    </div>
  );
}
