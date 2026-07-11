import { api } from "@/lib/axios";
import type {
  CheckLocationPayload,
  CheckLocationResponse,
} from "@/types/cari-koperasi";

export async function checkLocation(payload: CheckLocationPayload) {
  const { data } = await api.post<CheckLocationResponse>(
    "/api/profil-koperasi/check-location",
    payload,
  );
  return data;
}
