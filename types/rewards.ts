export const KAKAO_SHARE_MESSAGE = `GPT에게 우리 매장을 말하게 하다 - 토크비

요즘 손님들은 GPT에 물어봅니다.
"강남에서 회식하기 좋은 한식당 추천해줘"

우리 매장, GPT에 노출되고 있나요?
토크비로 무료 진단받아보세요!`;

export const getInviteLink = (inviterId: string) =>
  `https://app.talkb.co.kr/?ref=${inviterId}&utm_source=invite`;

export const INVITE_COPY = {
  cardHeader: "🤝 함께 성장하고 싶은 사장님이 있으신가요?",
  cardSubheader: "토크비를 소개해드리고 사장님도 추가 혜택을 받아보세요",
  rewardConditionTitle: "사장님 1분 초대 = 매번 받는 혜택 (택 1)",
  inviterRewards: [
    "🏪 매장 1개 추가 등록 (최대 3매장까지)",
    "🎫 진단권 1개 추가 (월 최대 5개)",
  ],
  inviteeRewardTitle: "🎉 초대받은 사장님 혜택",
  inviteeRewards: ["🎫 진단권 1개 보너스"],
  rewardCondition:
    "⚠️ 보상은 초대받은 사장님이 매장 등록 + 첫 진단 완료 시 양쪽에 지급됩니다",
  primaryButton: "사장님 초대하기 →",
  myPageCardTitle: "🤝 함께 성장하기 현황",
  inviteCountLabel: "초대한 사장님",
  inviteCountUnit: "분",
};
