"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  getMissionsByCategory,
  getCategoriesInOrder,
  getCompletedMissions,
  toggleMissionCompletion,
} from "@/lib/missions-data";
import type { Mission } from "@/lib/missions-data";

// ── 목업 측정 결과 (추후 GPT API 연동) ─────────────────────
const measurementResults = [
  {
    depth: "D1",
    type: "지역+업종",
    question: "광장동 분위기 좋은 한식당 추천해줘",
    answered: false,
  },
  {
    depth: "D2",
    type: "의도형",
    question: "광장동 가족 모임하기 좋은 식당 추천해줘",
    answered: false,
  },
  {
    depth: "D2",
    type: "의도형",
    question: "광장동 회식 장소 어디가 좋아?",
    answered: false,
  },
  {
    depth: "D2",
    type: "의도형",
    question: "광장동 룸 있는 한정식 맛집 알려줘",
    answered: false,
  },
  {
    depth: "D3",
    type: "매장명+상세",
    question: "한미옥 영업시간이랑 주차 알려줘",
    answered: true,
  },
];

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
      {/* 왜 필요한가요? */}
      <div>
        <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink)", margin: "0 0 5px" }}>
          🎯 왜 필요한가요?
        </p>
        <p style={{ fontSize: "12.5px", color: "var(--ink-mid)", margin: 0, lineHeight: 1.65 }}>
          {mission.why}
        </p>
      </div>

      {/* 어떻게 확인하나요? */}
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

      {/* 안 되어 있다면? */}
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

      {/* 템플릿 (있는 경우) */}
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

      {/* 좋은 예시 */}
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

      {/* 나쁜 예시 */}
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

      {/* 주의사항 */}
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

      {/* 팁 */}
      {mission.tip && (
        <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: 0, fontStyle: "italic" }}>
          💡 팁: {mission.tip}
        </p>
      )}
    </div>
  );
}

const TOTAL_MISSIONS = 15;

