import type { Question } from "@/domain/types";

export const QUESTIONS: Question[] = [
  {
    id: "q01",
    axis: "AP",
    prompt: "친구가 맛집을 추천했어요. 오늘 저녁에 바로 가볼 수 있다면, 당신은 먼저 어떻게 하나요?",
    helper: "낯선 선택지를 마주했을 때의 첫 반응을 골라보세요.",
    options: [
      { value: 0, code: "A", label: "후기와 메뉴를 먼저 검색해본다" },
      { value: 1, code: "P", label: "일단 가보고 현장에서 생각한다" }
    ]
  },
  {
    id: "q02",
    axis: "AP",
    prompt: "주말에 짧게 놀러 가기로 했어요. 출발 전 당신 모습에 더 가까운 쪽은?",
    helper: "준비와 실행 중 익숙한 방식을 골라보세요.",
    options: [
      { value: 0, code: "A", label: "갈 곳과 순서를 미리 정해두고 출발한다" },
      { value: 1, code: "P", label: "일단 출발하고 가는 길에 하나씩 정한다" }
    ]
  },
  {
    id: "q03",
    axis: "AP",
    prompt: "기다리던 일정이 갑자기 취소됐어요. 그 순간 당신은 보통 어떻게 움직이나요?",
    helper: "갑작스러운 변수 앞에서의 반응을 떠올려보세요.",
    options: [
      { value: 0, code: "A", label: "원래 생각해둔 대안대로 움직인다" },
      { value: 1, code: "P", label: "그 자리에서 지금 하고싶은 할 일을 새로 정한다" }
    ]
  },
  {
    id: "q04",
    axis: "AP",
    prompt: "처음 맡는 일을 시작해야 할 때, 더 마음이 놓이는 쪽은?",
    helper: "새로운 일을 시작하는 장면을 떠올려보세요.",
    options: [
      { value: 0, code: "A", label: "먼저 순서와 기준을 적어두고 시작한다" },
      { value: 1, code: "P", label: "일단 해보면서 필요한 걸 맞춰간다" }
    ]
  },
  {
  id: "q05",
  axis: "AP",
  prompt: "처음 가보는 카페에 들어갔어요. 메뉴를 고를 때 더 먼저 하는 행동은?",
  helper: "낯선 선택지 앞에서의 습관을 떠올려보세요.",
  options: [
    { value: 0, code: "A", label: "내가 원래 좋아하는 메뉴부터 먼저 찾는다" },
    { value: 1, code: "P", label: "새로운 인기 메뉴부터 본다" }
  ]
},
  {
    id: "q06",
    axis: "LT",
    prompt: "드라마나 유튜브 채널을 하나 정하면, 당신은 보통 어떤 편인가요?",
    helper: "한 번 정한 것을 얼마나 오래 가져가는지 떠올려보세요.",
    options: [
      { value: 0, code: "L", label: "구독하고 그 채널의 다른 영상을 섭렵한다" },
      { value: 1, code: "T", label: "매번 더 재밌는 채널이 없는지 찾아본다" }
    ]
  },
  {
    id: "q07",
    axis: "LT",
    prompt: "물건을 사기 전 배송이 조금 오래걸린다면, 당신은 무엇을 더 보나요?",
    helper: "타이밍과 큰 방향 중 가까운 쪽을 골라보세요.",
    options: [
      { value: 0, code: "L", label: "오래 만족할 상품인지 생각한다" },
      { value: 1, code: "T", label: "지금 크게 세일하는지 확인한다" }
    ]
  },
  {
    id: "q08",
    axis: "LT",
    prompt: "하루 계획이 중간에 꼬였어요. 그럴 때 당신은 주로 어디에 집중하나요?",
    helper: "짧은 변화에 반응하는 방식을 떠올려보세요.",
    options: [
      { value: 0, code: "L", label: "오늘 전체 흐름이 아직 괜찮은지 본다" },
      { value: 1, code: "T", label: "지금 당장 뭘 바꿔야 할지 본다" }
    ]
  },
  {
    id: "q09",
    axis: "LT",
    prompt: "운동이나 공부 루틴을 잡았을 때 당신 모습에 더 가까운 쪽은?",
    helper: "꾸준함과 즉시 조정 중 어느 쪽에 가까운지 골라보세요.",
    options: [
      { value: 0, code: "L", label: "조금 지루해도 일단 계속 이어간다" },
      { value: 1, code: "T", label: "안 맞는 느낌이 들면 바로 바꾼다" }
    ]
  },
  {
  id: "q10",
  axis: "LT",
  prompt: "옷이나 물건을 살까 고민될 때, 더 자주 보는 쪽은?",
  helper: "선택할 때 어디에 먼저 시선이 가는지 골라보세요.",
  options: [
    { value: 0, code: "L", label: "오래 써도 만족할 만한 선택인지 본다" },
    { value: 1, code: "T", label: "지금 사기 딱 좋은 순간인지 본다" }
  ]
},
  {
    id: "q11",
    axis: "RI",
    prompt: "단톡방에서 갑자기 모두가 같은 이야기를 꺼내면, 당신은 보통?",
    helper: "새로운 자극을 만났을 때의 첫 반응입니다.",
    options: [
      { value: 0, code: "R", label: "내가 원래 보던 기준부터 먼저 떠올린다" },
      { value: 1, code: "I", label: "무슨 일인지 바로 검색해서 찾아본다" }
    ]
  },
  {
    id: "q12",
    axis: "RI",
    prompt: "선택지가 여러 개 생겼을 때, 더 먼저 떠오르는 건?",
    helper: "판단이 어디서 출발하는지 떠올려보세요.",
    options: [
      { value: 0, code: "R", label: "원래 중요하게 보던 기준이다" },
      { value: 1, code: "I", label: "지금 눈에 띄는 새로운 변수다" }
    ]
  },
  {
    id: "q13",
    axis: "RI",
    prompt: "회의나 모임 분위기가 갑자기 바뀌면 당신은 보통?",
    helper: "기준 유지와 즉시 반응 중 가까운 쪽입니다.",
    options: [
      { value: 0, code: "R", label: "원래 생각한 기준을 먼저 붙든다" },
      { value: 1, code: "I", label: "바뀐 분위기에 맞게 바로 움직인다" }
    ]
  },
  {
    id: "q14",
    axis: "RI",
    prompt: "내가 하던 방식과 요즘 뜨는 방식이 부딪히면 더 끌리는 쪽은?",
    helper: "익숙함과 새로움 중 어디에 더 끌리는지 골라보세요.",
    options: [
      { value: 0, code: "R", label: "익숙한 방식이 더 믿음이 간다" },
      { value: 1, code: "I", label: "새로운 흐름이 보이면 다시 들여다본다" }
    ]
  },
  {
  id: "q15",
  axis: "RI",
  prompt: "갑자기 어떤 장소나 음식이 엄청 화제가 되면, 당신은 보통?",
  helper: "유행을 마주했을 때의 첫 반응을 떠올려보세요.",
  options: [
    { value: 0, code: "R", label: "일단 내 취향에 맞는지부터 생각해본다" },
    { value: 1, code: "I", label: "왜 이렇게 화제인지 바로 찾아본다" }
  ]
},
  {
    id: "q16",
    axis: "DC",
    prompt: "친구가 무언가를 추천할 때, 더 납득되는 설명은 어느 쪽인가요?",
    helper: "설명이 마음에 들어오는 방식을 떠올려보세요.",
    options: [
      { value: 0, code: "D", label: "왜 좋은지 근거를 차근차근 말해주는 설명" },
      { value: 1, code: "C", label: "어떤 느낌인지 전체 그림이 그려지는 설명" }
    ]
  },
  {
    id: "q17",
    axis: "DC",
    prompt: "할 일이나 정보가 한꺼번에 많아지면, 당신은 보통 어떻게 하나요?",
    helper: "복잡한 상황에서의 정리 습관입니다.",
    options: [
      { value: 0, code: "D", label: "하나씩 쪼개서 체크해야 마음이 놓인다" },
      { value: 1, code: "C", label: "전체 흐름부터 잡아야 감이 온다" }
    ]
  },
  {
    id: "q18",
    axis: "DC",
    prompt: "누군가 길게 설명할 때 더 기억에 남는 건?",
    helper: "어떤 식의 설명이 더 잘 들어오는지 떠올려보세요.",
    options: [
      { value: 0, code: "D", label: "핵심 근거가 순서대로 정리된 말" },
      { value: 1, code: "C", label: "전체 이야기가 한 장면처럼 그려지는 말" }
    ]
  },
  {
    id: "q19",
    axis: "DC",
    prompt: "둘 중 하나를 골라야 할 때 더 마음이 놓이는 순간은?",
    helper: "판단의 마지막 한 끗을 떠올려보세요.",
    options: [
      { value: 0, code: "D", label: "둘을 비교할 기준이 또렷해졌을 때" },
      { value: 1, code: "C", label: "전체 흐름이 자연스럽게 맞아떨어질 때" }
    ]
  },
  {
  id: "q20",
  axis: "DC",
  prompt: "새로운 앱이나 서비스를 써볼지 고민될 때, 더 먼저 확인하는 건?",
  helper: "결정 직전 어떤 정보가 더 중요한지 떠올려보세요.",
  options: [
    { value: 0, code: "D", label: "기능과 사용 방식이 명확하게 정리된 정보" },
    { value: 1, code: "C", label: "전반적인 분위기와 사용 경험이 느껴지는 정보" }
  ]
}
];
