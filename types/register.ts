import type { ApiResponse } from "@/types/api";

export interface RegisterPayload {
  nama: string;
  email: string;
  password: string;
  nik: string;
  koperasiRef: string;
  noWA?: string;
  alamatLengkap?: string;
  fileKtp?: string;
  fileSelfieKtp?: string;
  kodeReferral?: string;
}

export interface RegisterUser {
  id: string;
  username: string;
  email: string;
  nik: string | null;
  noWA: string | null;
  koperasiRef: string | null;
  statusRegistrasi: string;
  createdAt: string | null;
}

export type RegisterResponse = ApiResponse<RegisterUser>;
