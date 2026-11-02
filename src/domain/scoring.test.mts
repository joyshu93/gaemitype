import assert from "node:assert/strict";
import test from "node:test";
import { buildResultSummary, getResultFromAnswersOrCode } from "./scoring.ts";
import { TYPE_PROFILES } from "../data/type-profiles.ts";
import {
  getAxisSelectionExplanation,
  getAxisReflection as reflectionFor,
  getResultDisplayState
} from "./result-presentation.ts";

const baseUrl = "https://example.com";

test("회고는 혼합 답변의 실제 Q번호와 선택만 연결하고 같은 코드의 답변 차이를 보존한다", () => {
  const first = getResultFromAnswersOrCode({ code: "ALRD", serializedAnswers: "01010".repeat(4), baseUrl })!;
  const second = getResultFromAnswersOrCode({ code: "ALRD", serializedAnswers: "10100".repeat(4), baseUrl })!;
  const firstText = reflectionFor(first.axisResults[0]);
  assert.ok(firstText.includes("Q1에서는 ‘후기와 메뉴를 먼저 검색해본다’"));
  assert.ok(firstText.includes("Q2에서는 ‘일단 출발하고 가는 길에 하나씩 정한다’"));
  assert.ok(firstText.endsWith("두 장면에서 먼저 고른 방식이 달랐던 이유가 떠오르나요?"));
  const secondText = reflectionFor(second.axisResults[0]);
  assert.ok(secondText.includes("Q2에서는 ‘갈 곳과 순서를 미리 정해두고 출발한다’"));
  assert.ok(secondText.includes("Q1에서는 ‘일단 가보고 현장에서 생각한다’"));
  assert.notEqual(firstText, secondText);
  for (const axis of first.axisResults) {
    const text = reflectionFor(axis);
    for (const example of axis.examples!) {
      assert.ok(text.includes(`Q${example.questionNumber}에서는 ‘${example.selectedOptionLabel}’`));
    }
  }
});

test("한쪽으로 모인 답변의 회고는 실제 한 선택만 인용하고 반대 선택을 만들지 않는다", () => {
  for (const [code, serializedAnswers, quoted, absent] of [
    ["ALRD", "0".repeat(20), "Q1에서는 ‘후기와 메뉴를 먼저 검색해본다’", "일단 가보고 현장에서 생각한다"],
    ["PTIC", "1".repeat(20), "Q1에서는 ‘일단 가보고 현장에서 생각한다’", "후기와 메뉴를 먼저 검색해본다"]
  ]) {
    const result = getResultFromAnswersOrCode({ code, serializedAnswers, baseUrl })!;
    const text = reflectionFor(result.axisResults[0]);
    assert.ok(text.includes(quoted));
    assert.ok(!text.includes(absent));
    assert.ok(text.endsWith("다른 상황에서는 먼저 고른 방식이 달랐던 적도 있나요?"));
  }
});

test("공유 결과와 답변 확인 실패에는 개인 회고가 없다", () => {
  for (const serializedAnswers of [undefined, "", "0".repeat(21), "1".repeat(20)]) {
    const result = getResultFromAnswersOrCode({ code: "ALRD", serializedAnswers, baseUrl })!;
    assert.equal(result.mode, "shared");
    for (const axis of result.axisResults) assert.equal(reflectionFor(axis), "");
  }
});

test("개정 문항의 답변은 새 원문을 인용하고 버전 없는 이전 답변은 당시 원문을 유지한다", () => {
  const params = { code: "ALRD", serializedAnswers: "0".repeat(20), baseUrl };
  const current = getResultFromAnswersOrCode({ ...params, questionVersion: "2" })!;
  const legacy = getResultFromAnswersOrCode(params)!;
  assert.equal(current.mode, "answers");
  assert.equal(legacy.mode, "answers");
  assert.equal(current.axisResults[1].examples![0].selectedOptionLabel, "앞으로 몇 주 동안 보는 흐름에 미칠 영향을 본다");
  assert.equal(legacy.axisResults[1].examples![0].selectedOptionLabel, "구독하고 그 채널의 다른 영상을 섭렵한다");
  assert.equal(current.shareUrl, `${baseUrl}/result?code=ALRD`);
});

