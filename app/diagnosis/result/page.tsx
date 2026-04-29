import Link from "next/link";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";

const questions = [
  { q: "광장동 근처 가족 모임하기 좋은 한식당 추천해줘", cited: false },
  { q: "광진구 룸 있는 한정식 맛집 어디야?", cited: false },
  { q: "광장동 회식 장소 추천해줘", cited: false },
  { q: "서울 한정식 분위기 좋은 곳 알려줘", cited: false },
  { q: "발렛파킹 되는 광장동 한식당 있어?", cited: false },
];

const levers = [
  { name: "네이버 플레이스 완성도", score: 65, level: "warning" },
  { name: "구글 맵 등록", score: 0, level: "danger" },
  { name: "리뷰 키워드 다양성", score: 32, level: "warning" },
  { name: "외부 언급 정도", score: 18, level: "danger" },
  { name: "자체 디지털 자산", score: 0, level: "danger" },
];

const competitors = [
  { rank: 1, name: "강남 한미옥", score: "3/5 인용" },
  { rank: 2, name: "광장동 ○○○", score: "2/5 인용" },
  { rank: 3, name: "광진 ○○○", score: "2/5 인용" },
];

function getLeverColor(level: string) {
  if (level === "danger") return "var(--danger)";
  if (level === "warning") return "#D97706";
  return "var(--success)";
}

function KakaoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="currentColor">
      <path d="M9 1C4.582 1 1 3.694 1 7.018c0 2.116 1.435 3.973 3.6 5.034l-.728 2.649c-.06.218.18.39.366.262L7.41 12.83C7.93 12.92 8.46 13 9 13c4.418 0 8-2.694 8-6.018C17 3.694 13.418 1 9 1z" />
    </svg>
  );
}

