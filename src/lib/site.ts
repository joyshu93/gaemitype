const DEFAULT_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value?: string) {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function getSiteUrl() {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL
  );
}
