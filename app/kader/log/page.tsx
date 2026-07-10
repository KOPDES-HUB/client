import TopBar from "@/components/layout/TopBar";

const LOG_DATA = [
  { id: "1", waktu: "10 Jul 2024, 09:15", namaAnggota: "Karno Sutrisno", idAnggota: "SMP-087", jenisAksi: "TRANSAKSI",   deskripsi: "Rp 50.000 di Warung Koperasi → 5 poin", namaKader: "Sari Kader" },
  { id: "2", waktu: "10 Jul 2024, 09:22", namaAnggota: "Mbok Sari",       idAnggota: "SMP-093", jenisAksi: "ABSENSI_RAT", deskripsi: "Hadir di RAT 2024 — 15 Jul 2024",        namaKader: "Sari Kader" },
  { id: "3", waktu: "9 Jul 2024, 14:05",  namaAnggota: "Pak Wagimin",     idAnggota: "SMP-055", jenisAksi: "VOTE",        deskripsi: "Voting Pengadaan Beras — Pilihan: Setuju", namaKader: "Sari Kader" },
  { id: "4", waktu: "8 Jul 2024, 10:30",  namaAnggota: "Karno Sutrisno", idAnggota: "SMP-087", jenisAksi: "TRANSAKSI",   deskripsi: "Rp 30.000 di Agro Koperasi → 3 poin",    namaKader: "Sari Kader" },
  { id: "5", waktu: "7 Jul 2024, 08:50",  namaAnggota: "Mbok Sari",       idAnggota: "SMP-093", jenisAksi: "TRANSAKSI",   deskripsi: "Rp 25.000 di Warung Koperasi → 2 poin",  namaKader: "Sari Kader" },
];

const AKSI_COLOR: Record<string, string> = {
  TRANSAKSI:   "bg-primary-fixed text-on-primary-fixed-variant",
  ABSENSI_RAT: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  VOTE:        "bg-secondary-container text-on-surface",
};

export default function KaderLogPage() {
  return (
    <>
      <TopBar
        title="Log Aktivitas Saya"
        breadcrumb={[{ label: "Panel Kader" }, { label: "Log Aktivitas" }]}
        showSearch={false}
      />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-5">
          {[
            { label: "Total Aksi Bulan Ini", value: LOG_DATA.length,                                            icon: "history" },
            { label: "Anggota Terbantu",      value: new Set(LOG_DATA.map(l => l.idAnggota)).size,              icon: "people" },
            { label: "Transaksi Diinput",     value: LOG_DATA.filter(l => l.jenisAksi === "TRANSAKSI").length,  icon: "receipt_long" },
          ].map((s) => (
            <div key={s.label} className="bg-surface-card rounded-2xl border border-mint-200 p-5 shadow-md flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary">{s.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-on-surface">{s.value}</p>
                <p className="text-sm text-on-surface-variant">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/30">
            <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">Riwayat Aksi Lengkap (Audit Trail)</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">Log ini disimpan permanen dan tidak dapat diubah.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-bg border-b border-outline-variant/30 text-left">
                  {["Waktu", "Anggota", "Jenis Aksi", "Deskripsi", "Kader"].map((h) => (
                    <th key={h} className="px-5 py-3 text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LOG_DATA.map((l) => (
                  <tr key={l.id} className="border-b border-outline-variant/20 hover:bg-primary/[0.02] transition-colors">
                    <td className="px-5 py-4 text-sm text-on-surface-variant whitespace-nowrap">{l.waktu}</td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-on-surface">{l.namaAnggota}</p>
                      <p className="text-xs text-on-surface-variant">{l.idAnggota}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${AKSI_COLOR[l.jenisAksi]}`}>
                        {l.jenisAksi.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{l.deskripsi}</td>
                    <td className="px-5 py-4 text-sm font-medium text-on-surface">{l.namaKader}</td>
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