test("알 수 없거나 중복된 문항 버전은 답변을 새 문항의 개인 근거로 해석하지 않는다", () => {
  for (const questionVersion of ["3", "", ["2", "2"]]) {
    const result = getResultFromAnswersOrCode({ code: "ALRD", serializedAnswers: "0".repeat(20), questionVersion, baseUrl })!;
    assert.equal(result.mode, "shared");
    assert.equal(result.sharedReason, "invalid-answers");
    assert.equal(result.axisResults.every((axis) => axis.examples === undefined), true);
  }
});

test("16타입의 돌아볼 질문은 코드 순서의 네 축에 일관되게 대응한다", () => {
  const questionsByPole = new Map<string, string>();
  for (const profile of TYPE_PROFILES) {
    assert.equal(profile.reflections.length, 4, profile.code);
    const result = getResultFromAnswersOrCode({ code: profile.code, baseUrl });
    assert.ok(result);
    profile.reflections.forEach((question, index) => {
      const pole = profile.code[index];
      assert.equal(result.axisResults[index].selectedCode, pole);
      assert.ok(question.trim().length > 0);
      if (questionsByPole.has(pole)) assert.equal(question, questionsByPole.get(pole));
      else questionsByPole.set(pole, question);
    });
  }
  assert.equal(questionsByPole.size, 8);
  assert.equal(new Set(questionsByPole.values()).size, 8);
});

test("한 글자 다른 32쌍은 해당 축의 돌아볼 질문 하나만 달라진다", () => {
  let pairCount = 0;
  TYPE_PROFILES.forEach((profile, i) => {
    for (const neighbor of TYPE_PROFILES.slice(i + 1)) {
      const changedAxes = [...profile.code].flatMap((letter, index) =>
        letter !== neighbor.code[index] ? [index] : []
      );
      if (changedAxes.length !== 1) continue;
      pairCount += 1;
      const changedQuestions = profile.reflections.flatMap((question, index) =>
        question !== neighbor.reflections[index] ? [index] : []
      );
      assert.deepEqual(changedQuestions, changedAxes, `${profile.code}/${neighbor.code}`);
    }
  });
  assert.equal(pairCount, 32);
});

test("21자리 answers는 개인 결과가 아니라 답변 확인 실패 공유 결과가 된다", () => {
  const result = getResultFromAnswersOrCode({
    code: "ALRD",
    serializedAnswers: "0".repeat(21),
    baseUrl
  });

  assert.equal(result?.mode, "shared");
  assert.equal(result?.sharedReason, "invalid-answers");
  assert.equal(result?.axisResults.every((item) => item.leftScore === undefined), true);
});

test("유효한 응답은 집계에 사용한 실제 선택에서 축별 첫 양쪽 예시를 만든다", () => {
  const result = getResultFromAnswersOrCode({
    code: "ALRD",
    serializedAnswers: "10100".repeat(4),
    baseUrl
  });
  const ap = result?.axisResults.find((item) => item.key === "AP");

  assert.equal(result?.mode, "answers");
  assert.deepEqual(ap?.examples, [
    {
      questionId: "q02",
      questionNumber: 2,
      prompt: "주말에 짧게 놀러 가기로 했어요. 출발 전 당신 모습에 더 가까운 쪽은?",
      selectedOptionLabel: "갈 곳과 순서를 미리 정해두고 출발한다",
      selectedCode: "A"
    },
    {
      questionId: "q01",
      questionNumber: 1,
      prompt: "친구가 맛집을 추천했어요. 오늘 저녁에 바로 가볼 수 있다면, 당신은 먼저 어떻게 하나요?",
      selectedOptionLabel: "일단 가보고 현장에서 생각한다",
      selectedCode: "P"
    }
  ]);
});

