import type { TypeCode } from "@/domain/types";
import { getSharedResultFromCode } from "@/domain/scoring";
import { getResultImagePath } from "@/lib/result-images";

const SERVICE_NAME = "개미타입";
const DEFAULT_DESCRIPTION =
  "일상 선택에 담긴 판단 습관을 가볍게 돌아보는 개미타입 결과예요.";

export function getResultOgImagePath(code?: TypeCode) {
  if (!code) {
    return undefined;
  }

  // For now, reuse the existing per-type result image.
  // This can later switch to /og/results/${code}.png without changing callers.
  return getResultImagePath(code);
}

export function buildResultMetadata(code: string, siteUrl: string) {
  const sharedResult = getSharedResultFromCode(code, siteUrl);

  if (!sharedResult) {
    return {
      title: `${SERVICE_NAME} 결과`,
      description: DEFAULT_DESCRIPTION,
      url: `${siteUrl}/result`,
      imageUrl: undefined
    };
  }

  return {
    title: `${sharedResult.profile.name} (${sharedResult.code}) | ${SERVICE_NAME}`,
    description: `${sharedResult.profile.headline}. 일상 선택을 돌아보는 ${SERVICE_NAME} 결과예요.`,
    url: `${siteUrl}/result?code=${sharedResult.code}`,
    imageUrl: `${siteUrl}${getResultOgImagePath(sharedResult.code)}`
  };
}
