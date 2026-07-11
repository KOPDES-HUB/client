"use client";

import TopBar from "@/components/layout/TopBar";
import ProductNotificationFeed from "@/components/notifications/ProductNotificationFeed";
import Link from "next/link";

export default function PromoPage() {
  return (
    <>
      <TopBar
        title="Promo & Info Produk"
        breadcrumb={["Dashboard", "Promo Gerai KDMP"]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full space-y-6">
        <div className="bg-gradient-to-r from-primary to-primary-container rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-headline-md font-headline-md">Info Gerai KDMP</h2>
              <p className="text-body-md text-primary-fixed mt-1 max-w-lg">
                Pantau harga turun, diskon/promo, dan update stok produk koperasi.
                Notifikasi juga dikirim otomatis ke WhatsApp anggota e-KTA.
              </p>
            </div>
            <Link
              href="/dashboard/daily-login"
              className="shrink-0 px-5 py-2.5 bg-white text-primary rounded-xl text-label-sm font-label-sm hover:bg-white/90 transition-all"
            >
              Klaim Poin Harian
            </Link>
          </div>
        </div>

        <ProductNotificationFeed showHeader />
      </div>
    </>
  );
}
