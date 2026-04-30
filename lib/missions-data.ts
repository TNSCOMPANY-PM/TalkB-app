/**
 * 토크비 15개 미션 데이터
 *
 * 위치: lib/missions-data.ts (또는 data/missions.ts)
 * 사용처: app/diagnosis/result/page.tsx, app/mypage/page.tsx
 *
 * 베타 단계: 사장님이 본인이 직접 확인하고 체크 (수동 체크)
 * 정식 출시: 자동 감지 도입 검토
 */

// ─────────────────────────────────────────────
// 타입 정의
// ─────────────────────────────────────────────

export type MissionCategory =
  | "external_mention"
  | "review"
  | "naver_place"
  | "official_channel"
  | "google_gbp";

export interface CategoryInfo {
  id: MissionCategory;
  name: string;
  shortName: string;
  weight: number; // 가중치 (Insight 단계용, Free에선 표시만)
  importance: 1 | 2 | 3; // 3 = 가장 영향력 큼
  description: string;
  order: number; // 결과 페이지 표시 순서 (영향력 큰 순)
}

export interface Mission {
  id: string; // m1 ~ m15
  number: number;
  category: MissionCategory;
  title: string;
  duration: string; // "5분", "30분"
  why: string;
  howToCheck: string[];
  howToFix: string[];
  template?: string;
  badExample?: string;
  goodExample?: string;
  warning?: string;
  tip?: string;
}

// ─────────────────────────────────────────────
// 카테고리 정의 (영향력 순)
// ─────────────────────────────────────────────

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "external_mention",
    name: "외부 디지털 언급",
    shortName: "외부 언급",
    weight: 30,
    importance: 3,
    description: "GPT가 사장님 매장을 학습하는 가장 큰 출처",
    order: 1,
  },
  {
    id: "review",
    name: "리뷰 답글",
    shortName: "리뷰 답글",
    weight: 25,
    importance: 3,
    description: "GPT가 매장 특성을 인용하는 핵심 텍스트",
    order: 2,
  },
  {
    id: "naver_place",
    name: "네이버 플레이스",
    shortName: "네이버 플레이스",
    weight: 20,
    importance: 2,
    description: "한국 AI 검색의 1차 데이터 출처",
    order: 3,
  },
  {
    id: "official_channel",
    name: "공식 채널",
    shortName: "공식 채널",
    weight: 15,
    importance: 2,
    description: "매장의 디지털 신뢰도 신호",
    order: 4,
  },
  {
    id: "google_gbp",
    name: "구글 비즈니스 프로필",
    shortName: "구글 GBP",
    weight: 10,
    importance: 1,
    description: "글로벌 AI 학습 출처",
    order: 5,
  },
];

// ─────────────────────────────────────────────
// 15개 미션 데이터
// ─────────────────────────────────────────────

