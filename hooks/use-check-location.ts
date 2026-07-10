"use client";

import { checkLocation } from "@/lib/profil-koperasi/profil-koperasi";
import { mapProfilKoperasiToKoperasiData } from "@/utils/koperasi";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

interface UseCheckLocationParams {
  lat: number | null;
  long: number | null;
}

export function useCheckLocation({ lat, long }: UseCheckLocationParams) {
  return useQuery({
    queryKey: ["check-location", lat, long],
    queryFn: async () => {
      try {
        const res = await checkLocation({ lat: lat!, long: long! });

        if (!res.success || !res.data) {
          throw new Error(res.message || "Gagal mengambil data koperasi");
        }

        return res.data.map(mapProfilKoperasiToKoperasiData);
      } catch (err) {
        if (isAxiosError(err)) {
          if (!err.response) {
            throw new Error(
              "Tidak dapat terhubung ke server. Pastikan backend berjalan dan CORS sudah dikonfigurasi.",
            );
          }
          throw new Error(
            err.response.data?.message ?? "Gagal mengambil data koperasi",
          );
        }
        throw err;
      }
    },
    enabled: lat !== null && long !== null,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
