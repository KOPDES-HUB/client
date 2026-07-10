"use client";

import KTAQrCode from "./KTAQrCode";
import { DEMO_KTA_MEMBER } from "@/lib/kta/member";

type KTACardProps = {
  compact?: boolean;
  showQr?: boolean;
  member?: typeof DEMO_KTA_MEMBER;
};

export default function KTACard({
  compact = false,
  showQr = true,
  member = DEMO_KTA_MEMBER,
}: KTACardProps) {
  const isActive = member.status === "AKTIF";

  return (
    <div
      className="relative w-full kta-card-glow rounded-2xl overflow-hidden"
      style={{ aspectRatio: "1.6/1", maxHeight: compact ? "220px" : "420px" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#122114] via-[#1a3a24] to-[#488451]" />
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 transform translate-x-20" />

      <div
        className={`relative z-10 h-full flex flex-col justify-between text-white ${
          compact ? "p-5" : "p-10"
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className={`font-extrabold tracking-tight ${compact ? "text-lg" : "text-headline-md font-headline-md"}`}>
              SIMPUL
            </span>
            <span className="text-label-xs opacity-70 tracking-widest uppercase">Merah Putih</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className={`w-2 h-2 rounded-full ${isActive ? "bg-green-400 animate-pulse" : "bg-gray-400"}`} />
            <span className="text-label-xs text-white/90">
              {isActive ? "Anggota Terverifikasi" : "Nonaktif"}
            </span>
          </div>
        </div>

        <div className={`flex items-center ${compact ? "gap-4" : "gap-8"}`}>
          <div
            className={`rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center overflow-hidden shrink-0 ${
              compact ? "w-12 h-12 text-lg font-bold" : "w-20 h-20"
            }`}
          >
            {compact ? (
              member.nama.charAt(0)
            ) : (
              <span className="material-symbols-outlined text-white/60 text-5xl">person</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-label-xs opacity-70 uppercase tracking-widest mb-1">Nama Anggota</p>
            <h2 className={`font-bold tracking-tight truncate ${compact ? "text-base" : "text-2xl"}`}>
              {member.nama}
            </h2>
            <p className="text-label-xs opacity-70 font-mono truncate">NIK: {member.nik}</p>
          </div>
          {showQr && <KTAQrCode size={compact ? 64 : 96} />}
        </div>

        <div className="flex justify-between items-end gap-4">
          <div>
            <p className="text-label-xs opacity-70 uppercase tracking-widest mb-1">Nomor Anggota</p>
            <p className={`font-mono tracking-widest ${compact ? "text-sm" : "text-xl"}`}>
              {member.nomorKta}
            </p>
          </div>
          <div className="text-right">
            <p className="text-label-xs opacity-70 truncate max-w-[180px]">{member.koperasi}</p>
            <p className="text-label-xs opacity-70">Berlaku s.d. {member.berlakuHingga}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
