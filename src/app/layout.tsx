import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdsenseScript } from "@/components/ads/adsense-script";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "개미타입",
  description: "투자 습관과 판단 성향을 16타입으로 가볍게 읽어보는 테스트",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "개미타입",
    description: "투자 습관과 판단 성향을 16타입으로 가볍게 읽어보는 테스트",
    type: "website",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "개미타입",
    description: "투자 습관과 판단 성향을 16타입으로 가볍게 읽어보는 테스트"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <AdsenseScript />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