test("엄격한 URL 입력 경계는 개인 근거를 공유 결과에 만들지 않는다", () => {
  const validAnswers = "01010".repeat(4);
  const cases = [
    { name: "answers 없음", code: "ALRD", answers: undefined, reason: "code-only" },
    { name: "빈 answers", code: "ALRD", answers: "", reason: "invalid-answers" },
    { name: "19자리 answers", code: "ALRD", answers: "0".repeat(19), reason: "invalid-answers" },
    { name: "21자리 answers", code: "ALRD", answers: "0".repeat(21), reason: "invalid-answers" },
    { name: "잘못된 문자", code: "ALRD", answers: `${"0".repeat(19)}x`, reason: "invalid-answers" },
    { name: "중복 answers", code: "ALRD", answers: [validAnswers, validAnswers], reason: "invalid-answers" },
    { name: "코드 불일치", code: "PTIC", answers: "0".repeat(20), reason: "invalid-answers" }
  ] as const;

  for (const item of cases) {
    const result = getResultFromAnswersOrCode({
      code: item.code,
      serializedAnswers: item.answers,
      baseUrl
    });

    assert.equal(result?.mode, "shared", item.name);
    assert.equal(result?.sharedReason, item.reason, item.name);
    assert.equal(result?.axisResults.every((axis) => axis.leftScore === undefined), true, item.name);
    assert.equal(result?.axisResults.every((axis) => axis.examples === undefined), true, item.name);
    assert.equal(result?.shareUrl, `${baseUrl}/result?code=${item.code}`, item.name);
  }

  assert.equal(
    getResultFromAnswersOrCode({ code: undefined, serializedAnswers: validAnswers, baseUrl }),
    null
  );
  assert.equal(
    getResultFromAnswersOrCode({ code: "ZZZZ", serializedAnswers: validAnswers, baseUrl }),
    null
  );
  assert.equal(
    getResultFromAnswersOrCode({ code: ["ALRD", "ALRD"], serializedAnswers: validAnswers, baseUrl }),
    null
  );
});

test("각 승인된 3:2, 4:1, 5:0 집계는 양방향 해설을 만든다", () => {
  const cases = [
    {
      answers: "01010".repeat(4),
      code: "ALRD",
      expected: "이번 다섯 문항에서는 준비형 선택 3개, 현장형 선택 2개였어요. 두 방식을 모두 골랐고 준비형 선택이 하나 더 많았어요."
    },
    {
      answers: "10101".repeat(4),
      code: "PTIC",
      expected: "이번 다섯 문항에서는 준비형 선택 2개, 현장형 선택 3개였어요. 두 방식을 모두 골랐고 현장형 선택이 하나 더 많았어요."
    },
    {
      answers: "00001".repeat(4),
      code: "ALRD",
      expected: "이번 다섯 문항에서는 준비형 선택 4개, 현장형 선택 1개였어요. 준비형을 더 많이 골랐고, 현장형을 고른 답변도 하나 있었어요."
    },
    {
      answers: "11110".repeat(4),
      code: "PTIC",
      expected: "이번 다섯 문항에서는 준비형 선택 1개, 현장형 선택 4개였어요. 현장형을 더 많이 골랐고, 준비형을 고른 답변도 하나 있었어요."
    },
    {
      answers: "0".repeat(20),
      code: "ALRD",
      expected: "이번 다섯 문항에서는 준비형 선택 5개, 현장형 선택 0개였어요. 이번에는 모두 준비형 쪽을 골랐지만, 다른 상황에서도 늘 같은 방식을 고른다는 뜻은 아니에요."
    },
    {
      answers: "1".repeat(20),
      code: "PTIC",
      expected: "이번 다섯 문항에서는 준비형 선택 0개, 현장형 선택 5개였어요. 이번에는 모두 현장형 쪽을 골랐지만, 다른 상황에서도 늘 같은 방식을 고른다는 뜻은 아니에요."
    }
  ];

  for (const item of cases) {
    const result = getResultFromAnswersOrCode({
      code: item.code,
      serializedAnswers: item.answers,
      baseUrl
    });
    const ap = result?.axisResults.find((axis) => axis.key === "AP");

    assert.equal(getAxisSelectionExplanation(ap!), item.expected);
  }
});

