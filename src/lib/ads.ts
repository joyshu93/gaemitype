export type AdPlacement = "result-footer";

const enabledValue = process.env.NEXT_PUBLIC_ENABLE_ADS ?? "false";

export const adsConfig = {
  enabled: enabledValue === "true",
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  slots: {
    "result-footer": process.env.NEXT_PUBLIC_ADSENSE_RESULT_SLOT ?? ""
  }
} as const;

export function canRenderAdPlacement(placement: AdPlacement) {
  return (
    adsConfig.enabled &&
    adsConfig.client.length > 0 &&
    adsConfig.slots[placement].length > 0
  );
}
