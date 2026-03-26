"use client";

import { useEffect, useRef } from "react";
import type { AdPlacement } from "@/lib/ads";
import { adsConfig, canRenderAdPlacement } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  placement: AdPlacement;
  className?: string;
  minHeight?: number;
};

export function AdSlot({
  placement,
  className = "",
  minHeight = 120
}: AdSlotProps) {
  const initializedRef = useRef(false);
  const slotId = adsConfig.slots[placement];
  const shouldRender = canRenderAdPlacement(placement);

  useEffect(() => {
    if (!shouldRender || initializedRef.current) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
      initializedRef.current = true;
    } catch {
      // Keep the result page stable even if an ad blocker or load failure interferes.
    }
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={className}
      style={{ minHeight }}
      aria-label="advertisement"
    >
      <ins
        className="adsbygoogle block h-full w-full"
        style={{ display: "block", minHeight }}
        data-ad-client={adsConfig.client}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