export const MISSIONS: Mission[] = [
  // ① 네이버 플레이스 (4개)
  {
    id: "m1",
    number: 1,
    category: "naver_place",
    title: "매장명/주소/전화/영업시간 정확 입력",
    duration: "5분",
    why: "ChatGPT는 여러 출처에 같은 정보가 일관되게 있을 때 매장을 신뢰합니다. 가장 기본 정보부터 정확해야 시작이 됩니다.",
    howToCheck: [
      "네이버 지도 앱 열기 → 본인 매장 검색",
      "매장명, 주소, 전화번호가 간판/명함과 100% 일치하는지 확인",
      "영업시간 + 브레이크 타임 / 라스트 오더 시간까지 등록되어 있는지 확인",
    ],
    howToFix: [
      "스마트플레이스 앱 설치",
      "본인 매장 관리 들어가기",
      "정보 수정 → 빠진 항목 채우기",
      "영업시간은 요일별로 다르면 따로 등록",
    ],
    warning:
      "'OO식당점'과 'OO식당지점' 같은 미세 차이도 일관성을 깨뜨립니다. 한 가지로 통일하세요.",
  },
  {
    id: "m2",
    number: 2,
    category: "naver_place",
    title: "메뉴 + 가격 모두 등록",
    duration: "30분",
    why: "'강남에서 만원대 분식집' 같은 질문에 GPT가 답하려면 메뉴와 가격 정보가 필요합니다. 가격이 없으면 가성비 관련 질문에서 빠집니다.",
    howToCheck: [
      "네이버 지도에서 본인 매장 → '메뉴' 탭",
      "모든 메뉴에 가격이 명시되어 있는지 확인",
      "'시가' / '별도' 같은 표시가 너무 많지 않은지 점검",
    ],
    howToFix: [
      "스마트플레이스 → 메뉴 관리",
      "매장 메뉴판 사진 보면서 하나씩 입력",
      "가격은 숫자로 정확히 (예: 8,000원)",
      "대표 메뉴 3개는 사진도 함께 등록",
    ],
    tip: "메뉴 이름에 특징을 넣으면 더 좋아요. (예: '수제 돈까스' > '돈까스')",
  },
  {
    id: "m3",
    number: 3,
    category: "naver_place",
    title: "사진 5장 이상 등록 (외관/내부/메뉴 3종)",
    duration: "20분",
    why: "네이버는 자체 AI(VLM)로 사진을 분석해 매장 특성을 학습합니다. 사진이 많고 다양할수록 GPT가 사장님 매장을 정확히 묘사할 수 있어요.",
    howToCheck: [
      "네이버 지도 → 본인 매장 → '사진' 탭",
      "외관 1장, 내부 1장, 대표 메뉴 3장 이상 있는지 확인",
      "흔들리거나 어둡지 않은지 점검",
    ],
    howToFix: [
      "매장 외관(간판 보이게) 1장 촬영",
      "매장 내부(분위기 잘 보이는 각도) 1장 촬영",
      "대표 메뉴 3개를 자연광에서 촬영 (위에서 또는 45도)",
      "스마트플레이스 → 사진 관리 → 업로드",
    ],
    tip: "화질 좋은 사진 5장 > 흐릿한 사진 20장",
  },
  {
    id: "m4",
    number: 4,
    category: "naver_place",
    title: "업체 소개글 100자 이상 (핵심 키워드 포함)",
    duration: "15분",
    why: "가장 영향력 큰 미션 중 하나입니다. GPT가 매장 특성을 이해하는 가장 직접적인 텍스트가 소개글입니다. 비어있으면 GPT는 매장이 어떤 곳인지 모릅니다.",
    howToCheck: [
      "네이버 지도 → 본인 매장 → 매장 정보 영역",
      "소개글이 100자 이상인지 확인",
      "지역 + 업종 + 특징 키워드 3가지가 모두 들어있는지 점검",
    ],
    howToFix: [
      "공식 템플릿대로 소개글 작성",
      "스마트플레이스 → 업체 정보 → 소개글 수정",
    ],
    template:
      "[지역명]의 [업종/카테고리]입니다. [매장 특징 1~2가지]가 강점이며, [추천 상황: 회식/데이트/가족모임 등]에 좋습니다. 대표 메뉴는 [메뉴명]입니다.",
    goodExample:
      "성수동 카페거리에 위치한 정통 족발 전문점입니다. 12시간 저온 숙성한 부드러운 식감과 직접 담근 보쌈김치가 강점이며, 가족 모임이나 회식 장소로 적합합니다. 대표 메뉴는 미니족발과 보쌈정식입니다.",
    warning: "키워드만 나열하면 어색합니다. 자연스러운 문장으로 작성하세요.",
  },

  // ② 구글 비즈니스 프로필 (3개)
  {
    id: "m5",
    number: 5,
    category: "google_gbp",
    title: "구글 비즈니스 프로필 등록 + 네이버 정보 그대로 복사",
    duration: "15분",
    why: "ChatGPT는 여러 출처에 같은 정보가 일치할 때 매장을 신뢰합니다. 네이버에만 있고 구글에 없으면 '정보가 부족한 매장'으로 판단해요. 외국인 손님 노출에도 도움이 됩니다.",
    howToCheck: [
      "구글에서 '본인 매장명 + 지역' 검색",
      "우측에 매장 정보 카드(영업시간/주소/전화)가 뜨는지 확인",
      "안 뜨면 미등록 상태",
    ],
    howToFix: [
      "business.google.com 접속",
      "'비즈니스 추가' → 매장명 입력",
      "네이버 플레이스에 등록한 정보를 글자 그대로 복사",
      "우편물로 인증 코드 받기 (1~2주 소요)",
    ],
    warning:
      "네이버와 다른 매장명/주소를 쓰면 오히려 혼란을 줍니다. 100% 동일하게 입력하세요.",
  },
  {
    id: "m6",
    number: 6,
    category: "google_gbp",
    title: "사진 3장 등록 (네이버 사진 그대로)",
    duration: "5분",
    why: "네이버에 올린 사진을 그대로 구글에도 올리면 작업 시간이 짧고, 두 플랫폼 정보 일관성도 강화됩니다.",
    howToCheck: [
      "구글 매장 정보 카드 → 사진 영역 확인",
      "외관/내부/메뉴 사진 최소 3장 있는지 점검",
    ],
    howToFix: [
      "business.google.com → 본인 매장 → '사진'",
      "네이버에 올린 사진 중 외관 1장, 내부 1장, 메뉴 1장 다운로드",
      "구글에 업로드",
    ],
  },
  {
    id: "m7",
    number: 7,
    category: "google_gbp",
    title: "카테고리 정확 분류 + 영문 1문장 추가",
    duration: "10분",
    why: "카테고리가 정확해야 GPT가 '어떤 종류의 매장인지' 분류합니다. 영문 한 줄은 외국인 손님과 글로벌 AI 학습 데이터에 들어갑니다.",
    howToCheck: [
      "구글 매장 정보 → 카테고리 확인 (예: 한식당, 분식점)",
      "비즈니스 설명에 영문이 있는지 확인",
    ],
    howToFix: [
      "business.google.com → '기본 정보'",
      "카테고리 정확히 선택 (예: Korean restaurant, Pork knuckle)",
      "비즈니스 설명에 영문 한 줄 추가",
    ],
    template:
      "Authentic Korean [음식종류] restaurant in [지역명], famous for [대표 메뉴].",
    goodExample:
      "Authentic Korean pork knuckle restaurant in Seongsu-dong, famous for slow-aged jokbal and house-made bossam kimchi.",
    tip: "영문 모르겠으면 ChatGPT에 한국어 소개글 던지고 '영문 한 줄로 번역해줘' 하면 됩니다.",
  },

  // ③ 리뷰 답글 (2개)
  {
    id: "m8",
    number: 8,
    category: "review",
    title: "최근 30일 받은 리뷰 모두에 답글 달기",
    duration: "30분",
    why: "가중치가 가장 높은 영역 중 하나입니다. 리뷰 답글 텍스트는 GPT가 학습하고 인용합니다. 답글이 없으면 사장님 매장의 '목소리'가 GPT에 들어가지 못해요.",
    howToCheck: [
      "네이버 지도 → 본인 매장 → '리뷰' 탭",
      "최근 30일 리뷰에 답글이 모두 달려 있는지 확인",
    ],
    howToFix: [
      "스마트플레이스 앱 → 리뷰 관리",
      "답글 없는 리뷰부터 차례로 답글",
      "한 줄 답글이라도 OK ('방문해주셔서 감사합니다!')",
    ],
    warning:
      "AI로 똑같은 답글 복붙 X. 손님 이름이나 메뉴를 언급해서 개인화하세요.",
  },
  {
    id: "m9",
    number: 9,
    category: "review",
    title: "답글에 핵심 키워드 자연스럽게 포함",
    duration: "미션 8과 함께",
    why: "답글에 들어간 키워드(지역명, 업종, 메뉴 특징)가 GPT 학습 데이터에 그대로 들어갑니다. '성수동 족발집'이라고 답글에 한 번 쓰면, GPT가 '성수동 족발' 검색 시 이 매장을 떠올릴 가능성이 올라가요.",
    howToCheck: [
      "지역명 (예: 성수동, 강남) 1번 이상 언급되어 있는지",
      "업종/메뉴 (예: 족발, 보쌈) 1번 이상 언급되어 있는지",
      "특징 (예: 회식, 가족모임, 가성비) 1번 이상 언급되어 있는지",
    ],
    howToFix: [
      "기존 답글을 점검하고 키워드 추가",
      "새 답글 작성 시 위 3가지 자연스럽게 포함",
    ],
    badExample: "감사합니다 또 오세요",
    goodExample:
      "성수동까지 찾아주셔서 감사합니다! 회식 분위기 좋게 즐기셨다니 다행이에요. 다음번엔 보쌈정식도 추천드려요 :)",
    warning: "키워드 욱여넣기 X. 어색하면 효과가 떨어집니다.",
  },

  // ④ 외부 디지털 언급 (3개)
  {
    id: "m10",
    number: 10,
    category: "external_mention",
    title: "매장 인스타 위치 태그 + 해시태그 정확히 등록",
    duration: "10분",
    why: "인스타그램은 한국에서 GPT의 핵심 학습 데이터 중 하나입니다. 위치 태그가 정확해야 '어느 동네 매장'인지 GPT가 인식합니다.",
    howToCheck: [
      "인스타에서 본인 매장명 검색",
      "매장 위치 페이지가 떠있는지 확인 (없으면 미등록)",
      "본인 게시물에 위치 태그가 매장 위치와 일치하는지 확인",
    ],
    howToFix: [
      "인스타에서 게시물 작성 시 '위치 추가' → 본인 매장 선택",
      "매장 위치가 검색 안 되면 → 페이스북에 매장 등록 (인스타와 연동됨)",
      "해시태그 5개 추가: #지역명 / #지역+업종 / #업종 / #특징 / #매장명",
    ],
    template:
      "예시: #성수동 #성수동족발 #족발 #회식장소 #OO족발",
    warning: "너무 많은 해시태그(20개+)는 스팸 신호입니다. 5~10개가 적정.",
  },
  {
    id: "m11",
    number: 11,
    category: "external_mention",
    title: "매장 SNS에 신메뉴/이벤트 게시물 발행",
    duration: "20분",
    why: "정기적으로 새 콘텐츠가 올라오는 매장이 '활성 매장'으로 인식됩니다. 정지된 계정은 GPT가 신뢰하지 않아요.",
    howToCheck: [
      "인스타 본인 계정 마지막 게시물 날짜 확인",
      "30일 이내 게시물이 있으면 OK",
    ],
    howToFix: [
      "다음 중 1개 발행:",
      "1) 신메뉴 소개 (사진 + 메뉴명 + 가격 + 한 줄 설명)",
      "2) 계절 이벤트 (연말 모임 / 봄 신메뉴 / 휴가철)",
      "3) 매장 일상 (사장님 인사, 재료 손질 영상)",
    ],
    template:
      "[메뉴명/이벤트명]\n[한 줄 설명]\n📍 [지역+매장명]\n⏰ [영업시간]\n📞 [전화번호]\n#해시태그 5~10개",
    tip: "주 1회 발행이 베스트. 어렵다면 월 2회라도.",
  },
  {
    id: "m12",
    number: 12,
    category: "external_mention",
    title: "매장명+지역으로 네이버 검색 → 외부 언급 현황 파악",
    duration: "5분",
    why: "사장님이 본인 매장의 현재 디지털 발자국을 파악하는 미션입니다. 외부 언급이 적다면 그게 GPT 노출 안 되는 가장 큰 원인입니다.",
    howToCheck: [
      "네이버에서 '매장명 + 지역' 검색 (예: OO족발 성수동)",
      "블로그 탭 클릭 → 외부 글 개수 확인",
      "카페 탭 클릭 → 언급 개수 확인",
      "이미지 탭 → 외부 사진 개수 확인",
    ],
    howToFix: [
      "현재 상태를 인지하는 미션 (수치만 확인)",
      "블로그 글 0~2개: ⚠️ 매우 부족",
      "블로그 글 3~9개: 보통, 개선 필요",
      "블로그 글 10개+: 양호",
      "부족하면 인사이트 단계 또는 실행 플랜으로 보완",
    ],
    warning:
      "절대 금지: 가짜 블로그 리뷰 대량 생성, 체험단 어뷰징 → 네이버 영구 차단 위험",
  },

  // ⑤ 공식 채널 (3개)
  {
    id: "m13",
    number: 13,
    category: "official_channel",
    title: "인스타 비즈니스 계정 생성 또는 전환",
    duration: "15분",
    why: "일반 계정 vs 비즈니스 계정은 GPT가 처리하는 신호가 다릅니다. 비즈니스 계정만 위치/카테고리/연락처 정보가 명확히 인식돼요.",
    howToCheck: [
      "인스타 본인 매장 계정 → 프로필 확인",
      "프로필에 카테고리 라벨 (예: 한식당)이 보이면 비즈니스 계정",
      "안 보이면 일반 계정",
    ],
    howToFix: [
      "인스타 앱 → 설정 → 계정",
      "'프로페셔널 계정으로 전환' → '비즈니스' 선택",
      "카테고리 선택 (음식점/한식 등)",
      "연락처 정보 등록",
    ],
    tip: "비즈니스 계정 = 인사이트 통계도 무료로 볼 수 있습니다.",
  },
  {
    id: "m14",
    number: 14,
    category: "official_channel",
    title: "인스타 프로필에 매장 핵심 정보 모두 등록",
    duration: "10분",
    why: "인스타 프로필 텍스트는 GPT가 직접 학습합니다. 매장 핵심 정보가 프로필에 모두 있으면 GPT가 사장님 매장을 한 번에 이해해요.",
    howToCheck: [
      "매장명 (또는 매장 한 줄 소개)이 있는지",
      "주소 (지역+동까지)가 있는지",
      "영업시간이 있는지",
      "네이버 플레이스 링크 (또는 카카오맵 링크)가 있는지",
    ],
    howToFix: ["인스타 프로필 수정 → 아래 템플릿대로 입력"],
    template:
      "🍽️ [한 줄 소개]\n📍 [지역명/주소]\n⏰ [영업시간]\n📞 [전화번호]\n🔗 [네이버/카카오맵 링크]",
    goodExample:
      "🍽️ 12시간 저온 숙성 정통 족발\n📍 성수동 카페거리\n⏰ 매일 11:30~22:00 (브레이크 15:00~17:00)\n📞 02-XXXX-XXXX\n🔗 [naver.me/단축링크]",
    tip: "링크는 1개만 들어가니까 가장 중요한 것 (네이버 플레이스) 우선.",
  },
  {
    id: "m15",
    number: 15,
    category: "official_channel",
    title: "카카오톡 채널 생성 + 매장 정보 등록",
    duration: "15분",
    why: "카카오톡 채널은 한국 외식업의 대표 고객 소통 창구입니다. 채널이 없으면 단골 락인이 약하고, GPT가 인식하는 매장 신뢰도도 낮아져요.",
    howToCheck: [
      "카카오톡에서 본인 매장명 검색",
      "채널 결과가 뜨는지 확인",
      "안 뜨면 미등록",
    ],
    howToFix: [
      "center-pf.kakao.com 접속 (PC 권장)",
      "카카오 계정 로그인 → '채널 만들기'",
      "채널명, 검색용 아이디, 카테고리 입력",
      "프로필 사진 + 배경 이미지 등록 (네이버 사진 활용)",
      "채널 소개에 미션 4 소개글 그대로 복붙",
    ],
    tip: "채널 검색 노출은 최초 등록 후 수일 걸립니다. 등록만 해놓고 기다리세요.",
  },
];

