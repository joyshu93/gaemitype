import Script from "next/script";
import { adsConfig } from "@/lib/ads";

export function AdsenseScript() {
  if (!adsConfig.enabled || !adsConfig.client) {
    return null;
  }

  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.client}`}
      crossOrigin="anonymous"
    />
  );
}
