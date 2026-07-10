import type { SessionQrPayload } from "./types";
import type { ParticipationSession } from "./types";

export function encodeSessionQr(session: ParticipationSession): string {
  const payload: SessionQrPayload = {
    type: "SIMPUL_SESSION",
    v: 1,
    sessionId: session.id,
    sessionType: session.type,
    title: session.title,
  };
  return JSON.stringify(payload);
}

export function parseSessionQr(raw: string): SessionQrPayload | null {
  try {
    const data = JSON.parse(raw) as SessionQrPayload;
    if (data.type !== "SIMPUL_SESSION" || !data.sessionId) return null;
    return data;
  } catch {
    return null;
  }
}
