"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  MISSIONS,
  getCompletedMissions,
  toggleMissionCompletion,
  getNextMission,
  MISSION_ORDER_BY_DIFFICULTY,
} from "@/lib/missions-data";
import type { Mission } from "@/lib/missions-data";
import type { QuestionResult } from "@/types/diagnosis";
import InstallPrompt from "@/components/talkb/install-prompt";
import { INVITE_COPY } from "@/types/rewards";

// ── 목업 측정 결과 (동균팀장 GPT API 연동 시 QuestionResult[] 형태로 교체) ──
const measurementResults: QuestionResult[] = [
  {
    depth: "D1",
    type: "지역+업종",
    question: "광장동 분위기 좋은 한식당 추천해줘",
    answered: false,
    recommendedStores: ["이리스 한정식", "광장동 명가", "수라온 한정식"],
  },
  {
    depth: "D2",
    type: "의도형",
    question: "광장동 가족 모임하기 좋은 식당 추천해줘",
    answered: false,
    recommendedStores: ["광장동 한정식 명가", "장원 가든", "수라온 한정식"],
  },
  {
    depth: "D2",
    type: "의도형",
    question: "광장동 회식 장소 어디가 좋아?",
    answered: false,
    recommendedStores: ["광장동 명가", "이리스 한정식", "장원 가든"],
  },
  {
    depth: "D2",
    type: "의도형",
    question: "광장동 룸 있는 한정식 맛집 알려줘",
    answered: false,
    recommendedStores: ["수라온 한정식", "광장동 명가", "한정식 진"],
  },
  {
    depth: "D3",
    type: "매장명+상세",
    question: "한미옥 영업시간이랑 주차 알려줘",
    answered: true,
    recommendedStores: ["한미옥 광장점"],
  },
];

// Tier 1 미션 IDs (5분짜리 3개)
const TIER1_IDS = ["m1", "m12", "m6"];

const TOTAL_MISSIONS = 15;

function getCelebrationMsg(missionId: string, newCompleted: string[]): string {
  const tier1Done = TIER1_IDS.every((id) => newCompleted.includes(id));
  if (tier1Done && TIER1_IDS.includes(missionId)) {
    return "🎉 5분 미션 모두 완료! 이제 조금 더 깊이 들어가볼까요?";
  }
  if (newCompleted.length === 1) {
    return "🎉 첫 미션 완료! 이렇게 하나씩 해보세요";
  }
  return "🎉 잘하셨어요! 다음 미션을 준비했어요";
}

function KakaoIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="currentColor">
      <path d="M9 1C4.582 1 1 3.694 1 7.018c0 2.116 1.435 3.973 3.6 5.034l-.728 2.649c-.06.218.18.39.366.262L7.41 12.83C7.93 12.92 8.46 13 9 13c4.418 0 8-2.694 8-6.018C17 3.694 13.418 1 9 1z" />
    </svg>
  );
}

