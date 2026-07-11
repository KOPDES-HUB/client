import type {
  CheckLocationPayload,
  CheckLocationResponse,
} from "@/types/cari-koperasi";
import { withDistanceFrom } from "@/lib/mock/koperasi-list";
import { mockDelay } from "@/lib/mock/utils";

/**
 * Backend belum selesai deploy — mengembalikan 5 koperasi contoh yang
 * sudah diurutkan berdasarkan jarak dari koordinat pengguna.
 */
export async function checkLocation(payload: CheckLocationPayload) {
  const data = withDistanceFrom(payload.lat, payload.long);

  return mockDelay<CheckLocationResponse>({
    success: true,
    message: "OK",
    data,
  });
}
