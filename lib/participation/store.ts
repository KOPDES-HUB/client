"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AttendanceRecord } from "./types";
import { DEMO_KTA_MEMBER } from "@/lib/kta/member";

type ParticipationState = {
  attendances: AttendanceRecord[];
  recordAttendance: (input: {
    sessionId: string;
    sessionType: AttendanceRecord["sessionType"];
    sessionTitle: string;
    nomorKta?: string;
    anggotaRef?: string;
    nama?: string;
  }) => AttendanceRecord;
  hasAttendance: (sessionId: string) => boolean;
  getAttendance: (sessionId: string) => AttendanceRecord | undefined;
  clearAttendances: () => void;
};

export const useParticipationStore = create<ParticipationState>()(
  persist(
    (set, get) => ({
      attendances: [],

      recordAttendance: (input) => {
        const record: AttendanceRecord = {
          sessionId: input.sessionId,
          sessionType: input.sessionType,
          sessionTitle: input.sessionTitle,
          nomorKta: input.nomorKta ?? DEMO_KTA_MEMBER.nomorKta,
          anggotaRef: input.anggotaRef ?? DEMO_KTA_MEMBER.anggotaRef,
          nama: input.nama ?? DEMO_KTA_MEMBER.nama,
          scannedAt: new Date().toISOString(),
          method: "kta_qr",
        };

        set((state) => ({
          attendances: [
            ...state.attendances.filter((a) => a.sessionId !== input.sessionId),
            record,
          ],
        }));

        return record;
      },

      hasAttendance: (sessionId) =>
        get().attendances.some((a) => a.sessionId === sessionId),

      getAttendance: (sessionId) =>
        get().attendances.find((a) => a.sessionId === sessionId),

      clearAttendances: () => set({ attendances: [] }),
    }),
    { name: "simpul-participation" },
  ),
);
