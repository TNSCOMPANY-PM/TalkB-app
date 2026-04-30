"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";
import PwaBanner from "@/components/talkb/pwa-banner";
import {
  MISSIONS,
  getMissionsByCategory,
  getCategoriesInOrder,
  getCompletedMissions,
} from "@/lib/missions-data";
import type { MissionCategory } from "@/lib/missions-data";

// ── Mock 데이터 (동균팀장 Supabase 연동 시 교체) ────────────
const MOCK_STORE = {
  name: "한미옥 광장점",
  address: "서울 광진구 광장동",
  category: "한정식",
  registeredAt: "2026.04.27",
};

const MOCK_TICKETS = 1; // 진단권 보유 수

const MOCK_LAST_DIAGNOSIS = {
  date: "2026-04-27",
  answeredCount: 1,
  totalCount: 5,
};

const REGISTERED_COUNT = 1; // 등록 매장 수 (1 | 2 | 3)

const MOCK_INVITED = 0; // 초대한 친구 수 (mock)

// ── 유틸 함수 ────────────────────────────────────────────────
function getNextDiagnosisDate(): string {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return next.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getRelativeDays(dateStr: string): string {
  const days = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (days === 0) return "오늘";
  if (days === 1) return "어제";
  return `${days}일 전`;
}

// ── 섹션 라벨 ────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)",
      margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em",
    }}>
      {children}
    </p>
  );
}

