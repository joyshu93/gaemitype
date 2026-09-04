import assert from "node:assert/strict";
import test from "node:test";
import { GUIDES } from "./guides.mts";

test("가이드는 완성된 3개 문서만 공개한다", () => {
  assert.equal(GUIDES.length, 3);
});

test("가이드의 경로와 메타데이터는 비어 있거나 중복되지 않는다", () => {
  const slugs = GUIDES.map((guide) => guide.slug);
  const titles = GUIDES.map((guide) => guide.title);

  assert.equal(new Set(slugs).size, GUIDES.length);
  assert.equal(new Set(titles).size, GUIDES.length);

  for (const guide of GUIDES) {
    assert.match(guide.slug, /^[a-z0-9-]+$/);
    assert.ok(guide.title.trim().length > 0);
    assert.ok(guide.description.trim().length > 0);
    assert.ok(guide.eyebrow.trim().length > 0);
  }
});