export default function ResultPage() {
  const router = useRouter();
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(getCompletedMissions());
  }, []);

  const handleToggle = (missionId: string) => {
    const updated = toggleMissionCompletion(missionId);
    setCompleted([...updated]);
  };

  const answeredCount = measurementResults.filter((q) => q.answered).length;
  const orderedCategories = getCategoriesInOrder();
  const completionPct = Math.round((completed.length / TOTAL_MISSIONS) * 100);

  return (
    <div className="app-container">
      <Header isLoggedIn={true} stores={[{ name: "한미옥 광장점" }]} />

      {/* 하단 Sticky CTA 높이만큼 패딩 확보 */}
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

          {/* 종합 결과 */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <p style={{
              fontSize: "60px", fontWeight: 900, color: "var(--accent)",
              margin: 0, lineHeight: 1, fontFamily: "var(--f-mono)",
            }}>
              {answeredCount}/5
            </p>
            <p style={{ fontSize: "14px", color: "#A3A3A3", margin: "10px 0 0" }}>
              5개 질문 중 {answeredCount}개에서 답변했어요
            </p>
          </div>

          {/* 개별 질문 결과 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {measurementResults.map((q, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "8px",
                padding: "10px 12px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "var(--r-sm)",
                border: `1px solid ${q.answered ? "rgba(22,163,74,0.25)" : "rgba(255,255,255,0.06)"}`,
              }}>
                <span style={{
                  fontSize: "10px", fontWeight: 700, padding: "2px 6px",
                  borderRadius: "4px", flexShrink: 0, marginTop: "1px",
                  background: "rgba(255,255,255,0.08)", color: "#888",
                  fontFamily: "var(--f-mono)",
                }}>
                  {q.depth}
                </span>
                <span style={{
                  fontSize: "12.5px", color: "#D4D4D8", flex: 1, lineHeight: 1.5,
                }}>
                  {q.question}
                </span>
                <span style={{
                  fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0,
                  color: q.answered ? "var(--success)" : "#6B6B6B",
                  background: q.answered ? "rgba(22,163,74,0.15)" : "rgba(255,255,255,0.05)",
                  padding: "3px 8px", borderRadius: "999px", marginTop: "1px",
                }}>
                  {q.answered ? "✓ 노출됐어요" : "✗ 노출 안 됨"}
                </span>
              </div>
            ))}
          </div>

          {/* 중요 인사이트 */}
          <div style={{
            marginTop: "16px", padding: "12px 14px",
            background: "rgba(255,255,255,0.04)", borderRadius: "var(--r-sm)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <p style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 700, margin: "0 0 5px" }}>
              잠깐, 이게 중요해요
            </p>
            <p style={{ fontSize: "12.5px", color: "#A3A3A3", margin: 0, lineHeight: 1.65 }}>
              사장님이 직접 검색하면 내 매장이 나옵니다.{" "}
              <strong style={{ color: "#D4D4D8" }}>처음 방문하는 손님의 GPT는 전혀 다른 결과</strong>를 보여줍니다.
              이 진단은 그 손님 시점으로 측정한 결과입니다.
            </p>
          </div>
        </div>

        {/* ─── [3] PDF 다운로드 (측정 결과 바로 아래) ──────── */}
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

        {/* ─── [4] 15개 미션 체크리스트 ───────────────────── */}
        {/* 섹션 헤더 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <p style={{
            fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)",
            margin: 0, textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            개선 미션 체크리스트
          </p>
          <span style={{
            fontSize: "12px", fontWeight: 700,
            color: completed.length === TOTAL_MISSIONS ? "var(--success)" : "var(--accent)",
            fontFamily: "var(--f-mono)",
          }}>
            {completed.length}/{TOTAL_MISSIONS} 완료
          </span>
        </div>

        {/* 종합 진척도 카드 / 축하 카드 */}
        {completed.length === TOTAL_MISSIONS ? (
          <div style={{
            background: "#F0FDF4", border: "1px solid #86EFAC",
            borderRadius: "var(--r-md)", padding: "18px 16px", marginBottom: "20px",
          }}>
            <p style={{ fontSize: "20px", fontWeight: 900, color: "#166534", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
              🎉 기본기 완성!
            </p>
            <p style={{ fontSize: "13px", color: "#16A34A", margin: 0, lineHeight: 1.65 }}>
              GPT 학습 반영까지 2~4주 소요됩니다.<br />
              토크비가 매월 자동 진단해드릴게요!
            </p>
          </div>
        ) : (
          <div style={{
            background: "var(--bg-soft)", border: "1px solid var(--border)",
            borderRadius: "var(--r-md)", padding: "16px", marginBottom: "20px",
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
              <span style={{ fontWeight: 700, color: completed.length > 0 ? "var(--accent)" : "var(--ink-muted)", fontFamily: "var(--f-mono)" }}>
                {completed.length}/{TOTAL_MISSIONS}
              </span>{" "}미션 완료 · {completionPct}%
            </p>
          </div>
        )}

        {/* 카테고리별 미션 (아코디언) */}
        {orderedCategories.map((cat) => {
          const missions = getMissionsByCategory(cat.id);
          const completedInCat = missions.filter((m) => completed.includes(m.id)).length;
          const allDone = completedInCat === missions.length;

          return (
            <div key={cat.id} style={{ marginBottom: "20px" }}>
              {/* 카테고리 헤더 */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                paddingBottom: "8px", marginBottom: "8px",
                borderBottom: "1px solid var(--border)",
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                    <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--ink)", margin: 0 }}>
                      {cat.name}
                    </p>
                    {cat.importance === 3 && (
                      <span style={{
                        fontSize: "10px", fontWeight: 700, color: "var(--accent)",
                        background: "var(--accent-soft)", padding: "1px 6px",
                        borderRadius: "999px", border: "1px solid rgba(232,93,58,0.2)",
                        flexShrink: 0,
                      }}>
                        영향력 가장 큼
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "11px", color: "var(--ink-muted)", margin: 0 }}>
                    {cat.description}
                  </p>
                </div>
                <span style={{
                  fontSize: "12px", fontWeight: 700, flexShrink: 0, marginLeft: "12px",
                  color: allDone ? "var(--success)" : "var(--ink-muted)",
                  fontFamily: "var(--f-mono)",
                }}>
                  {completedInCat}/{missions.length}
                </span>
              </div>

              {/* 미션 아코디언 */}
              <Accordion type="multiple" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {missions.map((mission) => {
                  const isCompleted = completed.includes(mission.id);
                  return (
                    <AccordionItem
                      key={mission.id}
                      value={mission.id}
                      className="border-0"
                      style={{
                        background: isCompleted ? "var(--success-soft)" : "var(--white)",
                        border: `1px solid ${isCompleted ? "rgba(22,163,74,0.2)" : "var(--border)"}`,
                        borderRadius: "var(--r-sm)",
                        overflow: "hidden",
                        transition: "background 0.15s, border-color 0.15s",
                      }}
                    >
                      {/* 미션 항목 헤더: 체크박스 + 제목 + 시간 + 화살표 */}
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 12px" }}>
                        {/* 체크박스: 클릭이 아코디언 토글로 전파되지 않도록 */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{ paddingTop: "3px", flexShrink: 0 }}
                        >
                          <Checkbox
                            id={`cb-${mission.id}`}
                            checked={isCompleted}
                            onCheckedChange={() => handleToggle(mission.id)}
                          />
                        </div>
                        {/* AccordionTrigger: 제목 + 소요시간 + 자동 화살표 */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <AccordionTrigger className="py-0 hover:no-underline w-full">
                            <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                              <p style={{
                                fontSize: "13px", fontWeight: 600, margin: "0 0 2px",
                                color: isCompleted ? "var(--ink-muted)" : "var(--ink)",
                                textDecoration: isCompleted ? "line-through" : "none",
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

                      {/* 펼침 영역: 미션 가이드 */}
                      <AccordionContent className="p-0">
                        <MissionGuide mission={mission} />
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          );
        })}

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

        {/* ─── [6] 친구 초대 블록 ──────────────────────────── */}
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "16px",
          boxShadow: "var(--sh-sm)",
        }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: "0 0 12px", lineHeight: 1.4 }}>
            🤝 추가하실 매장이 있으신가요? 경쟁사가 궁금하신가요?
          </p>

          {/* 즉시 보상 */}
          <div style={{
            background: "var(--bg-soft)", borderRadius: "var(--r-sm)",
            padding: "10px 14px", marginBottom: "8px",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontSize: "12px", fontWeight: 800, color: "var(--ink)", margin: "0 0 6px" }}>
              친구 1명 초대 = 매번 받는 혜택 (택 1)
            </p>
            {[
              "🏪 매장 1개 추가 등록 (최대 3매장까지)",
              "🎯 경쟁사 1곳 심층 분석 리포트",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "2px", flexShrink: 0 }}>·</span>
                <span style={{ fontSize: "12px", color: "var(--ink-mid)" }}>{item}</span>
              </div>
            ))}
          </div>

          {/* 양방향 보상 */}
          <div style={{
            background: "#FFF4E8", border: "1px solid #FFD9AD",
            borderRadius: "var(--r-sm)", padding: "8px 12px", marginBottom: "10px",
          }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#B45309", margin: 0 }}>
              🎁 친구도 가입 즉시 경쟁사 분석 1회를 받아요!
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button style={{
              flex: 1, padding: "11px", background: "var(--bg-deep)", color: "var(--ink)",
              borderRadius: "var(--r-sm)", fontSize: "12.5px", fontWeight: 700,
              border: "1px solid var(--border)", cursor: "pointer",
            }}>
              🔗 링크 복사
            </button>
            <button style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              padding: "11px", background: "var(--kakao)", color: "var(--kakao-text)",
              borderRadius: "var(--r-sm)", fontSize: "12.5px", fontWeight: 700,
              border: "none", cursor: "pointer",
            }}>
              <KakaoIcon size={12} /> 카카오톡 공유
            </button>
          </div>
        </div>

      </main>

      <Footer />

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
