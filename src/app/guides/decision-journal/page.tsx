import type { Metadata } from "next";
import { GuideLayout } from "@/components/guides/guide-layout";
import { getGuide } from "@/data/guides.mts";

export const metadata: Metadata = {
  title: "판단 습관을 세 줄로 기록하는 법 | 개미타입",
  description:
    "결과의 정답 여부를 가리지 않고, 무엇을 먼저 봤고 왜 마음이 움직였는지 세 줄로 돌아보는 판단 기록법을 소개합니다.",
  alternates: { canonical: "/guides/decision-journal" }
};

const guide = getGuide("decision-journal");
const relatedGuide = getGuide("four-axes");

const JOURNAL_LINES = [
  "나는 무엇을 먼저 봤나?",
  "왜 그 순간 마음이 움직였나?",
  "다시 본다면 무엇을 한 번 더 확인하고 싶나?"
] as const;

export default function DecisionJournalGuidePage() {
  return (
    <GuideLayout
      eyebrow={guide.eyebrow}
      title={guide.title}
      summary={guide.description}
      relatedGuide={relatedGuide}
    >
      <section>
        <h2 className="text-2xl font-semibold text-ink">결과보다 선택 직전의 장면을 남겨요</h2>
        <p className="mt-4 text-base leading-8 text-ink/72">
          판단 기록은 결과가 맞았는지 틀렸는지 채점하는 표가 아니에요. 그 순간 시선이
          먼저 간 곳, 마음이 움직인 이유, 나중에 다시 보고 싶은 단서를 짧게 남겨 선택
          과정의 흐름을 살펴보는 메모입니다.
        </p>
      </section>

      <section className="rounded-[24px] bg-sand/75 p-5 sm:p-7">
        <h2 className="text-xl font-semibold text-ink">세 줄 기록</h2>
        <ol className="mt-5 space-y-3">
          {JOURNAL_LINES.map((line, index) => (
            <li key={line} className="rounded-2xl bg-white p-4 text-base leading-7 text-ink/78">
              <span className="mr-2 font-semibold text-coral">{index + 1}.</span>
              {line}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-ink">평범한 선택 하나면 충분해요</h2>
        <p className="mt-4 text-base leading-8 text-ink/72">
          예를 들어 친구들과 만날 장소를 정한 뒤 세 줄을 써볼 수 있어요. “이동 시간을
          먼저 봤다”, “모두가 편할 것 같아 마음이 기울었다”, “다음에는 대화하기 좋은
          환경인지도 확인하고 싶다”처럼 적으면 됩니다. 멋진 해석보다 실제로 눈에 들어온
          단서를 남기는 쪽이 이 기록의 목적에 가까워요.
        </p>
      </section>

      <section className="rounded-[24px] border border-ink/10 p-5 sm:p-6">
        <h2 className="text-2xl font-semibold text-ink">타입 문장을 기록의 시작점으로 쓰기</h2>
        <p className="mt-4 text-base leading-8 text-ink/72">
          결과에서 준비형이 보였다면 “이번에도 먼저 계획을 세웠나?”, 감각형이 보였다면
          “전체 그림이 그려지는 순간 마음이 움직였나?”처럼 한 문장만 가져와 확인해보세요.
          맞지 않는 장면도 그대로 기록할 만한 정보예요. 반대 방향의 단서를 쓴 순간이
          있었다고 해서 결과가 잘못된 것은 아닙니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-ink">다시 했을 때 결과가 달라도 괜찮아요</h2>
        <p className="mt-4 text-base leading-8 text-ink/72">
          개미타입은 현재 답변을 요약하므로 최근에 겪은 상황, 새로 쌓인 경험, 질문을
          떠올릴 때의 장면에 따라 재검사 결과가 달라질 수 있어요. 이는 사람이 갑자기
          완전히 달라졌다는 진단이 아니라, 이번에는 다른 응답이 조금 더 많이 모였다는
          뜻입니다.
        </p>
      </section>

      <section className="rounded-[24px] bg-ink p-6 text-white">
        <h2 className="text-xl font-semibold">공유 링크에는 응답 분포가 들어가지 않아요</h2>
        <p className="mt-3 text-base leading-8 text-white/78">
          공유된 결과 링크에는 네 글자 타입 코드만 담겨 있어 타입의 기본 설명만 보여줘요.
          3:2인지 5:0인지 같은 답변 분포는 링크에 포함되지 않습니다. 그래서 누군가의 공유
          결과를 볼 때도 그 타입 설명만으로 당시의 세부 답변이나 선택 과정을 추측하지 않는
          편이 자연스러워요.
        </p>
      </section>
    </GuideLayout>
  );
}
