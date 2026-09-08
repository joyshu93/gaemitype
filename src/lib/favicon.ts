const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img">
  <title>개미타입</title>
  <rect width="64" height="64" rx="15" fill="#14213d"/>
  <g fill="none" stroke="#f2c14e" stroke-linecap="round" stroke-width="4">
    <path d="M23 24 15 17M41 24l8-7M23 34 13 30M41 34l10-4M24 43l-8 7M40 43l8 7"/>
  </g>
  <g fill="#f2c14e">
    <circle cx="32" cy="20" r="8"/>
    <ellipse cx="32" cy="34" rx="9" ry="10"/>
    <ellipse cx="32" cy="49" rx="8" ry="9"/>
  </g>
</svg>`;

export function createFaviconResponse(): Response {
  return new Response(FAVICON_SVG, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Content-Type": "image/svg+xml; charset=utf-8"
    }
  });
}
