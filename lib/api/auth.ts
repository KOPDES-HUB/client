import { api } from "../axios";
import {
  ApiResponse,
  AuthUser,
  LoginPayload,
  LoginResponse,
} from "@/types/api";
import type { RegisterPayload, RegisterResponse } from "@/types/register";

export async function login(payload: LoginPayload) {
  const { data } = await api.post<ApiResponse<LoginResponse>>(
    "/api/auth/login",
    payload,
  );
  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post<RegisterResponse>(
    "/api/auth/register",
    payload,
  );
  return data;
}

export async function getMe() {
  const { data } = await api.get<ApiResponse<AuthUser>>("/api/auth/me");
  return data;
}
