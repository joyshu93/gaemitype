import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-7 text-sm text-ink/60 sm:px-6">
        <div className="space-y-1">
          <p>개미타입은 투자 성향을 가볍게 정리해보는 참고용 테스트입니다.</p>
          <p>종목 추천, 수익 보장, 매수·매도 시그널을 제공하지 않습니다.</p>
        </div>
        <nav
          aria-label="서비스 안내"
          className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/8 pt-4 font-medium text-ink/70"
        >
          <Link href="/about" className="inline-flex min-h-10 items-center hover:text-ink">
            서비스 소개
          </Link>
          <Link href="/guides" className="inline-flex min-h-10 items-center hover:text-ink">
            가이드
          </Link>
          <Link href="/privacy" className="inline-flex min-h-10 items-center hover:text-ink">
            개인정보처리방침
          </Link>
          <Link
            href="/quiz?reset=1"
            className="inline-flex min-h-10 items-center hover:text-ink"
          >
            테스트 시작
          </Link>
        </nav>
      </div>
    </footer>
  );
}
