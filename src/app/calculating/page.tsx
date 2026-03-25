import { CalculatingRedirect } from "@/components/calculating/calculating-redirect";

type CalculatingPageProps = {
  searchParams: Promise<{
    answers?: string;
  }>;
};

export default async function CalculatingPage({
  searchParams
}: CalculatingPageProps) {
  const params = await searchParams;
  const serializedAnswers = params.answers ?? "";

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <CalculatingRedirect serializedAnswers={serializedAnswers} />
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-ink/15 border-t-coral" />
      <p className="mt-6 text-sm font-medium uppercase tracking-[0.24em] text-coral">
        Calculating
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-ink">당신의 개미타입을 정리하는 중</h1>
      <p className="mt-4 max-w-md text-base leading-7 text-ink/70">
        답변 패턴을 4축으로 정리하고, 가장 가까운 결과 타입으로 연결하고 있습니다.
      </p>
    </div>
  );
}
