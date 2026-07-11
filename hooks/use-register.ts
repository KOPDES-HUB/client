"use client";

import { register } from "@/lib/api/auth";
import type { RegisterPayload } from "@/types/register";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onError: (error) => {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ?? "Pendaftaran gagal, coba lagi.",
        );
      }
      throw error;
    },
  });
}
