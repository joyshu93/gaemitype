import type { Metadata } from "next";
import { GuideLayout } from "@/components/guides/guide-layout";
import { AXES } from "@/data/axes";
import { getGuide } from "@/data/guides.mts";

export const metadata: Metadata = {
  title: "4글자 코드와 16가지 결과 읽는 법 | 개미타입",
  description:
    "개미타입의 네 글자 순서, ALRD 해석 예시, 한 글자 차이 비교법과 결과 문장을 관찰 질문으로 바꾸는 방법을 안내합니다.",
  alternates: { canonical: "/guides/reading-results" }
};

const guide = getGuide("reading-results");
const relatedGuide = getGuide("decision-journal");

export default function ReadingResultsGuidePage() {
  return (
    <GuideLayout
      eyebrow={guide.eyebrow}
      title={guide.title}
      summary={guide.description}
      relatedGuide={relatedGuide}
    >
      <section>
        <h2 className="text-2xl font-semibold text-ink">네 글자는 항상 같은 순서예요</h2>
        <p className="mt-4 text-base leading-8 text-ink/72">
          코드는 <strong className="text-ink">준비 방식 → 시간 시야 → 판단 기준 → 확신 방식</strong>
          순서로 읽습니다. 글자를 따로 떼어 등급처럼 보지 않고, 네 축에서 이번에 더 자주
          고른 응답 방향을 차례로 붙인 이름표로 보면 충분해요.
        </p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {AXES.map((axis, index) => (
            <li key={axis.key} className="rounded-2xl bg-sand/70 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-coral">
                {index + 1}번째 글자
              </p>
              <p className="mt-2 font-semibold text-ink">{axis.title}</p>
              <p className="mt-2 text-sm leading-6 text-ink/68">
                {axis.left.code} {axis.left.label} / {axis.right.code} {axis.right.label}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-[24px] border border-ink/10 p-5 sm:p-6">
        <h2 className="text-2xl font-semibold text-ink">ALRD를 한 글자씩 읽어보면</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          {AXES.map((axis) => (
            <article key={axis.key} className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-2xl font-semibold text-coral">{axis.left.code}</p>
              <h3 className="mt-2 font-semibold text-ink">{axis.left.label}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/68">{axis.title}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-base leading-8 text-ink/72">
          그래서 ALRD는 <strong className="text-ink">준비형, 흐름형, 기준형, 근거형</strong>
          응답이 각 자리에서 더 많았다는 뜻이에요. 네 글자를 합친 결과 이름은
          기준설계형이지만, 이 이름이 모든 상황의 행동을 고정해서 설명하지는 않습니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-ink">비슷한 타입은 한 글자만 가려서 비교해요</h2>
        <p className="mt-4 text-base leading-8 text-ink/72">
          두 코드를 한꺼번에 비교하면 차이가 크게 느껴질 수 있어요. 먼저 같은 세 글자는
          잠시 접어두고, 달라진 자리의 축만 확인해보세요. 예를 들어 ALRD와 ALRC는 앞의
          세 축이 같고 마지막 확신 방식만 D와 C로 달라요.
        </p>
        <div className="mt-5 rounded-2xl bg-sand/70 p-5 text-sm leading-7 text-ink/72">
          비교할 때는 “어느 타입이 더 나은가?” 대신 “같은 장면에서 한쪽은 확인 가능한
          근거를, 다른 쪽은 전체 맥락을 먼저 알아차렸을까?”처럼 달라진 축 하나를 질문해
          보세요. 그러면 네 글자 전체를 서로 다른 사람의 경계선처럼 읽는 일을 줄일 수
          있어요.
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-ink">결과 문장을 관찰 질문으로 바꾸기</h2>
        <p className="mt-4 text-base leading-8 text-ink/72">
          강점, 습관, 주의점은 결론보다 관찰의 출발점으로 쓸 때 더 구체적이에요. 문장이
          맞는지 틀리는지 판정하기보다 최근 장면 하나를 붙여 질문으로 바꿔보세요.
        </p>
        <div className="mt-5 grid gap-3">
          <article className="rounded-2xl bg-sand/70 p-5">
            <h3 className="font-semibold text-ink">강점 → 도움이 된 장면 찾기</h3>
            <p className="mt-2 text-sm leading-7 text-ink/70">
              “쉽게 휩쓸리지 않는다”면, 최근 내 기준을 지켜 선택이 한결 편해진 장면은
              언제였는지 떠올려봐요.
            </p>
          </article>
          <article className="rounded-2xl bg-sand/70 p-5">
            <h3 className="font-semibold text-ink">습관 → 첫 단서 찾기</h3>
            <p className="mt-2 text-sm leading-7 text-ink/70">
              “기준부터 떠올린다”면, 실제로 가장 먼저 확인한 기준이 무엇이었는지 적어봐요.
            </p>
          </article>
          <article className="rounded-2xl bg-sand/70 p-5">
            <h3 className="font-semibold text-ink">주의점 → 놓친 단서 확인하기</h3>
            <p className="mt-2 text-sm leading-7 text-ink/70">
              “변화를 늦게 받아들일 수 있다”면, 그때 새로 들어왔지만 지나친 정보가
              있었는지 돌아봐요.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-[24px] bg-ink p-6 text-white">
        <h2 className="text-xl font-semibold">타입 사이에는 순위가 없어요</h2>
        <p className="mt-3 text-base leading-8 text-white/78">
          개미타입에는 가장 좋은 타입, 수익이 나는 타입, 위험한 타입이 따로 없습니다.
          결과는 실력 점수나 위험 평가가 아니라 현재 답변의 조합이에요. 축마다 질문이
          다섯 개라 정상적으로 20문항을 모두 답하면 각 축의 응답 합은 5가 되고, 2.5 대
          2.5 같은 동점은 생기지 않습니다.
        </p>
      </section>
    </GuideLayout>
  );
}
