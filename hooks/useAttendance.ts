"use client";

import { useParticipationStore } from "@/lib/participation/store";
import { RAT_SESSION_2024, getSessionById } from "@/lib/participation/sessions";

export function useAttendance(sessionId: string) {
  const hasAttendance = useParticipationStore((s) => s.hasAttendance(sessionId));
  const attendance = useParticipationStore((s) => s.getAttendance(sessionId));
  return { hasAttendance, attendance };
}

export function useCanAccessVoting(votingSessionId: string) {
  const session = getSessionById(votingSessionId);
  const hasVotingAttendance = useParticipationStore((s) =>
    s.hasAttendance(votingSessionId),
  );
  const hasRatAttendance = useParticipationStore((s) =>
    s.hasAttendance(session?.requiredRatSessionId ?? RAT_SESSION_2024.id),
  );

  if (!session) {
    return {
      canAccess: false,
      reason: "Sesi voting tidak ditemukan",
      needsRat: false,
      needsVotingCheckIn: false,
      hasRatAttendance: false,
      hasVotingAttendance: false,
    };
  }

  const needsRat = session.requiresRatAttendance ?? false;
  const needsVotingCheckIn = true;

  const canAccess =
    (!needsRat || hasRatAttendance) && hasVotingAttendance;

  let reason = "";
  if (needsRat && !hasRatAttendance) {
    reason = "Anda harus absen di E-RAT dengan scan KTA terlebih dahulu.";
  } else if (!hasVotingAttendance) {
    reason = "Anda harus melakukan absensi digital dengan KTA untuk sesi voting ini.";
  }

  return {
    canAccess,
    reason,
    needsRat,
    needsVotingCheckIn,
    hasRatAttendance,
    hasVotingAttendance,
    requiredRatSessionId: session.requiredRatSessionId ?? RAT_SESSION_2024.id,
  };
}

export function useCanAccessRat() {
  const hasRatAttendance = useParticipationStore((s) =>
    s.hasAttendance(RAT_SESSION_2024.id),
  );
  const attendance = useParticipationStore((s) =>
    s.getAttendance(RAT_SESSION_2024.id),
  );
  return { hasRatAttendance, attendance, sessionId: RAT_SESSION_2024.id };
}
