"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useRef, useState } from "react";
import { useRegister } from "@/hooks/use-register";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function validateFile(file: File | null): string | null {
  if (!file) return null;
  if (!ACCEPTED_TYPES.includes(file.type)) return "Format harus JPG atau PNG";
  if (file.size > MAX_FILE_SIZE) return "Ukuran file maksimal 5MB";
  return null;
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registerMutation = useRegister();

  const koperasiRef = searchParams.get("koperasi") ?? "";
  const namaKoperasi = searchParams.get("nama") ?? "";
  const refFromUrl = searchParams.get("ref") ?? searchParams.get("kodeReferral") ?? "";

  const ktpInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [alamatLengkap, setAlamatLengkap] = useState("");
  const [noWA, setNoWA] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [kodeReferral, setKodeReferral] = useState(refFromUrl);
  const [fileKtp, setFileKtp] = useState<File | null>(null);
  const [fileSelfieKtp, setFileSelfieKtp] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!koperasiRef) {
      setError(
        "Koperasi belum dipilih. Silakan pilih koperasi terlebih dahulu.",
      );
      return;
    }

    if (
      !nama.trim() ||
      !nik.trim() ||
      !email.trim() ||
      !password ||
      !alamatLengkap.trim() ||
      !noWA.trim()
    ) {
      setError("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    if (nik.length !== 16) {
      setError("NIK harus 16 digit.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    const ktpError = validateFile(fileKtp);
    if (ktpError) {
      setError(`Foto KTP: ${ktpError}`);
      return;
    }

    const selfieError = validateFile(fileSelfieKtp);
    if (selfieError) {
      setError(`Foto Selfie + KTP: ${selfieError}`);
      return;
    }

    try {
      const ktpBase64 = fileKtp ? await fileToBase64(fileKtp) : undefined;
      const selfieBase64 = fileSelfieKtp
        ? await fileToBase64(fileSelfieKtp)
        : undefined;

      const res = await registerMutation.mutateAsync({
        nama: nama.trim(),
        email: email.trim(),
        password,
        nik: nik.trim(),
        koperasiRef,
        noWA: noWA.trim(),
        alamatLengkap: alamatLengkap.trim(),
        ...(ktpBase64 && { fileKtp: ktpBase64 }),
        ...(selfieBase64 && { fileSelfieKtp: selfieBase64 }),
        ...(kodeReferral.trim() && { kodeReferral: kodeReferral.trim() }),
      });

      if (!res.success || !res.data) {
        setError(res.message || "Pendaftaran gagal");
        return;
      }

      const params = new URLSearchParams({
        id: res.data.id,
        nama: res.data.username,
        email: res.data.email,
        koperasi: namaKoperasi || koperasiRef,
        status: res.data.statusRegistrasi,
      });

      router.push(`/register/status?${params.toString()}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan, coba lagi.",
      );
    }
  };

  if (!koperasiRef) {
    return (
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-md border border-mint-200 p-8 text-center">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">
            location_on
          </span>
          <h2 className="text-headline-md font-headline-md text-on-surface mb-2">
            Pilih Koperasi Dulu
          </h2>
          <p className="text-body-md text-on-surface-variant mb-6">
            Anda belum memilih koperasi. Silakan cari dan pilih koperasi
            terdekat terlebih dahulu.
          </p>
          <Link
            href="/cari-koperasi"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all"
          >
            Cari Koperasi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Step Indicator */}
      <nav
        aria-label="Progress"
        className="flex items-center justify-between mb-8 px-4"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/20 text-primary font-bold">
            ✓
          </div>
          <span className="text-label-sm font-label-sm text-primary">
            Pilih Koperasi
          </span>
        </div>
        <div className="flex-1 h-[2px] mx-4 bg-primary -mt-6"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white font-bold shadow-sm">
            2
          </div>
          <span className="text-label-sm font-label-sm text-primary">
            Data Diri
          </span>
        </div>
        <div className="flex-1 h-[2px] mx-4 bg-mint-200 -mt-6"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-mint-200 text-on-surface-variant font-bold bg-white">
            3
          </div>
          <span className="text-label-sm font-label-sm text-on-surface-variant">
            Review
          </span>
        </div>
      </nav>

      {/* Koperasi terpilih */}
      <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 px-5 py-4 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary">
          account_balance
        </span>
        <div>
          <p className="text-label-xs text-on-surface-variant uppercase tracking-wider">
            Koperasi Terpilih
          </p>
          <p className="text-label-sm font-label-sm text-on-surface font-semibold">
            {namaKoperasi || koperasiRef}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-md border border-mint-200 overflow-hidden">
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-1">
              Informasi Personal
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Silakan lengkapi data diri Anda sesuai dengan KTP yang berlaku.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="namaLengkap"
                  className="block text-label-sm font-label-sm text-on-surface mb-2"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  id="namaLengkap"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Sesuai KTP"
                  disabled={registerMutation.isPending}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="nik"
                  className="block text-label-sm font-label-sm text-on-surface mb-2"
                >
                  NIK <span className="text-red-500">*</span>
                </label>
                <input
                  id="nik"
                  type="text"
                  value={nik}
                  onChange={(e) =>
                    setNik(e.target.value.replace(/\D/g, "").slice(0, 16))
                  }
                  placeholder="16 digit nomor KTP"
                  maxLength={16}
                  disabled={registerMutation.isPending}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="alamat"
                  className="block text-label-sm font-label-sm text-on-surface mb-2"
                >
                  Alamat Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="alamat"
                  rows={3}
                  value={alamatLengkap}
                  onChange={(e) => setAlamatLengkap(e.target.value)}
                  placeholder="Jalan, RT/RW, Desa/Kelurahan, Kecamatan, Kabupaten"
                  disabled={registerMutation.isPending}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>
              <div>
                <label
                  htmlFor="noHp"
                  className="block text-label-sm font-label-sm text-on-surface mb-2"
                >
                  Nomor HP <span className="text-red-500">*</span>
                </label>
                <input
                  id="noHp"
                  type="tel"
                  value={noWA}
                  onChange={(e) => setNoWA(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  disabled={registerMutation.isPending}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-label-sm font-label-sm text-on-surface mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  disabled={registerMutation.isPending}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-label-sm font-label-sm text-on-surface mb-2"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  disabled={registerMutation.isPending}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-label-sm font-label-sm text-on-surface mb-2"
                >
                  Konfirmasi Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  disabled={registerMutation.isPending}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="kodeReferral"
                  className="block text-label-sm font-label-sm text-on-surface mb-2"
                >
                  Kode Referral <span className="text-on-surface-variant font-normal">(opsional)</span>
                </label>
                <input
                  id="kodeReferral"
                  type="text"
                  value={kodeReferral}
                  onChange={(e) => setKodeReferral(e.target.value.toUpperCase())}
                  placeholder="Contoh: BSW2024"
                  disabled={registerMutation.isPending}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all uppercase"
                />
                <p className="text-label-xs text-on-surface-variant mt-1.5">
                  Isi jika Anda diajak mendaftar oleh anggota koperasi yang sudah ada.
                </p>
              </div>
            </div>

            {/* Upload Section */}
            <div>
              <p className="text-label-sm font-label-sm text-on-surface mb-1">
                Unggah Dokumen{" "}
                <span className="text-on-surface-variant font-normal">(opsional)</span>
              </p>
              <p className="text-label-xs text-on-surface-variant mb-3">
                Anda dapat melengkapi dokumen sekarang atau nanti setelah pendaftaran disetujui.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    label: "Foto KTP",
                    hint: "Pastikan foto jelas dan tidak terpotong",
                    ref: ktpInputRef,
                    file: fileKtp,
                    onChange: setFileKtp,
                  },
                  {
                    label: "Foto Selfie + KTP",
                    hint: "Pegang KTP di depan wajah Anda",
                    ref: selfieInputRef,
                    file: fileSelfieKtp,
                    onChange: setFileSelfieKtp,
                  },
                ].map((doc) => (
                  <div key={doc.label}>
                    <input
                      ref={doc.ref}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      className="hidden"
                      disabled={registerMutation.isPending}
                      onChange={(e) =>
                        doc.onChange(e.target.files?.[0] ?? null)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => doc.ref.current?.click()}
                      disabled={registerMutation.isPending}
                      className="w-full border-2 border-dashed border-mint-200 rounded-xl p-6 flex flex-col items-center gap-3 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined text-primary text-2xl">
                          {doc.file ? "check_circle" : "upload_file"}
                        </span>
                      </div>
                      <div>
                        <p className="text-label-sm font-label-sm text-on-surface">
                          {doc.label}
                        </p>
                        <p className="text-label-xs text-on-surface-variant mt-1">
                          {doc.hint}
                        </p>
                        <p className="text-label-xs text-on-surface-variant">
                          JPG, PNG, maks 5MB
                        </p>
                        {doc.file && (
                          <p className="text-label-xs text-primary mt-2 font-semibold truncate max-w-full">
                            {doc.file.name}
                          </p>
                        )}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-2">
              <Link
                href="/cari-koperasi"
                className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                ← Kembali
              </Link>
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="px-8 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 transform disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {registerMutation.isPending
                  ? "Mengirim..."
                  : "Daftar Sekarang →"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <p className="text-center text-label-xs font-label-xs text-on-surface-variant mt-6">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Masuk ke Akun
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center py-12 px-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="text-headline-md font-headline-md text-primary font-bold">
          SIMPUL
        </span>
        <span className="text-label-sm font-label-sm text-on-surface-variant">
          Merah Putih
        </span>
      </Link>

      <Suspense
        fallback={
          <div className="text-on-surface-variant text-body-md">
            Memuat formulir...
          </div>
        }
      >
        <RegisterForm />
      </Suspense>
    </div>
  );
}
