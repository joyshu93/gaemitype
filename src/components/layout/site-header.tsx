import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-ink/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          개미타입
        </Link>
        <nav className="flex items-center gap-4 text-sm text-ink/70">
          <Link href="/quiz?reset=1" className="transition hover:text-ink">
            테스트 시작
          </Link>
          <Link href="/" className="transition hover:text-ink">
            홈
          </Link>
        </nav>
      </div>
    </header>
  );
}
