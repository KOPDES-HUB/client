"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import BRANDING_IMAGE from "@/public/bg.jpg";
import Image from "next/image";
import { useAuthStore } from "../stores/auth-store";
import { useLogin } from "@/hooks/use-login";
import { isAxiosError } from "axios";

const ADMIN_ROLE_IDS = [
  "71504c7f-1475-4099-bf11-7b8b8b6c45f6", // Admin
  "9c3c12f0-1a22-4212-bf9e-83ccde27c814", // Superadmin
];

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const loginMutation = useLogin();

  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!nik.trim() || !password) {
      setError("NIK dan password wajib diisi");
      return;
    }
    try {
      const res = await loginMutation.mutateAsync({
        ...(nik.includes("@") ? { email: nik.trim() } : { nik: nik.trim() }),
        password,
      });

      if (!res.success || !res.data?.user) {
        setError(res.message || "Login gagal");
        return;
      }

      const user = res.data.user;
      setUser(user);
      const isAdmin = user.roles.some((roleId) =>
        ADMIN_ROLE_IDS.includes(roleId),
      );

      router.push(isAdmin ? "/admin" : "/dashboard");
    } catch (err) {
      // #region agent log
      fetch("http://127.0.0.1:7591/ingest/e37e4eb2-1953-4214-a75b-ed7e54685425", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "6f6c76" },
        body: JSON.stringify({
          sessionId: "6f6c76",
          hypothesisId: "A,B,C,D,E",
          location: "login/page.tsx:catch",
          message: "login submit failed",
          data: {
            isAxios: isAxiosError(err),
            code: isAxiosError(err) ? err.code : null,
            status: isAxiosError(err) ? err.response?.status : null,
            axiosMessage: isAxiosError(err) ? err.message : null,
            responseMessage: isAxiosError(err) ? err.response?.data?.message : null,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      const message = isAxiosError(err)
        ? (err.response?.data?.message ?? err.message ?? "Login gagal, coba lagi.")
        : "Terjadi kesalahan, coba lagi.";
      setError(message);
    }
  };

  return (
    <main className="flex h-screen w-full overflow-hidden bg-surface-bg text-on-surface antialiased">
      {/* Left: Branding panel */}
      <section className="relative hidden w-[55%] flex-col items-center justify-center overflow-hidden p-20 text-white lg:flex">
        {/* Layer 1: Background image — fill, bukan wrapper */}
        <Image
          src={BRANDING_IMAGE}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="55vw"
        />
        {/* Layer 2: Gradient overlay (sesuai desain Stitch) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(18, 33, 20, 0.85) 0%, rgba(44, 104, 56, 0.4) 100%)",
          }}
        />
        {/* Layer 3: Decorative circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
          <div
            className="animate-login-float absolute bottom-[-5%] left-[-5%] h-[300px] w-[300px] rounded-full border border-white opacity-40"
            style={{ animationDelay: "-2s" }}
          />
        </div>
        {/* Layer 4: Konten branding */}
        <div className="relative z-10 w-full max-w-xl">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <span
                className="material-symbols-outlined text-3xl text-inverse-surface"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                account_balance
              </span>
            </div>
            <span className="font-headline-lg text-headline-lg uppercase tracking-tight">
              SIMPUL
            </span>
          </div>
          <h1 className="font-headline-hero text-headline-hero mb-6 leading-tight">
            Satu Kartu, <br />
            Semua Layanan Koperasi
          </h1>
          <p className="font-body-lg text-body-lg mb-12 max-w-md text-white/80">
            Platform digital terpadu untuk memberdayakan ekonomi desa melalui
            transparansi dan kemudahan akses finansial.
          </p>
          <div className="flex gap-4">
            <div className="flex -space-x-3">
              <div className="h-10 w-10 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm" />
              <div className="h-10 w-10 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm" />
              <div className="h-10 w-10 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm" />
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/20 bg-primary">
                <span className="material-symbols-outlined text-sm text-white">
                  add
                </span>
              </div>
            </div>
            <div className="font-label-sm text-label-sm flex items-center text-white/60">
              Terhubung dengan 2.4k+ Anggota Aktif
            </div>
          </div>
        </div>
        {/* Layer 5: Footer branding */}
        <div className="absolute bottom-12 left-20 z-10">
          <div className="font-mono text-[12px] uppercase tracking-widest text-white/40">
            Koperasi Desa Merah Putih — Digital Ecosystem
          </div>
        </div>
      </section>

      {/* Right: Login form */}
      <section className="relative flex w-full flex-col items-center justify-center px-8 lg:w-[45%] lg:px-20">
        <div className="absolute top-0 right-0 -z-10 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />

        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-10 flex justify-center lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span
                  className="material-symbols-outlined text-2xl text-white"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  account_balance
                </span>
              </div>
              <span className="font-headline-md text-headline-md uppercase text-inverse-surface">
                SIMPUL
              </span>
            </div>
          </div>

          {/* Desktop header */}
          <div className="mb-8 hidden flex-col items-start lg:flex">
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <span
                className="material-symbols-outlined text-xl text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                account_balance
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg mb-2 text-inverse-surface">
              Masuk ke SIMPUL
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Gunakan NIK dan password Anda untuk masuk
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="font-label-sm text-label-sm text-red-500">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label
                className="font-label-sm text-label-sm ml-1 text-inverse-surface"
                htmlFor="nik"
              >
                NIK
              </label>
              <div className="relative">
                <input
                  id="nik"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  type="number"
                  placeholder="Masukkan 16 digit NIK"
                  disabled={loginMutation.isPending}
                  className="h-12 w-full rounded-md border border-mint-200 bg-white px-4 text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <span className="material-symbols-outlined absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
                  id_card
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  className="font-label-sm text-label-sm ml-1 text-inverse-surface"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="font-label-sm text-label-sm text-primary hover:underline"
                >
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password Anda"
                  disabled={loginMutation.isPending}
                  className="h-12 w-full rounded-md border border-mint-200 bg-white px-4 text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-primary"
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="font-label-sm text-label-sm mt-2 h-12 w-full rounded-md bg-primary text-white shadow-md transition-all duration-200 hover:bg-primary-container active:scale-[0.98]"
            >
              {loginMutation.isPending ? "Memuat..." : "Masuk"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="grow border-t border-mint-200" />
            <span className="font-label-sm text-label-sm px-4 uppercase tracking-widest text-gray-400">
              atau
            </span>
            <div className="grow border-t border-mint-200" />
          </div>

          {/* Register CTA */}
          <Link
            href="/cari-koperasi"
            className="font-label-sm text-label-sm flex h-12 w-full items-center justify-center rounded-md border border-mint-200 bg-transparent text-inverse-surface transition-all duration-200 hover:bg-surface-bg active:scale-[0.98]"
          >
            Daftar Sebagai Anggota Baru
          </Link>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="font-label-sm text-label-sm text-gray-400">
              © 2026 Koperasi Desa Merah Putih
            </p>
            <div className="mt-2 flex justify-center gap-4 font-mono text-[12px] text-primary/60">
              <Link href="#" className="hover:text-primary">
                Kebijakan Privasi
              </Link>
              <span>•</span>
              <Link href="#" className="hover:text-primary">
                Bantuan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
