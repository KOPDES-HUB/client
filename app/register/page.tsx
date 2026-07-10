import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center py-12 px-4">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="text-headline-md font-headline-md text-primary font-bold">SIMPUL</span>
        <span className="text-label-sm font-label-sm text-on-surface-variant">Merah Putih</span>
      </Link>

      <div className="w-full max-w-2xl">
        {/* Step Indicator */}
        <nav aria-label="Progress" className="flex items-center justify-between mb-8 px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white font-bold shadow-sm">
              1
            </div>
            <span className="text-label-sm font-label-sm text-primary">Data Diri</span>
          </div>
          <div className="flex-1 h-[2px] mx-4 bg-mint-200 -mt-6"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-mint-200 text-on-surface-variant font-bold bg-white">
              2
            </div>
            <span className="text-label-sm font-label-sm text-on-surface-variant">Dokumen</span>
          </div>
          <div className="flex-1 h-[2px] mx-4 bg-mint-200 -mt-6"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-mint-200 text-on-surface-variant font-bold bg-white">
              3
            </div>
            <span className="text-label-sm font-label-sm text-on-surface-variant">Review</span>
          </div>
        </nav>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md border border-mint-200 overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-headline-md font-headline-md text-on-surface mb-1">Informasi Personal</h2>
              <p className="text-body-md text-on-surface-variant">
                Silakan lengkapi data diri Anda sesuai dengan KTP yang berlaku.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="namaLengkap" className="block text-label-sm font-label-sm text-on-surface mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="namaLengkap"
                    type="text"
                    placeholder="Sesuai KTP"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="nik" className="block text-label-sm font-label-sm text-on-surface mb-2">
                    NIK <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nik"
                    type="text"
                    placeholder="16 digit nomor KTP"
                    maxLength={16}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="alamat" className="block text-label-sm font-label-sm text-on-surface mb-2">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="alamat"
                    rows={3}
                    placeholder="Jalan, RT/RW, Desa/Kelurahan, Kecamatan, Kabupaten"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>
                <div>
                  <label htmlFor="noHp" className="block text-label-sm font-label-sm text-on-surface mb-2">
                    Nomor HP <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="noHp"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-label-sm font-label-sm text-on-surface mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="email@contoh.com"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* Upload Section */}
              <div>
                <p className="text-label-sm font-label-sm text-on-surface mb-3">
                  Unggah Dokumen <span className="text-red-500">*</span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Foto KTP", hint: "Pastikan foto jelas dan tidak terpotong" },
                    { label: "Foto Selfie + KTP", hint: "Pegang KTP di depan wajah Anda" },
                  ].map((doc) => (
                    <div
                      key={doc.label}
                      className="border-2 border-dashed border-mint-200 rounded-xl p-6 flex flex-col items-center gap-3 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined text-primary text-2xl">upload_file</span>
                      </div>
                      <div>
                        <p className="text-label-sm font-label-sm text-on-surface">{doc.label}</p>
                        <p className="text-label-xs text-on-surface-variant mt-1">{doc.hint}</p>
                        <p className="text-label-xs text-on-surface-variant">JPG, PNG, maks 5MB</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-2">
                <Link href="/" className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors">
                  ← Kembali
                </Link>
                <Link
                  href="/register/status"
                  className="px-8 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 transform"
                >
                  Lanjutkan →
                </Link>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-label-xs font-label-xs text-on-surface-variant mt-6">
          Sudah punya akun?{" "}
          <Link href="/dashboard" className="text-primary font-bold hover:underline">
            Masuk ke Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}
