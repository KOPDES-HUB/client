"use client";

import { checkLocation } from "@/lib/profil-koperasi/profil-koperasi";
import { mapProfilKoperasiToKoperasiData } from "@/utils/koperasi";
import { useQuery } from "@tanstack/react-query";

interface UseCheckLocationParams {
  lat: number | null;
  long: number | null;
}

export function useCheckLocation({ lat, long }: UseCheckLocationParams) {
  return useQuery({
    queryKey: ["check-location", lat, long],
    queryFn: async () => {
      const res = await checkLocation({ lat: lat!, long: long! });

      if (!res.success || !res.data) {
        throw new Error(res.message || "Gagal mengambil data koperasi");
      }

      return res.data.map(mapProfilKoperasiToKoperasiData);
    },
    enabled: lat !== null && long !== null,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
