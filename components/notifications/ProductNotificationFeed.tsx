"use client";

import Link from "next/link";
import { useProductNotificationStore } from "@/lib/notifications/store";
import { NOTIFICATION_TYPE_META } from "@/lib/notifications/product-dummy";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRp(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export default function ProductNotificationFeed({
  limit,
  showHeader = true,
}: {
  limit?: number;
  showHeader?: boolean;
}) {
  const notifications = useProductNotificationStore((s) => s.notifications);
  const readIds = useProductNotificationStore((s) => s.readIds);
  const markRead = useProductNotificationStore((s) => s.markRead);
  const markAllRead = useProductNotificationStore((s) => s.markAllRead);
  const unreadCount = useProductNotificationStore((s) => s.unreadCount());

  const items = limit ? notifications.slice(0, limit) : notifications;

  return (
    <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
      {showHeader && (
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <h3 className="text-label-sm font-label-sm text-on-surface font-semibold">
              Promo & Stok Gerai KDMP
            </h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full">
                {unreadCount} baru
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs text-primary hover:underline"
              >
                Tandai semua dibaca
              </button>
            )}
            {limit && (
              <Link href="/dashboard/promo" className="text-xs text-primary hover:underline">
                Lihat semua
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="divide-y divide-outline-variant/20">
        {items.map((n) => {
          const meta = NOTIFICATION_TYPE_META[n.type];
          const isUnread = !readIds.includes(n.id);
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => markRead(n.id)}
              className={`w-full text-left px-6 py-4 hover:bg-primary/[0.02] transition-colors flex gap-4 ${
                isUnread ? "bg-primary/[0.03]" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta.color}`}
              >
                <span className="material-symbols-outlined text-[20px]">{meta.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${meta.color}`}>
                    {meta.label}
                  </span>
                  {n.waSent && (
                    <span className="flex items-center gap-0.5 text-[10px] text-green-600">
                      <span className="material-symbols-outlined text-[12px]">chat</span>
                      WA terkirim
                    </span>
                  )}
                  {isUnread && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  )}
                </div>
                <p className="text-sm font-semibold text-on-surface mt-1">{n.title}</p>
                <p className="text-sm text-on-surface-variant mt-0.5">{n.message}</p>
                {n.hargaBaru && n.hargaLama && (
                  <p className="text-xs mt-1">
                    <span className="line-through text-on-surface-variant">{formatRp(n.hargaLama)}</span>
                    {" → "}
                    <span className="text-primary font-bold">{formatRp(n.hargaBaru)}</span>
                    {n.diskonPersen && (
                      <span className="ml-1 text-tertiary font-semibold">(-{n.diskonPersen}%)</span>
                    )}
                  </p>
                )}
                <p className="text-[10px] text-on-surface-variant mt-1">{formatDate(n.createdAt)}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
