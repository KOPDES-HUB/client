"use client";

import DailyLoginWidget from "@/components/daily-login/DailyLoginWidget";
import ProductNotificationFeed from "@/components/notifications/ProductNotificationFeed";

export default function DashboardEngagement() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DailyLoginWidget compact />
      <ProductNotificationFeed limit={3} />
    </div>
  );
}
