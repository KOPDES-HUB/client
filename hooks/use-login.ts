import { login } from "@/lib/api/auth";
import { LoginPayload } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onError: (error) => {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ?? "Login gagal, coba lagi.",
        );
      }
      throw error;
    },
  });
}
