"use client";

import Link from "next/link";
import { useCanAccessVoting } from "@/hooks/useAttendance";
import { getSessionById } from "@/lib/participation/sessions";

type AttendanceGateProps = {
  votingSessionId: string;
  children: React.ReactNode;
};

export default function AttendanceGate({ votingSessionId, children }: AttendanceGateProps) {
  const { canAccess, reason, hasRatAttendance, hasVotingAttendance, requiredRatSessionId } =
    useCanAccessVoting(votingSessionId);
  const session = getSessionById(votingSessionId);

  if (canAccess) return <>{children}</>;

  return (
    <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-8 text-center max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-3xl text-amber-700">qr_code_scanner</span>
      </div>
      <h3 className="text-headline-md font-headline-md text-on-surface mb-2">
        Absensi KTA Diperlukan
      </h3>
      <p className="text-body-md text-on-surface-variant mb-6">{reason}</p>

      <div className="space-y-2 text-left mb-6">
        <div
          className={`flex items-center gap-3 p-3 rounded-xl border ${
            hasRatAttendance
              ? "border-primary/30 bg-primary/5"
              : "border-outline-variant/30 bg-surface-bg"
          }`}
        >
          <span
            className={`material-symbols-outlined ${
              hasRatAttendance ? "text-primary" : "text-on-surface-variant"
            }`}
            style={{ fontVariationSettings: hasRatAttendance ? "'FILL' 1" : "'FILL' 0" }}
          >
            {hasRatAttendance ? "check_circle" : "radio_button_unchecked"}
          </span>
          <div>
            <p className="text-label-sm font-label-sm text-on-surface">Absensi E-RAT (scan KTA)</p>
            <p className="text-label-xs text-on-surface-variant">Wajib untuk voting terkait RAT</p>
          </div>
        </div>
        <div
          className={`flex items-center gap-3 p-3 rounded-xl border ${
            hasVotingAttendance
              ? "border-primary/30 bg-primary/5"
              : "border-outline-variant/30 bg-surface-bg"
          }`}
        >
          <span
            className={`material-symbols-outlined ${
              hasVotingAttendance ? "text-primary" : "text-on-surface-variant"
            }`}
            style={{ fontVariationSettings: hasVotingAttendance ? "'FILL' 1" : "'FILL' 0" }}
          >
            {hasVotingAttendance ? "check_circle" : "radio_button_unchecked"}
          </span>
          <div>
            <p className="text-label-sm font-label-sm text-on-surface">
              Absensi Voting: {session?.title ?? votingSessionId}
            </p>
            <p className="text-label-xs text-on-surface-variant">Scan KTA di lokasi / sesi voting</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {!hasRatAttendance && (
          <Link
            href={`/scan?sessionId=${requiredRatSessionId}&sessionType=rat`}
            className="px-5 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all"
          >
            Absen E-RAT dengan KTA
          </Link>
        )}
        {hasRatAttendance && !hasVotingAttendance && (
          <Link
            href={`/scan?sessionId=${votingSessionId}&sessionType=voting`}
            className="px-5 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all"
          >
            Absen Voting dengan KTA
          </Link>
        )}
        <Link
          href="/dashboard/kta"
          className="px-5 py-3 border border-mint-200 text-primary rounded-xl text-label-sm font-label-sm hover:bg-primary/5 transition-all"
        >
          Lihat KTA Saya
        </Link>
      </div>
    </div>
  );
}
