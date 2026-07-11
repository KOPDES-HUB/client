import {
  ApiResponse,
  AuthUser,
  LoginPayload,
  LoginResponse,
} from "@/types/api";
import type {
  RegisterPayload,
  RegisterResponse,
  RegisterUser,
} from "@/types/register";
import { findMockAccount, MOCK_ACCOUNTS } from "@/lib/mock/accounts";
import { mockDelay } from "@/lib/mock/utils";

const AUTH_STORAGE_KEY = "auth-storage";

/**
 * Backend belum selesai deploy — endpoint auth memakai 2 akun dummy
 * (lihat lib/mock/accounts.ts) selagi menunggu backend siap.
 */
export async function login(payload: LoginPayload) {
  const account = findMockAccount(
    { nik: payload.nik, email: payload.email },
    payload.password,
  );

  if (!account) {
    return mockDelay<ApiResponse<LoginResponse>>({
      success: false,
      message: "NIK/Email atau password salah.",
    });
  }

  return mockDelay<ApiResponse<LoginResponse>>({
    success: true,
    message: "Login berhasil",
    data: { user: account.user },
  });
}

export async function register(payload: RegisterPayload) {
  const emailTaken = MOCK_ACCOUNTS.some(
    (acc) => acc.email.toLowerCase() === payload.email.trim().toLowerCase(),
  );

  if (emailTaken) {
    return mockDelay<RegisterResponse>({
      success: false,
      message: "Email sudah terdaftar. Gunakan email lain.",
    });
  }

  const user: RegisterUser = {
    id: `REG-${Date.now()}`,
    username: payload.nama,
    email: payload.email,
    nik: payload.nik,
    noWA: payload.noWA ?? null,
    koperasiRef: payload.koperasiRef,
    statusRegistrasi: "DIAJUKAN",
    createdAt: new Date().toISOString(),
  };

  return mockDelay<RegisterResponse>({
    success: true,
    message: "Pendaftaran berhasil dikirim, menunggu verifikasi.",
    data: user,
  });
}

export async function getMe() {
  if (typeof window === "undefined") {
    return mockDelay<ApiResponse<AuthUser>>({ success: false, message: "Belum login" });
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    const user: AuthUser | null = parsed?.state?.user ?? null;

    if (!user) {
      return mockDelay<ApiResponse<AuthUser>>({ success: false, message: "Belum login" });
    }

    return mockDelay<ApiResponse<AuthUser>>({
      success: true,
      message: "OK",
      data: user,
    });
  } catch {
    return mockDelay<ApiResponse<AuthUser>>({ success: false, message: "Sesi tidak valid" });
  }
}
