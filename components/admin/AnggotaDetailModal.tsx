"use client";

import { AppIcon } from "@/components/ui/app-icon";
export type AnggotaMember = {
  id: string;
  name: string;
  nik: string;
  hp: string;
  email: string;
  status: "Aktif" | "Pending" | "Nonaktif";
  joined: string;
  nomorKta: string;
  koperasi: string;
  alamat: string;
  jenisKelamin: string;
  pekerjaan: string;
  berlakuHingga: string;
  totalSimpanan: string;
  jenisKeanggotaan: string;
};

type AnggotaDetailModalProps = {
  member: AnggotaMember | null;
  onClose: () => void;
};

function QrPlaceholder() {
  return (
    <div className="bg-white p-3 rounded-xl flex-shrink-0">
      <div className="w-24 h-24 grid grid-cols-5 gap-0.5">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-sm ${
              [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24, 6, 12, 18].includes(i)
                ? "bg-inverse-surface"
                : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function AnggotaDetailModal({ member, onClose }: AnggotaDetailModalProps) {
  if (!member) return null;

  const isVerified = member.status === "Aktif";
  const isPending = member.status === "Pending";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="anggota-detail-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Tutup"
      />

      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface-card rounded-2xl border border-mint-200 shadow-2xl" data-lenis-prevent>
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface-card/95 backdrop-blur-sm">
          <div>
            <h2 id="anggota-detail-title" className="text-headline-md font-headline-md text-on-surface">
              Detail Anggota
            </h2>
            <p className="text-label-xs font-label-xs text-on-surface-variant mt-0.5">
              {member.name} · {member.id}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <AppIcon name="close" className="text-[20px]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* KTA Digital Card */}
          <section>
            <h3 className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-3">
              KTA Digital
            </h3>

            {isPending ? (
              <div className="rounded-2xl border-2 border-dashed border-tertiary-fixed bg-tertiary-fixed/30 p-10 text-center">
                <AppIcon name="hourglass_top" className="text-5xl text-amber-600 mb-3 block" />
                <p className="text-label-sm font-label-sm text-on-surface font-semibold">KTA Belum Diterbitkan</p>
                <p className="text-body-md text-on-surface-variant mt-1 max-w-md mx-auto">
                  Kartu Tanda Anggota akan diterbitkan setelah verifikasi admin selesai dan status keanggotaan menjadi Aktif.
                </p>
              </div>
            ) : (
              <div
                className="relative w-full kta-card-glow rounded-2xl overflow-hidden"
                style={{ aspectRatio: "1.6/1", maxHeight: "340px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#122114] via-[#1a3a24] to-[#488451]" />
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 transform translate-x-20" />

                <div className="relative z-10 h-full flex flex-col p-8 justify-between text-white">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-headline-md font-headline-md font-extrabold tracking-tight">SIMPUL</span>
                      <span className="text-label-xs opacity-70 tracking-widest uppercase">Merah Putih</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 backdrop-blur-sm px-3 py-1.5 rounded-full ${
                        isVerified ? "bg-white/10" : "bg-white/5"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isVerified ? "bg-green-400 animate-pulse" : "bg-gray-400"
                        }`}
                      />
                      <span className="text-label-xs text-white/90">
                        {isVerified ? "Anggota Terverifikasi" : "Nonaktif"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <span className="text-2xl font-bold">{member.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-label-xs opacity-70 uppercase tracking-widest mb-1">Nama Anggota</p>
                      <h4 className="text-xl font-bold tracking-tight truncate">{member.name}</h4>
                      <p className="text-label-xs opacity-70 font-mono mt-0.5">NIK: {member.nik}</p>
                    </div>
                    {isVerified && <QrPlaceholder />}
                  </div>

                  <div className="flex justify-between items-end gap-4">
                    <div>
                      <p className="text-label-xs opacity-70 uppercase tracking-widest mb-1">Nomor Anggota</p>
                      <p className="text-lg font-mono tracking-widest">{member.nomorKta}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-label-xs opacity-70 truncate max-w-[200px]">{member.koperasi}</p>
                      <p className="text-label-xs opacity-70">Berlaku s.d. {member.berlakuHingga}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Detail Keanggotaan */}
          <section className="bg-surface-bg rounded-2xl border border-mint-200 p-5">
            <h3 className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-4">
              Informasi Keanggotaan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Status", value: member.status, highlight: true },
                { label: "ID Anggota", value: member.id },
                { label: "Nomor KTA", value: isPending ? "—" : member.nomorKta },
                { label: "Tanggal Bergabung", value: member.joined },
                { label: "Jenis Keanggotaan", value: member.jenisKeanggotaan },
                { label: "Total Simpanan", value: member.totalSimpanan, highlight: true },
                { label: "Jenis Kelamin", value: member.jenisKelamin },
                { label: "Pekerjaan", value: member.pekerjaan },
              ].map((d) => (
                <div key={d.label} className="p-4 bg-surface-card rounded-xl border border-outline-variant/20">
                  <p className="text-label-xs font-label-xs text-on-surface-variant mb-1">{d.label}</p>
                  <p
                    className={`text-body-md font-semibold ${
                      d.highlight ? "text-primary" : "text-on-surface"
                    }`}
                  >
                    {d.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Kontak & Alamat */}
          <section className="bg-surface-bg rounded-2xl border border-mint-200 p-5">
            <h3 className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-4">
              Kontak & Alamat
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-surface-card rounded-xl border border-outline-variant/20">
                <p className="text-label-xs font-label-xs text-on-surface-variant mb-1">Email</p>
                <p className="text-body-md text-on-surface">{member.email}</p>
              </div>
              <div className="p-4 bg-surface-card rounded-xl border border-outline-variant/20">
                <p className="text-label-xs font-label-xs text-on-surface-variant mb-1">No. HP / WhatsApp</p>
                <p className="text-body-md text-on-surface">{member.hp}</p>
              </div>
              <div className="p-4 bg-surface-card rounded-xl border border-outline-variant/20 sm:col-span-2">
                <p className="text-label-xs font-label-xs text-on-surface-variant mb-1">Alamat Lengkap</p>
                <p className="text-body-md text-on-surface leading-relaxed">{member.alamat}</p>
              </div>
              <div className="p-4 bg-surface-card rounded-xl border border-outline-variant/20 sm:col-span-2">
                <p className="text-label-xs font-label-xs text-on-surface-variant mb-1">Koperasi</p>
                <p className="text-body-md text-on-surface">{member.koperasi}</p>
              </div>
            </div>
          </section>

          {/* Dokumen */}
          <section className="bg-surface-bg rounded-2xl border border-mint-200 p-5">
            <h3 className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-4">
              Dokumen Verifikasi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Foto KTP", icon: "badge" },
                { label: "Foto Selfie + KTP", icon: "face_retouching_natural" },
              ].map((doc) => (
                <div
                  key={doc.label}
                  className="aspect-video rounded-xl border border-dashed border-outline-variant/50 bg-surface-card flex flex-col items-center justify-center gap-2 text-on-surface-variant"
                >
                  <AppIcon name={doc.icon} className="text-4xl opacity-40" />
                  <p className="text-label-xs font-label-xs">{doc.label}</p>
                  <p className="text-label-xs text-on-surface-variant/60">Dokumen tersedia</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-outline-variant/30 bg-surface-card/95 backdrop-blur-sm">
          {isVerified && (
            <button
              type="button"
              className="flex items-center gap-2 px-5 py-2.5 border border-mint-200 text-primary rounded-xl text-label-sm font-label-sm hover:bg-primary/5 transition-all"
            >
              <AppIcon name="download" className="text-[18px]" />
              Unduh KTA
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
