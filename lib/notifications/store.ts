"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DUMMY_PRODUCT_NOTIFICATIONS } from "./product-dummy";
import type { ProductNotification } from "./product-types";

type NotificationState = {
  notifications: ProductNotification[];
  readIds: string[];
  markRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: () => number;
};

export const useProductNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: DUMMY_PRODUCT_NOTIFICATIONS,
      readIds: [],

      markRead: (id) =>
        set((s) => ({
          readIds: s.readIds.includes(id) ? s.readIds : [...s.readIds, id],
        })),

      markAllRead: () =>
        set((s) => ({
          readIds: s.notifications.map((n) => n.id),
        })),

      unreadCount: () => {
        const { notifications, readIds } = get();
        return notifications.filter((n) => !readIds.includes(n.id)).length;
      },
    }),
    { name: "simpul-product-notifications" },
  ),
);
