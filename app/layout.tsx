import type { Metadata } from "next";
import { Instrument_Serif, Noto_Sans_TC } from "next/font/google";
import { Providers } from "@/lib/providers";
import "./globals.css";

const sans = Noto_Sans_TC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Harbour Crew 智工隊 — 建立您的企業 AI 員工團隊",
  description:
    "香港中小企的本地 AI 員工平台：客服、人資、財務、營運預建員工，辦公室內部署，可訓練、可排程、可稽核。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
