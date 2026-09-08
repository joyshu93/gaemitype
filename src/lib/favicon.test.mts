import assert from "node:assert/strict";
import test from "node:test";

test("favicon 요청에 캐시 가능한 SVG 이미지를 반환한다", async () => {
  let faviconModule: typeof import("./favicon.ts");

  try {
    faviconModule = await import("./favicon.ts");
  } catch {
    assert.fail("favicon 응답 모듈이 아직 없습니다");
  }

  const response = faviconModule.createFaviconResponse();
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/svg+xml; charset=utf-8");
  assert.equal(response.headers.get("cache-control"), "public, max-age=86400");
  assert.match(body, /^<svg[^>]+viewBox="0 0 64 64"/);
  assert.match(body, /<title>개미타입<\/title>/);
  assert.match(body, /<\/svg>$/);
});

test("favicon.ico 요청을 favicon 응답 경로로 내부 재작성한다", async () => {
  const { default: nextConfig } = await import("../../next.config.ts");

  assert.equal(typeof nextConfig.rewrites, "function");

  const rewrites = await nextConfig.rewrites?.();

  assert.deepEqual(rewrites, [
    {
      source: "/favicon.ico",
      destination: "/api/favicon"
    }
  ]);
});
