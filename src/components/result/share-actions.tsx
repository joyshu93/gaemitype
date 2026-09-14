"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clearAnswers } from "@/lib/storage";

type ShareActionsProps = {
  shareUrl: string;
  shareText: string;
};

export function ShareActions({ shareUrl, shareText }: ShareActionsProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const copyLink = async () => {
    try {
      const clipboardShareUrl = shareUrl.startsWith("http")
        ? shareUrl
        : `${window.location.origin}${shareUrl}`;
      await navigator.clipboard.writeText(clipboardShareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const copyShareText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedText(true);
      window.setTimeout(() => setCopiedText(false), 2000);
    } catch {
      setCopiedText(false);
    }
  };

  const handleReset = () => {
    clearAnswers();
    router.push("/quiz?reset=1");
  };

  return (
    <div className="space-y-4">
      <div className="rounded-[24px] bg-sand/70 p-4">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-coral">
          공유 링크
        </p>
        <p className="mt-3 break-all text-sm leading-6 text-ink/72">
          {shareUrl}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1.1fr_1.1fr_0.8fr]">
        <button
          type="button"
          onClick={copyLink}
          className="rounded-2xl bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-ink/90"
        >
          {copied ? "결과 링크를 복사했어요" : "결과 링크 복사"}
        </button>
        <button
          type="button"
          onClick={copyShareText}
          className="rounded-2xl border border-ink/15 bg-white px-5 py-3 text-sm font-medium text-ink transition hover:border-ink/30"
        >
          {copiedText ? "공유 문구를 복사했어요" : "공유 문구 복사"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-2xl border border-dashed border-ink/15 bg-white px-5 py-3 text-sm font-medium text-ink/80 transition hover:border-ink/30"
        >
          다시 테스트하기
        </button>
      </div>

      <div className="rounded-2xl border border-dashed border-ink/15 bg-white px-4 py-3 text-sm leading-6 text-ink/55">
        결과 링크 복사로 만든 링크에는 타입 설명만 담겨요. 답변 내용과 선택 횟수는 포함되지 않아요.
      </div>
    </div>
  );
}
