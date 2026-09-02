export type AdPlacement = "result-footer";

export type AdsConfig = {
  enabled: boolean;
  client: string;
  slots: Record<AdPlacement, string>;
};

const enabledValue = process.env.NEXT_PUBLIC_ENABLE_ADS ?? "false";

export const adsConfig: AdsConfig = {
  enabled: enabledValue === "true",
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  slots: {
    "result-footer": process.env.NEXT_PUBLIC_ADSENSE_RESULT_SLOT ?? ""
  }
};

export function canRenderAdPlacementWithConfig(
  config: AdsConfig,
  placement: AdPlacement
) {
  return (
    config.enabled &&
    config.client.length > 0 &&
    config.slots[placement].length > 0
  );
}

export function canRenderAdPlacement(placement: AdPlacement) {
  return canRenderAdPlacementWithConfig(adsConfig, placement);
}

export function getAdSenseScriptSrc(
  config: AdsConfig,
  placement: AdPlacement
) {
  if (!canRenderAdPlacementWithConfig(config, placement)) {
    return null;
  }

  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.client}`;
}
