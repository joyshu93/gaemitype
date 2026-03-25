import Image from "next/image";
import { getResultShareCopy } from "@/data/result-share-copy";
import type { TypeCode, TypeProfile } from "@/domain/types";
import { getResultImagePath } from "@/lib/result-images";
import { getResultShareTheme } from "@/lib/result-share-theme";

type ResultShareCardProps = {
  code: TypeCode;
  profile: Pick<TypeProfile, "name" | "headline" | "shareText">;
  imageSrc?: string;
  serviceName?: string;
  className?: string;
};

export function ResultShareCard({
  code,
  profile,
  imageSrc,
  serviceName = "개미타입",
  className = ""
}: ResultShareCardProps) {
  const theme = getResultShareTheme(code);
  const shareCopy = getResultShareCopy(code);
  const resolvedImageSrc = imageSrc ?? getResultImagePath(code);
  const cardName = shareCopy?.cardName ?? profile.name;
  const cardHeadline = shareCopy?.cardHeadline ?? profile.headline;
  const cardShareLine = shareCopy?.cardShareLine ?? profile.shareText;

  return (
    <article
      className={`overflow-hidden rounded-[28px] border p-5 shadow-card ${theme.backgroundClassName} ${theme.borderClassName} ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={`text-xs font-medium uppercase tracking-[0.28em] ${theme.mutedTextClassName}`}
          >
            {serviceName}
          </p>
          <div
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.24em] ${theme.accentClassName}`}
          >
            {code}
          </div>
        </div>
        <div
          className={`rounded-full px-3 py-1 text-xs font-medium ${theme.surfaceClassName} ${theme.mutedTextClassName}`}
        >
          결과 카드
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-[22px] border border-white/60 bg-white/55">
        <Image
          src={resolvedImageSrc}
          alt={`${cardName} 공유 카드 이미지`}
          width={1200}
          height={630}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="mt-5">
        <h2 className={`text-2xl font-semibold tracking-tight ${theme.textClassName}`}>
          {cardName}
        </h2>
        <p
          className={`mt-2 text-sm font-medium leading-6 break-keep ${theme.mutedTextClassName}`}
        >
          {cardHeadline}
        </p>
        <div className={`mt-4 rounded-[20px] px-4 py-3 ${theme.surfaceClassName}`}>
          <p className={`text-sm leading-6 break-keep ${theme.textClassName}`}>
            {cardShareLine}
          </p>
        </div>
      </div>
    </article>
  );
}