test("같은 3:2 코드라도 선택 순서가 다르면 실제 예시가 달라지고, 각 축의 혼합 집계를 유지한다", () => {
  const first = getResultFromAnswersOrCode({
    code: "ALRD",
    serializedAnswers: "01010".repeat(4),
    baseUrl
  });
  const second = getResultFromAnswersOrCode({
    code: "ALRD",
    serializedAnswers: "10100".repeat(4),
    baseUrl
  });

  assert.deepEqual(
    first?.axisResults.map((axis) => [axis.leftScore, axis.rightScore]),
    [[3, 2], [3, 2], [3, 2], [3, 2]]
  );
  assert.deepEqual(
    second?.axisResults.map((axis) => [axis.leftScore, axis.rightScore]),
    [[3, 2], [3, 2], [3, 2], [3, 2]]
  );
  assert.equal(first?.axisResults[0].examples?.[0].questionId, "q01");
  assert.equal(second?.axisResults[0].examples?.[0].questionId, "q02");
  assert.equal(getAxisSelectionExplanation(getResultFromAnswersOrCode({ code: "ALRD", baseUrl })!.axisResults[0]), "");
});

test("축마다 다른 유효 집계도 같은 AnswerState에서 코드와 선택 예시를 만든다", () => {
  const result = getResultFromAnswersOrCode({
    code: "ALRC",
    serializedAnswers: "00000010100000110101",
    baseUrl
  });

  assert.equal(result?.mode, "answers");
  assert.deepEqual(
    result?.axisResults.map((axis) => [axis.leftScore, axis.rightScore]),
    [[5, 0], [3, 2], [4, 1], [2, 3]]
  );
  assert.deepEqual(
    result?.axisResults.map((axis) => axis.examples?.map((example) => example.questionId)),
    [["q01"], ["q06", "q07"], ["q11", "q15"], ["q17", "q16"]]
  );
});

test("표시 상태는 정상 응답, 코드 전용, 답변 확인 실패를 구분한다", () => {
  const answerState = Object.fromEntries(
    Array.from({ length: 20 }, (_, index) => [`q${String(index + 1).padStart(2, "0")}`, 0])
  );
  const personal = buildResultSummary(answerState, baseUrl);
  const codeOnly = getResultFromAnswersOrCode({ code: "ALRD", baseUrl });
  const invalid = getResultFromAnswersOrCode({
    code: "ALRD",
    serializedAnswers: "0".repeat(21),
    baseUrl
  });

  assert.deepEqual(getResultDisplayState(personal), {
    title: "이번 답변으로 나온 결과",
    description: "이 링크의 답변에서 각 축마다 더 많이 고른 쪽을 모았어요. 같은 타입이어도 선택 횟수와 답변 내용은 다를 수 있어요.",
    label: "이번 답변 요약"
  });
  assert.deepEqual(getResultDisplayState(codeOnly!), {
    title: "타입 설명만 담긴 링크",
    description: "이 링크에는 타입 코드만 있어요. 답변 내용과 선택 횟수는 포함되지 않아요.",
    label: "타입 기본 설명"
  });
  assert.deepEqual(getResultDisplayState(invalid!), {
    title: "타입 설명만 보여드려요",
    description: "답변 정보를 확인할 수 없어 타입 코드의 기본 설명만 보여드려요. 선택 횟수와 답변 사례는 표시하지 않아요.",
    label: "타입 기본 설명"
  });
});
