import assert from "node:assert/strict";
import test from "node:test";
import { getGuide, GUIDES, type GuideSlug } from "./guides.mts";

test("가이드는 완성된 3개 문서만 공개한다", () => {
  assert.equal(GUIDES.length, 3);
});

test("가이드의 경로와 메타데이터는 비어 있거나 중복되지 않는다", () => {
  const slugs = GUIDES.map((guide) => guide.slug);
  const titles = GUIDES.map((guide) => guide.title);
  const descriptions = GUIDES.map((guide) => guide.description);

  assert.equal(new Set(slugs).size, GUIDES.length);
  assert.equal(new Set(titles).size, GUIDES.length);
  assert.equal(new Set(descriptions).size, GUIDES.length);

  for (const guide of GUIDES) {
    assert.match(guide.slug, /^[a-z0-9-]+$/);
    assert.ok(guide.title.trim().length > 0);
    assert.ok(guide.description.trim().length > 0);
    assert.ok(guide.eyebrow.trim().length > 0);
  }
});

test("슬러그로 가이드를 조회하고 존재하지 않는 슬러그는 명확히 실패한다", () => {
  assert.equal(getGuide("decision-journal").slug, "decision-journal");
  assert.throws(
    () => getGuide("missing-guide" as GuideSlug),
    /Unknown guide slug: missing-guide/
  );
});

test("판단 기록 가이드는 세 줄 방법과 일치하는 제목을 사용한다", () => {
  const guide = GUIDES.find((item) => item.slug === "decision-journal");

  assert.equal(guide?.title, "내 판단 습관을 세 줄로 기록하는 법");
});
