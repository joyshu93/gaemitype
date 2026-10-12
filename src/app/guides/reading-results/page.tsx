import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout } from "@/components/guides/guide-layout";
import { AXES } from "@/data/axes";
import { getGuide } from "@/data/guides.mts";
import { RESULT_READING_EXAMPLE } from "@/data/result-reading-example";

export const metadata: Metadata = {
  title: "4글자 코드와 16가지 결과 읽는 법 | 개미타입",
  description:
    getGuide("reading-results").description,
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
        <h2 className="text-2xl font-semibold text-ink">답변이 ALRD가 되는 과정을 따라가 볼까요?</h2>
        <p className="mt-4 text-base leading-8 text-ink/72">
          아래는 설명을 위해 만든 가상 답변이에요. 실제 사용자의 응답이나 지금 읽고 있는 분의 결과가 아니에요.
          기존 20개 질문에서 답을 하나씩 골라, 네 축의 선택 횟수와 코드가 어떻게 연결되는지 살펴볼게요.
        </p>
        <p className="mt-5 text-sm leading-7 text-ink/68">
          가상 답변 20개 중, 각 축에서 서로 다른 방향을 고른 두 예예요.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {RESULT_READING_EXAMPLE.axes.map((axis) => (
            <article key={axis.key} className="rounded-2xl bg-sand/70 p-4">
              <h3 className="font-semibold text-ink">{axis.title}</h3>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-ink/72">
                {axis.examples.map((example) => (
                  <li key={example.questionId}>
                    <span className="font-medium text-coral">Q{example.questionNumber} · {example.selectedCode}</span>
                    <p>{example.selectedOptionLabel}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-5 text-base leading-8 text-ink/72">
          두 예시만으로 타입을 정하지는 않아요. 각 축에 연결된 다섯 답변을 모두 합하면 다음과 같아요.
        </p>
        <table className="mt-5 w-full table-fixed text-left text-sm leading-6 text-ink/72">
          <caption className="sr-only">가상 답변 20개의 축별 선택 횟수와 코드</caption>
          <thead>
            <tr className="border-b border-ink/15 text-ink">
              <th scope="col" className="w-[36%] py-3 pr-2 font-semibold">축 · 질문</th>
              <th scope="col" className="py-3 pr-2 font-semibold">선택 횟수</th>
              <th scope="col" className="w-10 py-3 font-semibold">코드</th>
            </tr>
          </thead>
          <tbody>
            {RESULT_READING_EXAMPLE.axes.map((axis) => (
              <tr key={axis.key} className="border-b border-ink/10 align-top">
                <th scope="row" className="py-3 pr-2 font-medium text-ink">
                  {axis.title}
                  <span className="block text-xs font-normal text-ink/60">
                    Q{axis.answers[0].questionNumber}–Q{axis.answers[axis.answers.length - 1].questionNumber}
                  </span>
                </th>
                <td className="py-3 pr-2">
                  <span className="block">{axis.left.code} {axis.left.label} {axis.left.count}개</span>
                  <span className="block">{axis.right.code} {axis.right.label} {axis.right.count}개</span>
                </td>
                <td className="py-3 font-semibold text-coral">{axis.selectedCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-5 text-base leading-8 text-ink/72">
          각 축에서 한 번 더 고른 방향을 차례로 붙이면 A–L–R–D, {RESULT_READING_EXAMPLE.name}이 돼요.
          네 축 모두 반대 방향의 선택도 두 번씩 있었어요. 이 3:2는 다섯 답변의 기록이며,
          성격의 강도나 검사 정확도를 뜻하지 않아요.
        </p>

        <h3 className="mt-8 text-xl font-semibold text-ink">같은 ALRD도 답변은 달라요</h3>
        <p className="mt-3 text-base leading-8 text-ink/72">
          다른 가상 답변으로, 20개 질문에서 모두 첫 번째 선택지를 골랐다고 해볼게요.
          이때는 A·L·R·D가 각 축에서 5:0으로 선택돼 같은 ALRD가 돼요. 이번 답변이 한쪽에 모였다는 뜻이며,
          다른 상황에서도 늘 같은 선택을 하거나 능력이 더 뛰어나다는 뜻은 아니에요.
          타입 코드는 더 많이 고른 방향만 담기 때문에, 같은 타입이라도 실제 답변은 따로 살펴봐야 해요.
        </p>

        <h3 className="mt-8 text-xl font-semibold text-ink">코드보다 한 장면을 돌아보기</h3>
        <p className="mt-3 text-base leading-8 text-ink/72">
          앞의 3:2 가상 사례에서는 Q1에서 후기를 먼저 찾는 답을, Q2에서는 출발한 뒤 정하는 답을 골랐어요.
          ‘나는 항상 계획적인 사람’이라고 정리하기보다, ‘최근에 미리 알아본 것은 무엇이고,
          현장에서 정한 것은 무엇이었지?’라고 물어볼 수 있어요.
        </p>
        <p className="mt-3 text-base leading-8 text-ink/72">
          읽는 분도 자신의 최근 장면 하나만 떠올려보세요. 이 예시의 답변을 자신의 답변으로 받아들일 필요는 없어요.
        </p>

        <details className="mt-6 rounded-2xl border border-ink/10 p-4 sm:p-5">
          <summary className="cursor-pointer font-semibold leading-7 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral">
            가상 답변 20개와 연결된 글자 확인하기
          </summary>
          {RESULT_READING_EXAMPLE.axes.map((axis) => (
            <section key={axis.key} className="mt-6">
              <h3 className="font-semibold text-ink">{axis.title}</h3>
              <ol className="mt-3 space-y-4 text-sm leading-7 text-ink/72">
                {axis.answers.map((answer) => (
                  <li key={answer.questionId}>
                    <p className="font-medium text-ink">Q{answer.questionNumber}. {answer.prompt}</p>
                    <p className="mt-1">{answer.selectedCode} · {answer.selectedOptionLabel}</p>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </details>
        <p className="mt-5 text-sm leading-7 text-ink/60">
          링크에서는 타입 기본 설명만 보여줘요. 위 가상 답변과 선택 횟수는 전달하지 않아요.
        </p>
        <Link href="/result?code=ALRD" className="mt-3 inline-flex font-medium text-ink underline decoration-coral/50 underline-offset-4">
          ALRD 기준설계형 기본 설명 보기
        </Link>
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
        <p className="mt-5 text-sm leading-7 text-ink/60">
          링크에서는 타입 기본 설명만 보여줘요. 위 가상 답변과 선택 횟수는 전달하지 않아요.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/result?code=ALRD" className="font-medium text-ink underline decoration-coral/50 underline-offset-4">
            ALRD · 근거형이 포함된 기본 설명
          </Link>
          <Link href="/result?code=ALRC" className="font-medium text-ink underline decoration-coral/50 underline-offset-4">
            ALRC · 감각형이 포함된 기본 설명
          </Link>
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