// ─────────────────────────────────────────────
// 유틸 함수
// ─────────────────────────────────────────────

export function getMissionsByCategory(category: MissionCategory): Mission[] {
  return MISSIONS.filter((m) => m.category === category);
}

export function getCategoriesInOrder(): CategoryInfo[] {
  return [...CATEGORIES].sort((a, b) => a.order - b.order);
}

export function getTotalMissionCount(): number {
  return MISSIONS.length; // 15
}

// ─────────────────────────────────────────────
// localStorage 헬퍼 (베타용 임시 저장)
// 정식 출시 시 Supabase로 마이그레이션
// ─────────────────────────────────────────────

const STORAGE_KEY = "talkb_mission_completion";

export function getCompletedMissions(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleMissionCompletion(missionId: string): string[] {
  if (typeof window === "undefined") return [];
  const current = getCompletedMissions();
  const updated = current.includes(missionId)
    ? current.filter((id) => id !== missionId)
    : [...current, missionId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function getCompletionRate(): number {
  const completed = getCompletedMissions();
  return Math.round((completed.length / MISSIONS.length) * 100);
}

// ─────────────────────────────────────────────
// 난이도 순서 (결과 페이지 "다음 미션" 기준)
// ─────────────────────────────────────────────

export const MISSION_ORDER_BY_DIFFICULTY: string[] = [
  // Tier 1 - 매우 쉬움 (5분, 단순 확인/복붙)
  "m1",  // 매장명/주소/전화/영업시간 확인
  "m12", // 매장명+지역 네이버 검색
  "m6",  // 구글 GBP 사진 3장
  // Tier 2 - 쉬움 (10분, 양식 따라하기)
  "m14", // 인스타 프로필 정보 등록
  "m7",  // 구글 GBP 카테고리 + 영문 1문장
  "m10", // 인스타 위치 태그 + 해시태그
  // Tier 3 - 보통 (15분, 가입/등록)
  "m13", // 인스타 비즈니스 계정 전환
  "m15", // 카카오톡 채널 생성
  "m4",  // 업체 소개글 100자
  "m5",  // 구글 GBP 등록 + 인증
  // Tier 4 - 어려움 (20분, 창작 작업)
  "m11", // SNS 신메뉴/이벤트 게시물
  "m3",  // 사진 5장 등록
  // Tier 5 - 가장 어려움 (30분, 양 많음)
  "m2",  // 메뉴 + 가격 모두 등록
  "m8",  // 최근 30일 리뷰 답글
  "m9",  // 답글에 핵심 키워드
];

export function getNextMission(completedIds: string[]): Mission | null {
  const nextId = MISSION_ORDER_BY_DIFFICULTY.find((id) => !completedIds.includes(id));
  if (!nextId) return null;
  return MISSIONS.find((m) => m.id === nextId) ?? null;
}
