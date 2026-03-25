import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개미타입 | 투자 성향 16타입 테스트",
  description:
    "투자 습관과 판단 스타일을 16타입으로 가볍게 돌아보는 테스트"
};

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="grid gap-8 rounded-[36px] bg-white p-8 shadow-card sm:grid-cols-[1.15fr_0.85fr] sm:p-12">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-coral">
            투자 성향 테스트
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-6xl">
            나는 어떤 투자 타입일까?
          </h1>
          <p className="mt-4 text-base leading-7 text-ink/72 sm:text-lg">
            20문항으로 나의 투자 습관과 판단 스타일을 가볍게 돌아보는 테스트예요.
          </p>

          <div className="mt-8">
            <Link
              href="/quiz?reset=1"
              className="inline-flex min-w-[220px] items-center justify-center rounded-2xl bg-ink px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-ink/92"
            >
              테스트 시작하기
            </Link>
          </div>

          <p className="mt-4 text-sm leading-6 text-ink/55">
            로그인 없이 바로 시작할 수 있고, 결과 링크도 바로 공유할 수 있어요.
          </p>
        </div>

        <div className="rounded-[28px] bg-sand p-5 sm:p-6">
          <p className="text-sm font-medium text-ink/55">결과 맛보기</p>
          <div className="mt-4 rounded-[24px] bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-coral">ALRD</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">기준설계형</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">
              기준부터 세우고, 납득한 방향을 길게 보는 타입
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[30px] border border-ink/10 bg-white px-6 py-5 text-sm leading-6 text-ink/60">
        개미타입은 투자 추천 서비스가 아니라, 투자 습관과 판단 성향을 가볍게 돌아보는
        테스트입니다.
      </section>
    </div>
  );
}
