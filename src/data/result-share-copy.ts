import { TYPE_PROFILES } from "./type-profiles.ts";
import type { TypeCode } from "../domain/types.ts";

export type ResultShareCopyItem = {
  code: TypeCode;
  name: string;
  headline: string;
  text: string;
};

export const RESULT_SHARE_COPY: ResultShareCopyItem[] = TYPE_PROFILES.map((profile) => ({
  code: profile.code,
  name: profile.name,
  headline: profile.headline,
  text: profile.shareText
}));

export const RESULT_SHARE_COPY_MAP: Record<TypeCode, ResultShareCopyItem> =
  RESULT_SHARE_COPY.reduce(
    (acc, item) => {
      acc[item.code] = item;
      return acc;
    },
    {} as Record<TypeCode, ResultShareCopyItem>
  );

export function getResultShareCopy(code: TypeCode) {
  return RESULT_SHARE_COPY_MAP[code];
}
