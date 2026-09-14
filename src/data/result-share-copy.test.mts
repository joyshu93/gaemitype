import assert from "node:assert/strict";
import test from "node:test";
import { getResultShareCopy } from "./result-share-copy.ts";

test("공유 문구는 코드의 공식 이름과 별칭을 한 가지 문안으로 제공한다", () => {
  assert.deepEqual(getResultShareCopy("PTIC"), {
    code: "PTIC",
    name: "장면반응형",
    headline: "달라진 장면에 맞춰보는 개미",
    text: "이번 타입은 장면반응형. 달라진 장면에 맞춰보는 개미예요."
  });
});
