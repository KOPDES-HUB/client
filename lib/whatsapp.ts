/**
 * SIMPUL Merah Putih — WhatsApp Business API service layer
 *
 * Saat ini menggunakan implementasi stub/mock.
 * Untuk produksi: ganti body `callProvider` dengan request ke
 * Twilio / Fonnte / Wablas / Meta Cloud API — interface tidak berubah.
 */

export type WAStatus = "TERKIRIM" | "GAGAL" | "PENDING";

export interface WASendResult {
  success: boolean;
  status: WAStatus;
  messageId?: string;
  error?: string;
  sentAt?: Date;
}

export interface WATemplateVars {
  nama?: string;
  jumlah?: string;
  tanggal?: string;
  link?: string;
  kodeReferral?: string;
  [key: string]: string | undefined;
}

/**
 * Interpolate template dengan variabel — {{nama}}, {{jumlah}}, dll.
 * Contoh: "Halo {{nama}}, SHU Anda: {{jumlah}}" → "Halo Budi, SHU Anda: Rp 1.200.000"
 */
export function interpolateTemplate(template: string, vars: WATemplateVars): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`);
}

/**
 * Kirim pesan WhatsApp ke satu nomor.
 *
 * @param phone  - Nomor HP format internasional tanpa "+", mis. "6281234567890"
 * @param message - Pesan yang sudah di-interpolate
 *
 * Stub: log ke console & return success. Swap `callProvider` untuk produksi.
 */
export async function sendWhatsAppMessage(
  phone: string,
  message: string
): Promise<WASendResult> {
  const normalizedPhone = phone.replace(/^0/, "62").replace(/\D/g, "");

  try {
    const result = await callProvider(normalizedPhone, message);
    return result;
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error(`[WA] Gagal kirim ke ${normalizedPhone}:`, error);
    return { success: false, status: "GAGAL", error };
  }
}

/**
 * Kirim notifikasi ke banyak penerima sekaligus (batch).
 * Menggunakan Promise.allSettled — satu gagal tidak batalkan yang lain.
 */
export async function sendWhatsAppBatch(
  targets: { phone: string; message: string }[]
): Promise<WASendResult[]> {
  const results = await Promise.allSettled(
    targets.map(({ phone, message }) => sendWhatsAppMessage(phone, message))
  );

  return results.map((r) =>
    r.status === "fulfilled"
      ? r.value
      : { success: false, status: "GAGAL" as WAStatus, error: String(r.reason) }
  );
}

// ─── Helper templates per trigger ────────────────────────────────────────────

export const DEFAULT_TEMPLATES: Record<string, string> = {
  KTA_DISETUJUI:
    "Selamat {{nama}}! 🎉 KTA Anda di Koperasi SIMPUL Merah Putih telah *disetujui*. Silakan login untuk melihat KTA Digital Anda: {{link}}",

  SHU_UPDATE:
    "Halo {{nama}}, estimasi SHU Anda telah diperbarui menjadi *{{jumlah}}*. Detail selengkapnya di: {{link}}",

  VOTING_BARU:
    "📊 Voting baru tersedia: *{{judul}}*. Sampaikan suara Anda sebelum {{tanggal}}. Buka: {{link}}",

  RAT_BARU:
    "📢 Rapat Anggota Tahunan dijadwalkan pada *{{tanggal}}*. Informasi lengkap: {{link}}",

  RAT_REMINDER_H1:
    "⏰ Pengingat: RAT SIMPUL Merah Putih *besok, {{tanggal}}*. Hadir tepat waktu ya, {{nama}}! Detail: {{link}}",
};

// ─── Stub provider — ganti dengan implementasi nyata ─────────────────────────

async function callProvider(phone: string, message: string): Promise<WASendResult> {
  // TODO: Ganti dengan salah satu:
  //   • Fonnte:  POST https://api.fonnte.com/send  { target: phone, message }
  //   • Wablas:  POST https://xxx.wablas.com/api/send-message
  //   • Twilio:  POST https://api.twilio.com/2010-04-01/Accounts/{SID}/Messages.json
  //   • Meta Cloud API: POST https://graph.facebook.com/v18.0/{phone_number_id}/messages

  console.log(`[WA STUB] → ${phone}: ${message.slice(0, 80)}…`);

  // Simulasi network delay 200–800ms
  await new Promise((r) => setTimeout(r, 200 + Math.random() * 600));

  return {
    success: true,
    status: "TERKIRIM",
    messageId: `stub_${Date.now()}_${phone.slice(-4)}`,
    sentAt: new Date(),
  };
}
