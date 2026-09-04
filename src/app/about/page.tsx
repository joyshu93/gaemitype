import type { Metadata } from "next";
import Link from "next/link";
import { AXES } from "@/data/axes";

export const metadata: Metadata = {
  title: "서비스 소개 | 개미타입",
  description:
    "개미타입의 20개 질문, 4개 성향 축, 16개 결과가 만들어지는 방식을 소개합니다."
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <header className="rounded-[32px] bg-white p-7 shadow-card sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-coral">
          About Gaemitype
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-5xl">
          개미타입은 어떤 테스트인가요?
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-ink/72">
          개미타입은 20개의 질문을 통해 내가 어떤 방식으로 판단하고 선택하는지
          가볍게 돌아보는 성향 테스트입니다. 정답을 맞히는 검사가 아니라, 평소의
          습관과 상황 반응을 4개의 축으로 살펴봅니다.
        </p>
      </header>

      <section className="mt-6 rounded-[30px] bg-white p-7 shadow-card sm:p-9">
        <h2 className="text-2xl font-semibold text-ink">결과를 만드는 4개의 축</h2>
        <p className="mt-3 text-base leading-7 text-ink/68">
          각 축에서 어느 쪽 반응이 더 자주 나타났는지 조합해 4글자 코드와 16개
          결과 중 하나를 보여줍니다. 어느 쪽이 더 좋다는 의미는 아닙니다.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {AXES.map((axis) => (
            <article key={axis.key} className="rounded-[22px] bg-sand/75 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-coral">
                {axis.key}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-ink">{axis.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">
                {axis.left.label}과 {axis.right.label} 중 어떤 반응이 더 자주 보이는지
                살펴봅니다.
              </p>
            </article>
          ))}
        </div>
        <Link
          href="/guides/four-axes"
          className="mt-6 inline-flex font-medium text-ink underline decoration-coral/50 underline-offset-4"
        >
          4가지 판단 축 자세히 보기
        </Link>
      </section>

      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <article className="rounded-[30px] bg-white p-7 shadow-card">
          <h2 className="text-xl font-semibold text-ink">결과는 어떻게 만들어지나요?</h2>
          <p className="mt-4 text-sm leading-7 text-ink/70">
            각 질문의 두 선택지는 하나의 성향 축에 연결됩니다. 20개 답변을 축별로
            합산하고, 더 자주 선택한 쪽을 조합해 타입 코드를 만듭니다. 각 축에는 5개
            문항이 있어 정상적으로 모두 답하면 동점이 생기지 않습니다.
          </p>
        </article>
        <article className="rounded-[30px] bg-white p-7 shadow-card">
          <h2 className="text-xl font-semibold text-ink">결과를 보는 방법</h2>
          <p className="mt-4 text-sm leading-7 text-ink/70">
            결과는 현재 답변에서 드러난 판단 습관을 정리한 참고용 요약입니다. 사람의
            모든 선택이나 미래 행동을 단정하는 진단이 아니며, 시간이 지나면 다르게
            나올 수도 있습니다.
          </p>
        </article>
      </section>

      <section className="mt-6 rounded-[30px] border border-coral/20 bg-white p-7 sm:p-9">
        <h2 className="text-xl font-semibold text-ink">개미타입의 약속</h2>
        <p className="mt-4 text-sm leading-7 text-ink/70">
          개미타입은 종목이나 금융상품을 추천하지 않습니다. 수익을 보장하거나
          매수·매도 시점을 알려주지도 않습니다. 테스트 결과는 재미와 자기이해를 위한
          콘텐츠로만 이용해 주세요.
        </p>
        <Link
          href="/quiz?reset=1"
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white"
        >
          테스트 시작하기
        </Link>
      </section>
    </div>
  );
}