export default function MyPage() {
  const router = useRouter();
  const [editToast, setEditToast] = useState(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [inviteOpen, setInviteOpen] = useState(false);

  useEffect(() => {
    setCompletedIds(getCompletedMissions());
  }, []);

  const handleEditStore = () => {
    setEditToast(true);
    setTimeout(() => setEditToast(false), 2500);
  };

  const orderedCategories = getCategoriesInOrder();
  const totalMissions = MISSIONS.length;
  const completedCount = completedIds.length;
  const totalPct = Math.round((completedCount / totalMissions) * 100);

  const nextDiagDate = getNextDiagnosisDate();
  const relDays = getRelativeDays(MOCK_LAST_DIAGNOSIS.date);
  const diagPct = Math.round(
    (MOCK_LAST_DIAGNOSIS.answeredCount / MOCK_LAST_DIAGNOSIS.totalCount) * 100
  );

  return (
    <div className="app-container">
      <Header isLoggedIn={true} stores={[{ name: MOCK_STORE.name }]} />

      <main style={{ padding: "20px 20px 48px" }}>

        {/* ─── 페이지 타이틀 ──────────────────────────────── */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{
            fontSize: "22px", fontWeight: 800, letterSpacing: "-0.03em",
            margin: "0 0 4px", color: "var(--ink)",
          }}>
            📋 내 매장 관리
          </h1>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink-mid)", margin: 0 }}>
            {MOCK_STORE.name} 사장님
          </p>
        </div>

        {/* ─── [1] 매장 정보 카드 ────────────────────────── */}
        <SectionLabel>🏪 운영 중인 매장</SectionLabel>

        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "16px", marginBottom: "8px",
          boxShadow: "var(--sh-sm)",
        }}>
          {/* 매장명 + 수정 버튼 */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "12px" }}>
            <p style={{ fontSize: "17px", fontWeight: 800, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>
              🏪 {MOCK_STORE.name}
            </p>
            <button
              onClick={handleEditStore}
              style={{
                padding: "5px 10px", background: "var(--bg-deep)",
                color: "var(--ink-mid)", borderRadius: "var(--r-sm)",
                fontSize: "11px", fontWeight: 700,
                border: "1px solid var(--border)", cursor: "pointer",
                whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              수정
            </button>
          </div>

          {/* 매장 정보 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", color: "var(--ink-muted)", flexShrink: 0 }}>📍</span>
              <span style={{ fontSize: "13px", color: "var(--ink-mid)" }}>{MOCK_STORE.address}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", color: "var(--ink-muted)", flexShrink: 0 }}>🏷️</span>
              <span style={{ fontSize: "13px", color: "var(--ink-mid)" }}>{MOCK_STORE.category}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", color: "var(--ink-muted)", flexShrink: 0 }}>📅</span>
              <span style={{ fontSize: "13px", color: "var(--ink-muted)" }}>등록일 {MOCK_STORE.registeredAt}</span>
            </div>
          </div>

          {/* 수정 준비 중 토스트 */}
          {editToast && (
            <div style={{
              marginTop: "12px", padding: "10px 12px",
              background: "var(--bg-soft)", border: "1px solid var(--border)",
              borderRadius: "var(--r-sm)",
            }}>
              <p style={{ fontSize: "12px", color: "var(--ink-mid)", margin: 0 }}>
                ⚙️ 매장 정보 수정은 정식 출시 후 지원될 예정이에요.
              </p>
            </div>
          )}
        </div>

        {/* 매장 추가 버튼 (1~2개 등록 시) */}
        {REGISTERED_COUNT < 3 ? (
          <Link
            href="/diagnosis/input"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "11px", marginBottom: "28px",
              background: "var(--bg-soft)", border: "1px dashed var(--border)",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
              color: "var(--ink-mid)", textDecoration: "none",
            }}
          >
            + 매장 추가하기 (최대 3개)
          </Link>
        ) : (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "11px", marginBottom: "28px",
            background: "var(--bg-soft)", border: "1px dashed var(--border)",
            borderRadius: "var(--r-sm)",
          }}>
            <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: 0 }}>
              최대 매장 수(3개)에 도달했어요
            </p>
          </div>
        )}

        {/* ─── [2] 카카오톡 채널 placeholder ────────────── */}
        <SectionLabel>📢 카카오톡 채널 구독</SectionLabel>

        <div style={{
          background: "#111108", border: "1px solid #4A4200",
          borderRadius: "var(--r-md)", padding: "18px 16px", marginBottom: "28px",
        }}>
          <p style={{
            fontSize: "14px", fontWeight: 800, color: "#FEE500",
            margin: "0 0 4px", letterSpacing: "-0.02em",
          }}>
            🔔 토크비 채널 구독
          </p>
          <p style={{ fontSize: "12px", color: "#6B6B6B", margin: "0 0 14px", lineHeight: 1.6 }}>
            곧 토크비 카카오톡 채널이 오픈됩니다.<br />
            채널 구독 시 매월 자동 진단 결과를 받아보실 수 있어요.
          </p>

          {/* 혜택 미리보기 */}
          <div style={{
            background: "rgba(254,229,0,0.06)", border: "1px solid rgba(254,229,0,0.15)",
            borderRadius: "var(--r-sm)", padding: "10px 12px", marginBottom: "14px",
          }}>
            {[
              "매월 GPT 노출 변화 자동 추적",
              "카카오톡으로 진단 결과 자동 발송",
              "구독 유지 시 영구 무료",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "5px" }}>
                <span style={{ color: "#FEE500", fontWeight: 700, fontSize: "11px", flexShrink: 0, marginTop: "2px" }}>✓</span>
                <span style={{ fontSize: "12px", color: "#A3A3A3" }}>{item}</span>
              </div>
            ))}
          </div>

          <button
            disabled
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "100%", padding: "13px",
              background: "#2A2A00", color: "#6B6B00",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 800,
              border: "1px solid #3A3A00", cursor: "not-allowed",
            }}
          >
            곧 출시 · 준비 중
          </button>
        </div>

        {/* ─── [3] 진단권 + 다시 진단 카드 ──────────────── */}
        <SectionLabel>🎫 진단권</SectionLabel>

        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "16px", marginBottom: "28px",
          boxShadow: "var(--sh-sm)",
        }}>
          {/* 보유 진단권 */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div>
              <p style={{ fontSize: "15px", fontWeight: 800, color: "var(--ink)", margin: "0 0 3px" }}>
                🎫 진단권{" "}
                <span style={{
                  color: MOCK_TICKETS > 0 ? "var(--accent)" : "var(--ink-muted)",
                  fontFamily: "var(--f-mono)",
                }}>
                  {MOCK_TICKETS}개
                </span>{" "}
                보유
              </p>
              <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: 0 }}>
                친구 초대로 진단권 추가 가능
              </p>
            </div>
            {MOCK_TICKETS > 0 && (
              <span style={{
                fontSize: "10px", fontWeight: 700, color: "var(--success)",
                background: "rgba(22,163,74,0.1)", padding: "3px 8px",
                borderRadius: "999px", border: "1px solid rgba(22,163,74,0.2)",
              }}>
                사용 가능
              </span>
            )}
          </div>

          {/* 다음 자동 진단 */}
          <div style={{
            background: "var(--bg-soft)", borderRadius: "var(--r-sm)",
            padding: "10px 12px", marginBottom: "14px",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontSize: "11px", color: "var(--ink-muted)", margin: "0 0 3px", fontWeight: 600 }}>
              다음 자동 진단
            </p>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
              📅 {nextDiagDate}
            </p>
          </div>

          {/* 다시 진단받기 버튼 */}
          {MOCK_TICKETS > 0 ? (
            <button
              onClick={() => router.push("/diagnosis/input")}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                width: "100%", padding: "13px", background: "var(--accent)", color: "#FFFFFF",
                borderRadius: "var(--r-sm)", fontSize: "14px", fontWeight: 800,
                border: "none", cursor: "pointer",
              }}
            >
              ⚡ 지금 다시 진단받기
            </button>
          ) : (
            <div>
              <button
                disabled
                style={{
                  width: "100%", padding: "13px", background: "var(--bg-deep)", color: "var(--ink-muted)",
                  borderRadius: "var(--r-sm)", fontSize: "14px", fontWeight: 800,
                  border: "1px solid var(--border)", cursor: "not-allowed", marginBottom: "8px",
                }}
              >
                ⚡ 지금 다시 진단받기
              </button>
              <p style={{ fontSize: "12px", color: "var(--ink-muted)", textAlign: "center", margin: 0 }}>
                진단권이 없어요.{" "}
                <span style={{ color: "var(--accent)", fontWeight: 700 }}>친구 초대하고 진단권 받기 →</span>
              </p>
            </div>
          )}
        </div>

        {/* ─── [4] 최근 진단 결과 카드 ───────────────────── */}
        <SectionLabel>📊 최근 진단 결과</SectionLabel>

        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "16px", marginBottom: "28px",
          boxShadow: "var(--sh-sm)",
        }}>
          {/* 날짜 */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
              GPT 노출 진단
            </p>
            <span style={{ fontSize: "12px", color: "var(--ink-muted)" }}>
              {MOCK_LAST_DIAGNOSIS.date.replace(/-/g, ".")} ({relDays})
            </span>
          </div>

          {/* 답변 수 + 진행바 */}
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "8px" }}>
              <p style={{ fontSize: "13px", color: "var(--ink-mid)", margin: 0 }}>
                5개 질문 중{" "}
                <strong style={{ color: "var(--ink)", fontSize: "15px" }}>
                  {MOCK_LAST_DIAGNOSIS.answeredCount}개
                </strong>{" "}
                답변
              </p>
              <span style={{
                fontSize: "13px", fontWeight: 700, color: "var(--accent)",
                fontFamily: "var(--f-mono)",
              }}>
                {MOCK_LAST_DIAGNOSIS.answeredCount}/{MOCK_LAST_DIAGNOSIS.totalCount}
              </span>
            </div>
            <div style={{
              height: "8px", background: "var(--bg-deep)",
              borderRadius: "999px", overflow: "hidden",
            }}>
              <div style={{
                height: "100%", background: "var(--accent)", borderRadius: "999px",
                width: `${diagPct}%`, transition: "width 0.4s ease",
              }} />
            </div>
          </div>

          {/* 결과 보기 버튼 */}
          <Link
            href="/diagnosis/result"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "12px", background: "var(--bg-soft)", color: "var(--ink)",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
              border: "1px solid var(--border)", textDecoration: "none",
            }}
          >
            전체 결과 보기 →
          </Link>
        </div>

        {/* ─── [5] 미션 진행률 카드 ──────────────────────── */}
        <SectionLabel>🎯 GPT 노출 기본기</SectionLabel>

        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "16px", marginBottom: "28px",
          boxShadow: "var(--sh-sm)",
        }}>
          {/* 종합 진척도 */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "8px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
              전체 미션 진척도
            </p>
            <span style={{
              fontSize: "13px", fontWeight: 700,
              color: completedCount === totalMissions ? "var(--success)" : "var(--accent)",
              fontFamily: "var(--f-mono)",
            }}>
              {completedCount}/{totalMissions}
            </span>
          </div>
          <div style={{
            height: "8px", background: "var(--bg-deep)", borderRadius: "999px",
            overflow: "hidden", marginBottom: "4px",
          }}>
            <div style={{
              height: "100%", background: "var(--accent)", borderRadius: "999px",
              width: `${totalPct}%`, transition: "width 0.4s ease",
            }} />
          </div>
          <p style={{ fontSize: "11px", color: "var(--ink-muted)", margin: "0 0 18px", textAlign: "right" }}>
            {totalPct}% 완료
          </p>

          {/* 카테고리별 진척도 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
            {orderedCategories.map((cat, idx) => {
              const catMissions = getMissionsByCategory(cat.id as MissionCategory);
              const catCompleted = catMissions.filter((m) => completedIds.includes(m.id)).length;
              const catPct = Math.round((catCompleted / catMissions.length) * 100);
              const numeral = ["①", "②", "③", "④", "⑤"][idx] ?? `${idx + 1}.`;

              return (
                <div key={cat.id}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "12px", color: "var(--ink-muted)" }}>{numeral}</span>
                      <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--ink)" }}>{cat.name}</span>
                      {cat.importance === 3 && (
                        <span style={{
                          fontSize: "9px", fontWeight: 700, color: "var(--accent)",
                          background: "var(--accent-soft)", padding: "1px 5px",
                          borderRadius: "999px", border: "1px solid rgba(232,93,58,0.2)",
                        }}>
                          영향력 큼
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontSize: "11px", fontWeight: 700,
                      color: catCompleted === catMissions.length ? "var(--success)" : "var(--ink-muted)",
                      fontFamily: "var(--f-mono)",
                    }}>
                      {catCompleted}/{catMissions.length}
                    </span>
                  </div>
                  <div style={{
                    height: "5px", background: "var(--bg-deep)", borderRadius: "999px", overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      background: catCompleted === catMissions.length ? "var(--success)" : "var(--accent)",
                      borderRadius: "999px",
                      width: `${catPct}%`,
                      transition: "width 0.4s ease",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 전체 미션 보기 */}
          <Link
            href="/diagnosis/result"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "11px", background: "var(--bg-soft)", color: "var(--ink)",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
              border: "1px solid var(--border)", textDecoration: "none",
            }}
          >
            전체 미션 보기 →
          </Link>
        </div>

        {/* ─── [6] 친구 초대 현황 카드 ────────────────────── */}
        <SectionLabel>🎉 친구 초대 현황</SectionLabel>

        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "16px", marginBottom: "28px",
          boxShadow: "var(--sh-sm)",
        }}>
          {/* 현황 요약 */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
              초대한 친구:{" "}
              <span style={{ color: MOCK_INVITED > 0 ? "var(--accent)" : "var(--ink-muted)", fontFamily: "var(--f-mono)" }}>
                {MOCK_INVITED}명
              </span>
            </p>
          </div>

          {/* 받은 보상 현황 */}
          <div style={{
            background: "var(--bg-soft)", borderRadius: "var(--r-sm)",
            padding: "10px 12px", marginBottom: "12px",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 7px" }}>
              받은 보상
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "12px" }}>🏪</span>
                <span style={{ fontSize: "12px", color: "var(--ink-mid)" }}>
                  매장 추가{" "}
                  <strong style={{ color: "var(--ink)", fontFamily: "var(--f-mono)" }}>0개</strong>
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "12px" }}>🎫</span>
                <span style={{ fontSize: "12px", color: "var(--ink-mid)" }}>
                  진단권{" "}
                  <strong style={{ color: "var(--ink)", fontFamily: "var(--f-mono)" }}>0개</strong>
                </span>
              </div>
            </div>
          </div>

          {/* 초대 혜택 요약 */}
          <div style={{
            background: "var(--bg-soft)", borderRadius: "var(--r-sm)",
            padding: "10px 12px", marginBottom: "12px",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontSize: "12px", fontWeight: 800, color: "var(--ink)", margin: "0 0 6px" }}>
              친구 1명 초대 = 매번 받는 혜택 (택 1)
            </p>
            {[
              "🏪 매장 1개 추가 등록 (최대 3매장까지)",
              "🎫 진단권 1개 추가 (월 최대 5개)",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "2px", flexShrink: 0 }}>·</span>
                <span style={{ fontSize: "12px", color: "var(--ink-mid)" }}>{item}</span>
              </div>
            ))}
          </div>

          {/* 초대하기 버튼 */}
          <button
            onClick={() => setInviteOpen((v) => !v)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              width: "100%", padding: "12px", background: "var(--accent)", color: "#FFFFFF",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 800,
              border: "none", cursor: "pointer", marginBottom: inviteOpen ? "12px" : 0,
            }}
          >
            친구 초대하기 {inviteOpen ? "▲" : "→"}
          </button>

          {/* 초대 링크 + 공유 (펼침) */}
          {inviteOpen && (
            <div style={{
              background: "var(--bg-soft)", borderRadius: "var(--r-sm)",
              padding: "12px", border: "1px solid var(--border-soft)",
            }}>
              <p style={{ fontSize: "12px", color: "var(--ink-mid)", margin: "0 0 10px" }}>
                🎁 친구도 가입 즉시 경쟁사 분석 1회를 받아요!
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <button style={{
                  flex: 1, padding: "10px", background: "var(--bg-deep)", color: "var(--ink)",
                  borderRadius: "var(--r-sm)", fontSize: "12.5px", fontWeight: 700,
                  border: "1px solid var(--border)", cursor: "pointer",
                }}>
                  🔗 링크 복사
                </button>
                <button style={{
                  flex: 1, padding: "10px", background: "var(--kakao)", color: "var(--kakao-text)",
                  borderRadius: "var(--r-sm)", fontSize: "12.5px", fontWeight: 700,
                  border: "none", cursor: "pointer",
                }}>
                  💬 카카오톡 공유
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ─── PWA 설치 배너 ──────────────────────────────── */}
        <PwaBanner />

      </main>

      <Footer />
    </div>
  );
}
