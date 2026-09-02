import assert from "node:assert/strict";
import test from "node:test";
import {
  canRenderAdPlacementWithConfig,
  getAdSenseScriptSrc,
  type AdsConfig
} from "./ads.ts";

const completeConfig: AdsConfig = {
  enabled: true,
  client: "ca-pub-1234567890123456",
  slots: {
    "result-footer": "1234567890"
  }
};

test("광고가 비활성화되면 결과 슬롯과 스크립트를 사용하지 않는다", () => {
  const config = { ...completeConfig, enabled: false };

  assert.equal(canRenderAdPlacementWithConfig(config, "result-footer"), false);
  assert.equal(getAdSenseScriptSrc(config, "result-footer"), null);
});

test("client와 slot이 모두 있을 때만 결과 광고 스크립트 주소를 만든다", () => {
  assert.equal(canRenderAdPlacementWithConfig(completeConfig, "result-footer"), true);
  assert.equal(
    getAdSenseScriptSrc(completeConfig, "result-footer"),
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
  );

  const missingSlot = {
    ...completeConfig,
    slots: { "result-footer": "" }
  };
  assert.equal(getAdSenseScriptSrc(missingSlot, "result-footer"), null);
});
