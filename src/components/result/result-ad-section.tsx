import Script from "next/script";
import { AdSlot } from "@/components/ads/ad-slot";
import { adsConfig, getAdSenseScriptSrc } from "@/lib/ads";

export function ResultAdSection() {
  const scriptSrc = getAdSenseScriptSrc(adsConfig, "result-footer");

  if (!scriptSrc) {
    return null;
  }

  return (
    <>
      <Script
        id="adsense-result-script"
        src={scriptSrc}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <section className="mt-8 rounded-[28px] border border-ink/10 bg-white p-6 shadow-card">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-ink/42">
          광고
        </p>
        <div className="mt-4 rounded-[20px] border border-dashed border-ink/10 bg-sand/45 p-3">
          <AdSlot placement="result-footer" minHeight={140} />
        </div>
      </section>
    </>
  );
}