export default function ResultPage() {
  return (
    <div className="app-container">
      <Header />

      <main style={{ padding: "20px 20px 48px" }}>

        <span style={{
          display: "inline-block", fontSize: "11px", color: "var(--accent)",
          background: "var(--accent-soft)", padding: "5px 10px", borderRadius: "999px",
          marginBottom: "16px", fontWeight: 600, letterSpacing: "0.02em",
        }}>
          Step 4 of 4 · 진단 결과
        </span>

        {/* ① 결과 요약 — 충격 카드 */}
        <div style={{
          background: "var(--bg-dark)", borderRadius: "var(--r-lg)",
          padding: "24px", marginBottom: "16px",
        }}>
          <span style={{
            display: "inline-block", fontSize: "12px", fontWeight: 700, color: "#D4D4D8",
            background: "rgba(255,255,255,0.08)", padding: "4px 10px",
            borderRadius: "999px", marginBottom: "12px",
          }}>광장동 한미옥</span>
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#FAFAFA", lineHeight: 1.3, margin: "0 0 10px", letterSpacing: "-0.03em" }}>
            5개 질문 중{" "}
            <span style={{ color: "var(--accent)", fontSize: "28px" }}>0개</span>
            에서만<br />인용되었습니다
          </h2>
          <p style={{ fontSize: "13px", color: "#A3A3A3", margin: "0 0 18px" }}>
            같은 지역 경쟁사 평균 인용 횟수: 2.4회
          </p>

          {/* 잠깐, 이게 중요해요 */}
          <div style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "var(--r-sm)", padding: "14px",
          }}>
            <p style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 700, margin: "0 0 6px", letterSpacing: "0.04em" }}>
              잠깐, 이게 중요해요
            </p>
            <p style={{ fontSize: "12.5px", color: "#A3A3A3", margin: 0, lineHeight: 1.65 }}>
              사장님이 직접 검색하면 내 매장이 나옵니다.{" "}
              <strong style={{ color: "#D4D4D8" }}>처음 방문하는 손님의 GPT는 전혀 다른 결과</strong>를 보여줍니다.
              이 진단은 그 손님 시점으로 측정한 결과입니다.
            </p>
          </div>
        </div>

        {/* ② 핵심 전환 1 — 카카오 채널 친구추가 */}
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "16px", marginBottom: "8px",
          boxShadow: "var(--sh-sm)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>카카오 채널 친구추가</p>
            <span style={{
              fontSize: "11px", fontWeight: 700, color: "var(--accent)",
              background: "var(--accent-soft)", padding: "2px 7px", borderRadius: "999px",
            }}>진단권 +1</span>
          </div>
          <p style={{ fontSize: "12px", color: "var(--ink-mid)", margin: "0 0 10px", lineHeight: 1.5 }}>
            친구 상태 유지 시 30일마다 자동 충전 · 얼리버드 30% 할인 쿠폰 즉시 지급
          </p>
          <button style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            width: "100%", padding: "13px", background: "var(--kakao)", color: "var(--kakao-text)",
            borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
            border: "none", cursor: "pointer",
          }}>
            <KakaoIcon size={14} /> 채널 친구추가하고 진단권 받기
          </button>
        </div>

        {/* ③ 핵심 전환 2 — 초대하기 */}
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "16px", marginBottom: "24px",
          boxShadow: "var(--sh-sm)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>주변 사장님 초대하기</p>
            <span style={{
              fontSize: "11px", fontWeight: 700, color: "var(--accent)",
              background: "var(--accent-soft)", padding: "2px 7px", borderRadius: "999px",
            }}>진단권 +1</span>
          </div>
          <p style={{ fontSize: "12px", color: "var(--ink-mid)", margin: "0 0 12px", lineHeight: 1.5 }}>
            초대한 사장님이 진단 완료 시 자동 적립
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              padding: "12px", background: "var(--bg-deep)", color: "var(--ink)",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
              border: "1px solid var(--border)", cursor: "pointer",
            }}>
              🔗 링크 복사
            </button>
            <button style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              padding: "12px", background: "var(--kakao)", color: "var(--kakao-text)",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
              border: "none", cursor: "pointer",
            }}>
              <KakaoIcon size={13} /> 카카오톡 공유
            </button>
          </div>
        </div>

        {/* ④ 질문별 인용 결과 */}
        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          질문별 인용 결과
        </p>
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", overflow: "hidden", marginBottom: "24px",
          boxShadow: "var(--sh-sm)",
        }}>
          {questions.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "10px",
              padding: "12px 16px",
              borderBottom: i < questions.length - 1 ? "1px solid var(--border-soft)" : "none",
            }}>
              <span style={{ fontSize: "11px", fontWeight: 700, minWidth: "20px", marginTop: "2px", color: "var(--accent)" }}>Q{i + 1}</span>
              <span style={{ fontSize: "12.5px", color: "var(--ink-mid)", flex: 1, lineHeight: 1.5 }}>{item.q}</span>
              <span style={{
                fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap",
                color: item.cited ? "var(--success)" : "var(--danger)",
                background: item.cited ? "var(--success-soft)" : "var(--danger-soft)",
                padding: "3px 8px", borderRadius: "999px", marginTop: "1px",
              }}>
                {item.cited ? "✓ 인용됨" : "✗ 미인용"}
              </span>
            </div>
          ))}
        </div>

        {/* ⑤ 5대 항목 */}
        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          5대 항목 자동 점검
        </p>
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", overflow: "hidden", marginBottom: "8px",
          boxShadow: "var(--sh-sm)",
        }}>
          {levers.map((lever, i) => (
            <div key={lever.name} style={{
              padding: "12px 16px",
              borderBottom: i < levers.length - 1 ? "1px solid var(--border-soft)" : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{lever.name}</span>
                <span style={{ fontSize: "12.5px", fontWeight: 700, color: getLeverColor(lever.level), fontFamily: "var(--f-mono)" }}>
                  {lever.score}점
                </span>
              </div>
              <div style={{ height: "5px", background: "var(--bg-deep)", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ height: "100%", background: getLeverColor(lever.level), borderRadius: "999px", width: `${lever.score}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px", marginBottom: "24px", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "var(--ink-muted)" }}>평균</span>
          <span style={{ fontSize: "15px", fontWeight: 800, color: "var(--ink)", fontFamily: "var(--f-mono)" }}>23점 / 100</span>
        </div>

        {/* ⑥ 경쟁사 */}
        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          이 자리를 차지한 경쟁 매장
        </p>
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", overflow: "hidden", marginBottom: "24px",
          boxShadow: "var(--sh-sm)",
        }}>
          {competitors.map((c, i) => (
            <div key={c.name} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "13px 16px",
              borderBottom: i < competitors.length - 1 ? "1px solid var(--border-soft)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  width: "22px", height: "22px", borderRadius: "50%",
                  background: "var(--bg-deep)", fontSize: "12px", fontWeight: 700,
                  color: "var(--ink-mid)", display: "flex", alignItems: "center", justifyContent: "center",
                }}>{c.rank}</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>{c.name}</span>
              </div>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--accent)", fontFamily: "var(--f-mono)" }}>{c.score}</span>
            </div>
          ))}
          <div style={{
            padding: "12px 16px", background: "var(--danger-soft)",
            borderTop: "1px solid rgba(220,38,38,0.1)",
          }}>
            <p style={{ fontSize: "12.5px", color: "var(--danger)", fontWeight: 700, margin: 0 }}>
              → 사장님 매장이 이 자리를 차지하려면?
            </p>
          </div>
        </div>

        {/* ⑦ PDF + 추가 진단 */}
        <button style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", padding: "15px", background: "var(--accent)", color: "#FFFFFF",
          borderRadius: "var(--r-md)", fontSize: "15px", fontWeight: 800,
          minHeight: "52px", border: "none", cursor: "pointer", letterSpacing: "-0.01em",
          boxShadow: "var(--sh-accent)", marginBottom: "8px",
        }}>
          GPT 최적화 컨설팅 자료집(PDF) 받기
        </button>

        <Link href="/diagnosis/input" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", padding: "13px", background: "var(--white)", color: "var(--ink)",
          borderRadius: "var(--r-md)", fontSize: "14px", fontWeight: 700,
          border: "1px solid var(--border)", textDecoration: "none", letterSpacing: "-0.01em",
        }}>
          다른 매장 추가 진단받기
        </Link>

      </main>

      <Footer />
    </div>
  );
}
