import type { Metadata } from "next";
import { GuideLayout } from "@/components/guides/guide-layout";
import { AXES } from "@/data/axes";
import { getGuide } from "@/data/guides.mts";

export const metadata: Metadata = {
  title: "개미타입 4가지 판단 축 읽는 법 | 개미타입",
  description:
    "준비 방식, 시간 시야, 판단 기준, 확신 방식의 응답 분포를 일상적인 선택 장면과 함께 읽는 방법을 설명합니다.",
  alternates: { canonical: "/guides/four-axes" }
};

const guide = getGuide("four-axes");
const relatedGuide = getGuide("reading-results");

const AXIS_EXAMPLES = {
  AP: {
    scene: "친구들과 하루 나들이를 정하는 장면",
    left: "동선과 순서를 먼저 적어두면 출발이 편해요.",
    right: "일단 만나서 날씨와 기분에 맞춰 정하는 편이 자연스러워요."
  },
  LT: {
    scene: "새로운 공부 루틴을 시작한 장면",
    left: "하루의 작은 흔들림보다 몇 주 동안 이어갈 흐름을 먼저 봐요.",
    right: "오늘 집중이 흐트러진 지점을 보고 바로 방식을 바꿔봐요."
  },
  RI: {
    scene: "모임 장소에 새 후보가 생긴 장면",
    left: "거리, 소음처럼 원래 중요하게 본 기준부터 다시 확인해요.",
    right: "새로 올라온 후기와 지금 달라진 분위기부터 살펴봐요."
  },
  DC: {
    scene: "처음 쓰는 서비스를 고르는 장면",
    left: "기능과 이용 조건을 항목별로 확인할 때 납득이 쉬워요.",
    right: "실제로 쓰는 장면과 전체 경험이 그려질 때 마음이 정리돼요."
  }
} as const;

export default function FourAxesGuidePage() {
  return (
    <GuideLayout
      eyebrow={guide.eyebrow}
      title={guide.title}
      summary={guide.description}
      relatedGuide={relatedGuide}
    >
      <section>
        <h2 className="text-2xl font-semibold text-ink">축은 능력표가 아니라 응답 방향이에요</h2>
        <p className="mt-4 text-base leading-8 text-ink/72">
          개미타입의 네 축은 어떤 선택을 더 잘하는지 점수를 매기지 않아요. 비슷한
          장면에서 무엇을 먼저 보고, 어떤 방식이 조금 더 편했는지 현재 답변을 모아
          보여줍니다. 한쪽 글자가 나왔다고 반대쪽 방식을 못 쓴다는 뜻도 아니에요.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-ink">네 축을 일상 장면으로 펼쳐보기</h2>
        <div className="mt-5 grid gap-4">
          {AXES.map((axis) => {
            const example = AXIS_EXAMPLES[axis.key];

            return (
              <article key={axis.key} className="rounded-[24px] bg-sand/70 p-5 sm:p-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-coral">
                  {axis.key}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-ink">{axis.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink/62">예시: {example.scene}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4">
                    <p className="font-semibold text-ink">
                      {axis.left.code} · {axis.left.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink/70">{example.left}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <p className="font-semibold text-ink">
                      {axis.right.code} · {axis.right.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink/70">{example.right}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-[24px] border border-ink/10 p-5 sm:p-6">
        <h2 className="text-2xl font-semibold text-ink">헷갈리기 쉬운 두 축</h2>
        <div className="mt-4 space-y-4 text-base leading-8 text-ink/72">
          <p>
            <strong className="text-ink">L/T</strong>를 장기 투자와 단기 투자의
            줄임말로만 읽으면 의미가 좁아져요. 이 축은 일상의 선택에서도 긴 흐름을
            먼저 보는지, 지금 구간의 변화와 조정을 먼저 보는지 살펴봅니다.
          </p>
          <p>
            <strong className="text-ink">D/C</strong>도 분석 능력과 직감 능력을 겨루는
            축이 아니에요. 확인 가능한 근거를 차례로 볼 때 확신이 생기는지, 전체 맥락이
            맞아떨어질 때 확신이 생기는지에 관한 응답 차이입니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-ink">3:2, 4:1, 5:0은 이렇게 읽어요</h2>
        <p className="mt-4 text-base leading-8 text-ink/72">
          각 축에는 다섯 질문이 있어요. 숫자는 성향의 강도나 실력을 뜻하지 않고, 이번
          답변에서 두 방향을 각각 몇 번 골랐는지 보여주는 분포입니다.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <article className="rounded-2xl bg-sand/70 p-5">
            <h3 className="font-semibold text-ink">3:2</h3>
            <p className="mt-2 text-sm leading-7 text-ink/70">
              한쪽 응답이 한 번 더 많았어요. 두 방향의 단서가 모두 자주 보인 셈이에요.
            </p>
          </article>
          <article className="rounded-2xl bg-sand/70 p-5">
            <h3 className="font-semibold text-ink">4:1</h3>
            <p className="mt-2 text-sm leading-7 text-ink/70">
              다섯 장면 중 네 장면에서 같은 방향을 골랐다는 기록이에요.
            </p>
          </article>
          <article className="rounded-2xl bg-sand/70 p-5">
            <h3 className="font-semibold text-ink">5:0</h3>
            <p className="mt-2 text-sm leading-7 text-ink/70">
              이번 다섯 답변이 모두 한쪽이었어요. 언제나 그 방식만 쓴다는 뜻은 아니에요.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-[24px] bg-ink p-6 text-white">
        <h2 className="text-xl font-semibold">마지막으로 한 장면만 떠올려보세요</h2>
        <p className="mt-3 text-base leading-8 text-white/78">
          선택지가 갑자기 생겼을 때, 나는 준비·시간·기준·확신 중 어떤 단서를 가장 먼저
          알아차리나요?
        </p>
      </section>
    </GuideLayout>
  );
}
