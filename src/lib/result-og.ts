import { getResultShareCopy } from "@/data/result-share-copy";
import type { TypeCode } from "@/domain/types";
import { getSharedResultFromCode } from "@/domain/scoring";
import { getResultImagePath } from "@/lib/result-images";

const SERVICE_NAME = "개미타입";
const DEFAULT_DESCRIPTION =
  "투자 습관과 판단 성향을 가볍게 돌아보는 16타입 결과예요.";

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

  const shareCopy = getResultShareCopy(sharedResult.code);
  const shareDescription =
    shareCopy?.cardShareLine ??
    shareCopy?.cardHeadline ??
    sharedResult.profile.shareText ??
    sharedResult.profile.headline ??
    DEFAULT_DESCRIPTION;

  return {
    title: `${sharedResult.profile.name} (${sharedResult.code}) | ${SERVICE_NAME}`,
    description: `${shareDescription} ${SERVICE_NAME} 결과예요.`,
    url: `${siteUrl}/result?code=${sharedResult.code}`,
    imageUrl: `${siteUrl}${getResultOgImagePath(sharedResult.code)}`
  };
}
