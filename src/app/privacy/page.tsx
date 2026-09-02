import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 개미타입",
  description:
    "개미타입의 브라우저 저장, 결과 공유, Google AdSense 및 쿠키 사용 가능성을 안내합니다."
};

const GOOGLE_PARTNER_POLICY_URL =
  "https://policies.google.com/technologies/partner-sites?hl=ko";
const PROJECT_URL = "https://github.com/joyshu93/gaemitype";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <header className="rounded-[32px] bg-white p-7 shadow-card sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-coral">
          Privacy
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-5xl">
          개인정보처리방침
        </h1>
        <p className="mt-5 text-base leading-8 text-ink/72">
          개미타입에서 어떤 정보가 브라우저에 저장되고 외부 서비스가 어떻게 사용될
          수 있는지 알기 쉽게 안내합니다.
        </p>
        <p className="mt-3 text-sm text-ink/48">최종 업데이트: 2026년 9월 2일</p>
      </header>

      <div className="mt-6 space-y-5">
        <PolicySection title="1. 회원가입과 입력 정보">
          개미타입은 회원가입이나 로그인을 요구하지 않습니다. 이름, 전화번호,
          계좌정보처럼 개인을 직접 식별하는 정보를 테스트 항목으로 입력받지 않으며,
          별도의 사용자 계정이나 답변 데이터베이스를 운영하지 않습니다.
        </PolicySection>

        <PolicySection title="2. 답변과 진행 상태 저장">
          테스트를 이어갈 수 있도록 선택한 답변과 진행 상태가 사용자의 브라우저
          localStorage에 저장될 수 있습니다. 다시 테스트하기를 누르거나 브라우저
          저장 데이터를 삭제하면 기존 답변이 초기화됩니다. 브라우저 설정이나 시크릿
          모드에 따라 답변이 더 일찍 사라질 수 있습니다.
        </PolicySection>

        <PolicySection title="3. 결과 URL과 공유 링크">
          테스트 완료 후 결과를 표시하는 현재 URL에는 답변을 단순화한 코드가 포함될
          수 있습니다. 이 URL은 브라우저 기록에 남거나 호스팅 과정에서 일반적인 웹
          요청 정보로 처리될 수 있지만, 개미타입의 사용자 계정이나 별도 DB에는 저장하지
          않습니다. 공유 버튼으로 생성되는 링크에는 실제 답변 대신 공개 가능한 4글자
          타입 코드만 포함됩니다.
        </PolicySection>

        <PolicySection title="4. Google AdSense와 쿠키">
          개미타입은 운영비 보조를 위해 Google AdSense를 사용할 수 있습니다. 광고가
          활성화되면 Google을 포함한 제3자가 광고 제공과 측정을 위해 쿠키, 웹 비콘,
          IP 주소 또는 유사한 식별 정보를 사용할 수 있습니다. 현재 광고가 비활성화된
          경우 광고 슬롯과 광고 요청 스크립트는 로드되지 않습니다.
          <a
            href={GOOGLE_PARTNER_POLICY_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block font-medium text-ink underline decoration-coral/50 underline-offset-4"
          >
            Google이 파트너 사이트의 정보를 사용하는 방법
          </a>
        </PolicySection>

        <PolicySection title="5. 외부 서비스와 문의">
          서비스 운영과 배포에는 Vercel, 광고 제공에는 Google AdSense 같은 외부
          서비스가 사용될 수 있으며, 각 서비스의 정보 처리는 해당 사업자의 정책을
          따릅니다. 서비스 이용이나 개인정보 안내에 관한 문의는 프로젝트 저장소를
          통해 남길 수 있습니다.
          <a
            href={PROJECT_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block font-medium text-ink underline decoration-coral/50 underline-offset-4"
          >
            개미타입 GitHub 저장소
          </a>
        </PolicySection>

        <PolicySection title="6. 방침 변경">
          서비스 구조, 저장 방식 또는 외부 서비스 사용이 달라지면 이 페이지의 내용과
          최종 업데이트 날짜를 함께 수정합니다.
        </PolicySection>
      </div>
    </div>
  );
}

function PolicySection({
  title,
  children
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="rounded-[26px] bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-ink/70">{children}</div>
    </section>
  );
}
