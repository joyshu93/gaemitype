import assert from "node:assert/strict";
import test from "node:test";
import { getGuide, GUIDES, type GuideSlug } from "./guides.mts";
import { QUESTIONS } from "./questions.ts";

test("가이드 가상 답변은 20문항 전체를 집계하고 양쪽 원문을 그대로 연결한다", async () => {
  const { RESULT_READING_ANSWERS, RESULT_READING_EXAMPLE } = await import("./result-reading-example.ts");
  assert.deepEqual(Object.keys(RESULT_READING_ANSWERS).sort(), QUESTIONS.map((q) => q.id).sort());
  assert.equal(Object.values(RESULT_READING_ANSWERS).join(""), "01010010100101001010");
  assert.equal(RESULT_READING_EXAMPLE.code, "ALRD");
  assert.equal(RESULT_READING_EXAMPLE.name, "기준설계형");
  assert.deepEqual(RESULT_READING_EXAMPLE.axes.map((axis) => [axis.key, axis.left.count, axis.right.count, axis.selectedCode]), [
    ["AP", 3, 2, "A"], ["LT", 3, 2, "L"], ["RI", 3, 2, "R"], ["DC", 3, 2, "D"]
  ]);
  const allAnswers = RESULT_READING_EXAMPLE.axes.flatMap((axis) => axis.answers);
  assert.equal(allAnswers.length, 20);
  assert.equal(allAnswers.map((answer) => answer.selectedCode).join(""), ["APAPA", "LTLTL", "RIRIR", "DCDCD"].join(""));
  allAnswers.forEach((answer, index) => {
    const question = QUESTIONS[index];
    assert.equal(answer.questionId, question.id);
    assert.equal(answer.questionNumber, index + 1);
    assert.equal(answer.prompt, question.prompt);
    assert.equal(answer.selectedOptionLabel, question.options[(index % 5) % 2 as 0 | 1].label);
  });
  assert.deepEqual(RESULT_READING_EXAMPLE.axes.map((axis) => axis.examples.map((answer) => answer.questionNumber)), [
    [1, 2], [6, 7], [11, 12], [16, 17]
  ]);
});

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
