"use client";

import { QRCodeSVG } from "qrcode.react";
import { encodeKtaQr } from "@/lib/kta/member";

type KTAQrCodeProps = {
  value?: string;
  size?: number;
  className?: string;
};

export default function KTAQrCode({ value, size = 96, className }: KTAQrCodeProps) {
  const qrValue = value ?? encodeKtaQr();

  return (
    <div className={`bg-white p-3 rounded-xl inline-flex ${className ?? ""}`}>
      <QRCodeSVG
        value={qrValue}
        size={size}
        level="M"
        includeMargin={false}
        aria-label="QR Code KTA Digital"
      />
    </div>
  );
}
