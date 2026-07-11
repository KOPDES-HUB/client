"use client";

import { AppIcon } from "@/components/ui/app-icon";
import { useAttendance } from "@/hooks/useAttendance";

type AttendanceBadgeProps = {
  sessionId: string;
  label?: string;
};

export default function AttendanceBadge({ sessionId, label = "Sudah Absen" }: AttendanceBadgeProps) {
  const { hasAttendance, attendance } = useAttendance(sessionId);

  if (!hasAttendance) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-label-xs font-label-xs">
        <AppIcon name="schedule" className="text-[14px]" />
        Belum Absen
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-label-xs font-label-xs"
      title={attendance ? `KTA: ${attendance.nomorKta} · ${new Date(attendance.scannedAt).toLocaleString("id-ID")}` : undefined}
    >
      <AppIcon name="verified" className="text-[14px]" />
      {label}
    </span>
  );
}
