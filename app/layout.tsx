import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "SIMPUL Merah Putih — Tata Kelola Koperasi Digital",
  description:
    "Platform digital koperasi desa: KTA, Simpanan, E-Voting, LMS, E-RAT dalam satu platform terintegrasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} h-full`}
      suppressHydrationWarning
    >
      <body className={`${jakarta.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryProvider> {children} </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