// ── 미션 가이드 펼침 내용 ────────────────────────────────────
function MissionGuide({ mission }: { mission: Mission }) {
  return (
    <div style={{
      background: "var(--bg-soft)",
      borderTop: "1px solid var(--border-soft)",
      padding: "14px 12px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    }}>
      <div>
        <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink)", margin: "0 0 5px" }}>
          🎯 왜 필요한가요?
        </p>
        <p style={{ fontSize: "12.5px", color: "var(--ink-mid)", margin: 0, lineHeight: 1.65 }}>
          {mission.why}
        </p>
      </div>

      <div>
        <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px" }}>
          ✅ 어떻게 확인하나요?
        </p>
        <ol style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {mission.howToCheck.map((item, i) => (
            <li key={i} style={{ fontSize: "12.5px", color: "var(--ink-mid)", lineHeight: 1.6 }}>
              {item}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px" }}>
          🛠️ 안 되어 있다면?
        </p>
        <ol style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {mission.howToFix.map((item, i) => (
            <li key={i} style={{ fontSize: "12.5px", color: "var(--ink-mid)", lineHeight: 1.6 }}>
              {item}
            </li>
          ))}
        </ol>
      </div>

      {mission.template && (
        <div style={{
          background: "var(--white)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-sm)",
          padding: "10px 12px",
        }}>
          <p style={{
            fontSize: "10px", fontWeight: 700, color: "var(--ink-muted)",
            margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            📝 템플릿
          </p>
          <p style={{
            fontSize: "12px", color: "var(--ink-mid)", margin: 0,
            lineHeight: 1.7, fontFamily: "var(--f-mono)", whiteSpace: "pre-line",
          }}>
            {mission.template}
          </p>
        </div>
      )}

      {mission.goodExample && (
        <div style={{
          background: "#F0FDF4", border: "1px solid #BBF7D0",
          borderRadius: "var(--r-sm)", padding: "10px 12px",
        }}>
          <p style={{
            fontSize: "10px", fontWeight: 700, color: "#166534",
            margin: "0 0 5px", textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            ✅ 좋은 예시
          </p>
          <p style={{ fontSize: "12px", color: "#166534", margin: 0, lineHeight: 1.65, whiteSpace: "pre-line" }}>
            {mission.goodExample}
          </p>
        </div>
      )}

      {mission.badExample && (
        <div style={{
          background: "#FFF1F2", border: "1px solid #FECDD3",
          borderRadius: "var(--r-sm)", padding: "10px 12px",
        }}>
          <p style={{
            fontSize: "10px", fontWeight: 700, color: "#9F1239",
            margin: "0 0 5px", textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            ❌ 이런 답글은 효과 없어요
          </p>
          <p style={{ fontSize: "12px", color: "#9F1239", margin: 0, lineHeight: 1.65 }}>
            {mission.badExample}
          </p>
        </div>
      )}

      {mission.warning && (
        <div style={{
          background: "#FFFBEB", border: "1px solid #FDE68A",
          borderRadius: "var(--r-sm)", padding: "10px 12px",
        }}>
          <p style={{ fontSize: "12px", color: "#92400E", margin: 0, lineHeight: 1.65 }}>
            <strong>⚠️ </strong>{mission.warning}
          </p>
        </div>
      )}

      {mission.tip && (
        <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: 0, fontStyle: "italic" }}>
          💡 팁: {mission.tip}
        </p>
      )}
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [completed, setCompleted] = useState<string[]>([]);
  const [celebrationMsg, setCelebrationMsg] = useState<string | null>(null);
  const [completedOpen, setCompletedOpen] = useState(false);
  const celebrationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCompleted(getCompletedMissions());
  }, []);

  const handleToggle = (missionId: string) => {
    const updated = toggleMissionCompletion(missionId);
    const wasAdded = updated.includes(missionId);

    setCompleted([...updated]);

    if (wasAdded) {
      if (celebrationTimer.current) clearTimeout(celebrationTimer.current);
      setCelebrationMsg(getCelebrationMsg(missionId, updated));
      celebrationTimer.current = setTimeout(() => setCelebrationMsg(null), 2000);
    } else {
      setCelebrationMsg(null);
    }
  };

  const handleShare = async () => {
    const link = `https://app.talkb.co.kr/?ref=user&utm_source=invite`;
    const text = `GPT에게 우리 매장을 말하게 하다 - 토크비\n\n요즘 손님들은 GPT에 물어봅니다.\n"강남에서 회식하기 좋은 한식당 추천해줘"\n\n우리 매장, GPT에 노출되고 있나요?\n토크비로 무료 진단받아보세요!\n${link}`;

    const kakao = (window as typeof window & { Kakao?: { isInitialized?: () => boolean; Share?: { sendDefault: (opts: Record<string, unknown>) => void } } }).Kakao;
    if (kakao?.isInitialized?.() && kakao?.Share) {
      kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "토크비 (TalkB) | GPT에게 우리 매장을 말하게 하다",
          description: "우리 매장이 GPT에 노출되고 있나요? 무료 진단받아보세요!",
          imageUrl: "https://app.talkb.co.kr/og-image-kakao.png",
          link: { mobileWebUrl: link, webUrl: link },
        },
        buttons: [{ title: "무료 진단받기", link: { mobileWebUrl: link, webUrl: link } }],
      });
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({ title: "토크비 (TalkB)", text, url: link });
        return;
      } catch {
        // fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(link);
      alert("초대 링크가 복사되었어요!");
    } catch {
      prompt("링크를 복사해주세요:", link);
    }
  };

  const answeredCount = measurementResults.filter((q) => q.answered).length;
  const completionPct = Math.round((completed.length / TOTAL_MISSIONS) * 100);
  const nextMission = getNextMission(completed);
  const allDone = completed.length === TOTAL_MISSIONS;

  // 완료 미션을 난이도 순서 기준으로 정렬
  const completedMissions = MISSION_ORDER_BY_DIFFICULTY
    .filter((id) => completed.includes(id))
    .map((id) => MISSIONS.find((m) => m.id === id))
    .filter((m): m is Mission => !!m);

  return (
    <div className="app-container">
      <Header isLoggedIn={true} stores={[{ name: "한미옥 광장점" }]} />

      <main style={{ padding: "20px 20px 112px" }}>

        {/* ─── [1] 헤더 영역 ──────────────────────────────── */}
        <span style={{
          display: "inline-block", fontSize: "11px", color: "var(--accent)",
          background: "var(--accent-soft)", padding: "5px 10px", borderRadius: "999px",
          marginBottom: "12px", fontWeight: 600, letterSpacing: "0.02em",
        }}>
          Step 4 of 4 · 진단 결과
        </span>

        {/* 카카오톡 발송 안내 배너 */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          background: "#F5F0E8", borderRadius: "var(--r-md)",
          padding: "12px 14px", marginBottom: "20px",
          border: "1px solid #E8E0D0",
        }}>
          <span style={{ fontSize: "18px", flexShrink: 0 }}>📨</span>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#4A3F2F", margin: "0 0 2px" }}>
              카카오톡으로도 결과를 보내드렸어요
            </p>
            <p style={{ fontSize: "12px", color: "#7A6A55", margin: 0, lineHeight: 1.5 }}>
              언제든 알림톡으로 다시 확인하실 수 있어요
            </p>
          </div>
        </div>

        {/* ─── [2] GPT 노출 측정 결과 ─────────────────────── */}
        <div style={{
          background: "var(--bg-dark)", borderRadius: "var(--r-lg)",
          padding: "24px", marginBottom: "16px",
        }}>
          <p style={{
            fontSize: "12px", fontWeight: 700, color: "#A3A3A3",
            margin: "0 0 20px", letterSpacing: "0.04em",
          }}>
            🔍 ChatGPT가 사장님 매장을 알고 있는지 확인했어요
          </p>

          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <p style={{
              fontSize: "60px", fontWeight: 900, color: "var(--accent)",
              margin: 0, lineHeight: 1, fontFamily: "var(--f-mono)",
            }}>
              {answeredCount}/5
            </p>
            <p style={{ fontSize: "14px", color: "#D4D4D8", margin: "10px 0 0" }}>
              5개 질문 중 {answeredCount}개에서 답변했어요
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {measurementResults.map((q, i) => (
              <div key={i} style={{
                padding: "12px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "var(--r-sm)",
                border: `1px solid ${q.answered ? "rgba(22,163,74,0.25)" : "rgba(255,255,255,0.06)"}`,
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: q.answered ? 0 : "10px" }}>
                  <span style={{
                    fontSize: "10px", fontWeight: 700, padding: "2px 6px",
                    borderRadius: "4px", flexShrink: 0, marginTop: "2px",
                    background: "rgba(255,255,255,0.08)", color: "#B0B0B8",
                    fontFamily: "var(--f-mono)",
                  }}>
                    {q.depth}
                  </span>
                  <span style={{ fontSize: "12.5px", color: "#D4D4D8", flex: 1, lineHeight: 1.5 }}>
                    {q.question}
                  </span>
                  <span style={{
                    fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0,
                    color: q.answered ? "var(--success)" : "#9E9EA8",
                    background: q.answered ? "rgba(22,163,74,0.15)" : "rgba(255,255,255,0.05)",
                    padding: "3px 8px", borderRadius: "999px", marginTop: "1px",
                  }}>
                    {q.answered ? "✓ 노출됐어요" : "✗ 노출 안 됨"}
                  </span>
                </div>

                {!q.answered && q.recommendedStores && q.recommendedStores.length > 0 && (
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "6px",
                    padding: "8px 10px",
                  }}>
                    <p style={{
                      fontSize: "10.5px", fontWeight: 700, color: "#C8C8D0",
                      margin: "0 0 5px", letterSpacing: "0.02em",
                    }}>
                      💡 GPT가 추천한 매장
                    </p>
                    <p style={{ fontSize: "12px", color: "#D4D4D8", margin: 0, lineHeight: 1.6 }}>
                      {q.recommendedStores.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "16px", padding: "12px 14px",
            background: "rgba(255,255,255,0.04)", borderRadius: "var(--r-sm)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <p style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 700, margin: "0 0 5px" }}>
              잠깐, 이게 중요해요
            </p>
            <p style={{ fontSize: "12.5px", color: "#C4C4CC", margin: 0, lineHeight: 1.65 }}>
              사장님이 직접 검색하면 내 매장이 나옵니다.{" "}
              <strong style={{ color: "#F0F0F4" }}>처음 방문하는 손님의 GPT는 전혀 다른 결과</strong>를 보여줍니다.
              이 진단은 그 손님 시점으로 측정한 결과입니다.
            </p>
          </div>

          <div style={{
            marginTop: "12px", padding: "12px 14px",
            background: "rgba(232,93,58,0.08)", borderRadius: "var(--r-sm)",
            border: "1px solid rgba(232,93,58,0.2)",
          }}>
            <p style={{ fontSize: "12.5px", color: "#F4A580", margin: 0, lineHeight: 1.7 }}>
              💡 GPT가 다른 매장들은 자주 추천하는데 사장님 매장은 빠져있어요.{" "}
              <strong style={{ color: "#FAFAFA" }}>아래 체크리스트로 그 차이를 만들어보세요.</strong>
            </p>
          </div>
        </div>

        {/*
          카카오톡 채널 구독 카드 — 비즈채널 심사 완료 후 재도입
          심사 완료 예상: 2026년 5월 초
          TODO: 자동 구독 상태 감지 + 상태별 카드 동적 변경 (동균팀장 협업)
          - kakao webhook + 알림톡 발송 결과 기반 구독 상태 자동 감지
          - Supabase users 테이블에 kakao_subscribed 필드 추가
          - 구독 상태별 카드: unsubscribed / subscribed / unsubscribed_again

          <div style={{
            background: "#1A1A0A", border: "1px solid #7A6A00",
            borderRadius: "var(--r-md)", padding: "18px 16px", marginBottom: "16px",
          }}>
            <p style={{ fontSize: "14px", fontWeight: 800, color: "#FEE500", margin: "0 0 14px" }}>
              🔔 토크비 구독하면 매월 무료 자동 진단해드려요
            </p>
            체크리스트: GPT 노출 변화 추적 / 카카오톡 자동 발송 / 구독 유지 시 영구 무료
            안내: ⓘ 구독 해지(채널 차단) 시 매월 자동 진단이 중단돼요
            <a href="https://pf.kakao.com/_JxlWTX" target="_blank" rel="noopener noreferrer">
              토크비 구독하기
            </a>
          </div>
        */}

        {/* ─── [3] PDF 다운로드 ──────────────────────────── */}
        <div style={{
          background: "#FFF7F3", border: "1px solid rgba(232,93,58,0.2)",
          borderRadius: "var(--r-md)", padding: "14px 16px", marginBottom: "28px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--accent-deep)", margin: "0 0 3px" }}>
                📄 내 매장 진단 결과 PDF
              </p>
              <p style={{ fontSize: "11.5px", color: "#C94422", margin: 0, lineHeight: 1.5 }}>
                토크비가 분석한 GEO 진단 보고서
              </p>
            </div>
            <a
              href="/sample-guide.pdf"
              download="TalkB_GPT최적화_컨설팅자료집.pdf"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "9px 16px", background: "var(--accent)", color: "#FFFFFF",
                borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
                textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              PDF 받기
            </a>
          </div>
        </div>

        {/* ─── [4] 미션 체크리스트 섹션 ───────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <p style={{
            fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)",
            margin: 0, textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            개선 미션 체크리스트
          </p>
          <span style={{
            fontSize: "12px", fontWeight: 700,
            color: allDone ? "var(--success)" : "var(--accent)",
            fontFamily: "var(--f-mono)",
          }}>
            {completed.length}/{TOTAL_MISSIONS} 완료
          </span>
        </div>

        {/* 모두 완료 → 축하 카드 */}
        {allDone ? (
          <div style={{
            background: "#F0FDF4", border: "1px solid #86EFAC",
            borderRadius: "var(--r-md)", padding: "24px 20px", marginBottom: "20px",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "28px", margin: "0 0 8px" }}>🌟</p>
            <p style={{ fontSize: "20px", fontWeight: 900, color: "#166534", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
              모든 미션 완료!
            </p>
            <p style={{ fontSize: "13px", color: "#16A34A", margin: "0 0 16px", lineHeight: 1.65 }}>
              사장님 매장의 GPT 노출 기본기를<br />완벽하게 세팅하셨어요!
            </p>
            <p style={{ fontSize: "12px", color: "#15803D", margin: "0 0 20px", lineHeight: 1.6 }}>
              GPT 학습 반영까지 2~4주 소요됩니다.<br />
              토크비가 매월 자동 진단해드릴게요!
            </p>
            <button
              onClick={() => router.push("/mypage")}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "13px 24px", background: "#16A34A", color: "#FFFFFF",
                borderRadius: "var(--r-sm)", fontSize: "14px", fontWeight: 800,
                border: "none", cursor: "pointer",
              }}
            >
              마이페이지에서 결과 확인 →
            </button>
          </div>
        ) : (
          <>
            {/* 종합 진척도 카드 */}
            <div style={{
              background: "var(--bg-soft)", border: "1px solid var(--border)",
              borderRadius: "var(--r-md)", padding: "16px", marginBottom: "16px",
            }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)", margin: "0 0 12px" }}>
                🎯 사장님 매장 GPT 노출 기본기
              </p>
              <div style={{
                height: "8px", background: "var(--bg-deep)", borderRadius: "999px",
                overflow: "hidden", marginBottom: "8px",
              }}>
                <div style={{
                  height: "100%", background: "var(--accent)", borderRadius: "999px",
                  width: `${completionPct}%`, transition: "width 0.4s ease",
                }} />
              </div>
              <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: 0, textAlign: "right" }}>
                <span style={{
                  fontWeight: 700,
                  color: completed.length > 0 ? "var(--accent)" : "var(--ink-muted)",
                  fontFamily: "var(--f-mono)",
                }}>
                  {completed.length}/{TOTAL_MISSIONS}
                </span>{" "}미션 완료 · {completionPct}%
              </p>
            </div>

            {/* 축하 토스트 */}
            {celebrationMsg && (
              <div style={{
                background: "#F0FDF4", border: "1px solid #86EFAC",
                borderRadius: "var(--r-sm)", padding: "12px 14px", marginBottom: "12px",
                transition: "opacity 0.3s ease",
              }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#166534", margin: 0 }}>
                  {celebrationMsg}
                </p>
              </div>
            )}

            {/* 다음 미션 카드 */}
            {nextMission && (
              <div style={{
                background: "var(--white)", border: "2px solid var(--accent)",
                borderRadius: "var(--r-md)", padding: "16px", marginBottom: "16px",
                boxShadow: "0 2px 12px rgba(232,93,58,0.1)",
              }}>
                <p style={{
                  fontSize: "11px", fontWeight: 700, color: "var(--accent)",
                  margin: "0 0 12px", letterSpacing: "0.04em", textTransform: "uppercase",
                }}>
                  🎯 사장님의 다음 미션
                </p>

                {/* 미션 아코디언 (단일) */}
                <Accordion type="single" collapsible style={{ marginBottom: "14px" }}>
                  <AccordionItem
                    value={nextMission.id}
                    className="border-0"
                    style={{
                      background: "var(--bg-soft)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r-sm)",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 12px" }}>
                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ paddingTop: "3px", flexShrink: 0 }}
                      >
                        <Checkbox
                          id={`cb-next-${nextMission.id}`}
                          checked={completed.includes(nextMission.id)}
                          onCheckedChange={() => handleToggle(nextMission.id)}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <AccordionTrigger className="py-0 hover:no-underline w-full">
                          <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                            <p style={{
                              fontSize: "14px", fontWeight: 700, margin: "0 0 3px",
                              color: "var(--ink)", lineHeight: 1.4,
                            }}>
                              {nextMission.title}
                            </p>
                            <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: 0 }}>
                              ⏱ {nextMission.duration}
                            </p>
                          </div>
                        </AccordionTrigger>
                      </div>
                    </div>
                    <AccordionContent className="p-0">
                      <MissionGuide mission={nextMission} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <p style={{
                  fontSize: "12px", color: "var(--ink-mid)", margin: 0,
                  lineHeight: 1.65, textAlign: "center",
                }}>
                  💡 1개씩 차근차근 진행하면<br />
                  부담 없이 GPT 노출 기본기를 완성할 수 있어요!
                </p>
              </div>
            )}

            {/* 완료한 미션 영역 (1개 이상일 때만 표시) */}
            {completedMissions.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <button
                  onClick={() => setCompletedOpen((v) => !v)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    width: "100%", padding: "12px 14px",
                    background: "var(--bg-soft)", border: "1px solid var(--border)",
                    borderRadius: completedOpen ? "var(--r-sm) var(--r-sm) 0 0" : "var(--r-sm)",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--success)" }}>
                    ✅ 완료한 미션 ({completedMissions.length})
                  </span>
                  <span style={{
                    fontSize: "11px", color: "var(--ink-muted)",
                    transition: "transform 0.2s",
                    display: "inline-block",
                    transform: completedOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}>
                    ▼
                  </span>
                </button>

                {completedOpen && (
                  <div style={{
                    border: "1px solid var(--border)", borderTop: "none",
                    borderRadius: "0 0 var(--r-sm) var(--r-sm)",
                    overflow: "hidden",
                  }}>
                    <Accordion type="multiple" style={{ display: "flex", flexDirection: "column" }}>
                      {completedMissions.map((mission) => (
                        <AccordionItem
                          key={mission.id}
                          value={mission.id}
                          className="border-0"
                          style={{
                            background: "var(--success-soft)",
                            borderBottom: "1px solid rgba(22,163,74,0.1)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 12px" }}>
                            <div
                              onClick={(e) => e.stopPropagation()}
                              style={{ paddingTop: "3px", flexShrink: 0 }}
                            >
                              <Checkbox
                                id={`cb-done-${mission.id}`}
                                checked={true}
                                onCheckedChange={() => handleToggle(mission.id)}
                              />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <AccordionTrigger className="py-0 hover:no-underline w-full">
                                <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                                  <p style={{
                                    fontSize: "13px", fontWeight: 600, margin: "0 0 2px",
                                    color: "var(--ink-muted)",
                                    textDecoration: "line-through",
                                    lineHeight: 1.45,
                                  }}>
                                    {mission.title}
                                  </p>
                                  <p style={{ fontSize: "11px", color: "var(--ink-muted)", margin: 0 }}>
                                    ⏱ {mission.duration}
                                  </p>
                                </div>
                              </AccordionTrigger>
                            </div>
                          </div>
                          <AccordionContent className="p-0">
                            <MissionGuide mission={mission} />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>
            )}

            {/* 전체 미션 마이페이지 안내 */}
            <div style={{
              textAlign: "center", padding: "12px 0", marginBottom: "24px",
            }}>
              <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: "0 0 6px" }}>
                💡 전체 15개 미션은 마이페이지에서 확인하실 수 있어요
              </p>
              <Link
                href="/mypage"
                style={{
                  fontSize: "12px", fontWeight: 700,
                  color: "var(--accent)", textDecoration: "underline",
                }}
              >
                마이페이지로 이동 →
              </Link>
            </div>
          </>
        )}

        {/* ─── [5] GPT 학습 안내 메시지 (파란색) ─────────── */}
        <div style={{
          background: "#DBEAFE", border: "1px solid #93C5FD",
          borderRadius: "var(--r-md)", padding: "14px 16px", marginBottom: "24px",
        }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#1E3A8A", margin: "0 0 5px" }}>
            ⏳ GPT 학습에는 시간이 걸려요
          </p>
          <p style={{ fontSize: "12.5px", color: "#1E40AF", margin: 0, lineHeight: 1.65 }}>
            미션을 완료해도 GPT 노출 변화까지는 보통 2~4주가 소요됩니다.
            토크비가 매월 자동으로 다시 진단해드릴게요!
          </p>
        </div>

        {/* ─── [6] 사장님 초대 블록 ──────────────────────────── */}
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "16px",
          boxShadow: "var(--sh-sm)",
        }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: "0 0 4px", lineHeight: 1.55 }}>
            {INVITE_COPY.cardHeader}
          </p>
          <p style={{ fontSize: "12.5px", color: "var(--ink-mid)", margin: "0 0 14px", lineHeight: 1.6 }}>
            {INVITE_COPY.cardSubheader}
          </p>

          {/* 사장님 혜택 */}
          <div style={{
            background: "var(--bg-soft)", borderRadius: "var(--r-sm)",
            padding: "10px 14px", marginBottom: "8px",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontSize: "12px", fontWeight: 800, color: "var(--ink)", margin: "0 0 8px" }}>
              🎁 {INVITE_COPY.rewardConditionTitle}
            </p>
            {INVITE_COPY.inviterRewards.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "5px" }}>
                <span style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "2px", flexShrink: 0 }}>·</span>
                <span style={{ fontSize: "12px", color: "var(--ink-mid)" }}>{item}</span>
              </div>
            ))}
          </div>

          {/* 초대받은 사장님 혜택 */}
          <div style={{
            background: "#FFF4E8", border: "1px solid #FFD9AD",
            borderRadius: "var(--r-sm)", padding: "8px 12px", marginBottom: "6px",
          }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#B45309", margin: "0 0 4px" }}>
              {INVITE_COPY.inviteeRewardTitle}
            </p>
            {INVITE_COPY.inviteeRewards.map((item) => (
              <p key={item} style={{ fontSize: "12px", color: "#B45309", margin: 0 }}>{item}</p>
            ))}
          </div>

          {/* 조건 안내 */}
          <p style={{ fontSize: "11px", color: "var(--ink-muted)", margin: "0 0 10px", lineHeight: 1.55 }}>
            {INVITE_COPY.rewardCondition}
          </p>

          <button
            onClick={handleShare}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              padding: "12px", background: "var(--kakao)", color: "var(--kakao-text)",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 800,
              border: "none", cursor: "pointer",
            }}
          >
            <KakaoIcon size={13} /> {INVITE_COPY.primaryButton}
          </button>
        </div>

      </main>

      <Footer />

      <InstallPrompt autoDelay={8000} />

      {/* ─── [7] Sticky CTA (모바일 하단 고정) ──────────── */}
      <div style={{
        position: "fixed", bottom: 0,
        left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: "480px",
        background: "var(--white)", borderTop: "1px solid var(--border)",
        padding: "12px 20px",
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        zIndex: 50, boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
      }}>
        <button
          onClick={() => router.push("/mypage")}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", padding: "14px", background: "var(--accent)", color: "#FFFFFF",
            borderRadius: "var(--r-md)", fontSize: "15px", fontWeight: 800,
            border: "none", cursor: "pointer", letterSpacing: "-0.02em",
            boxShadow: "var(--sh-accent)",
          }}
        >
          내 매장 진단 결과 자세히 보기 →
        </button>
      </div>
    </div>
  );
}
