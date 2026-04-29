import Link from "next/link";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";

function KakaoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="currentColor">
      <path d="M9 1C4.582 1 1 3.694 1 7.018c0 2.116 1.435 3.973 3.6 5.034l-.728 2.649c-.06.218.18.39.366.262L7.41 12.83C7.93 12.92 8.46 13 9 13c4.418 0 8-2.694 8-6.018C17 3.694 13.418 1 9 1z" />
    </svg>
  );
}

export default function MyPage() {
  return (
    <div className="app-container">
      <Header showTickets={true} tickets={0} />

      <main style={{ padding: "20px 20px 48px" }}>

        {/* 사장님 요약 */}
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px", color: "var(--ink)" }}>
            광장동 한미옥 사장님
          </h2>
          <p style={{ fontSize: "13px", color: "var(--danger)", fontWeight: 600, margin: 0 }}>
            최근 진단 · 5개 질문 중 0개 인용 · 평균 23점
          </p>
        </div>

        {/* 진단권 현황 */}
        <div style={{
          background: "var(--bg-dark)", borderRadius: "var(--r-md)",
          padding: "14px 16px", marginBottom: "20px",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "10px" }}>
            {[
              { label: "보유 진단권", value: "0", accent: true },
              { label: "초대 완료", value: "0", accent: false },
              { label: "사용한 진단", value: "1", accent: false },
            ].map((s) => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.05)", borderRadius: "var(--r-sm)",
                padding: "10px 8px", textAlign: "center",
              }}>
                <p style={{ fontSize: "10px", color: "#6B6B6B", margin: "0 0 4px" }}>{s.label}</p>
                <p style={{
                  fontSize: "22px", fontWeight: 800, margin: 0,
                  color: s.accent ? "var(--accent)" : "#FAFAFA",
                  fontFamily: "var(--f-mono)",
                }}>{s.value}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "#6B6B6B", margin: 0 }}>
            채널 친구 유지 시 30일마다 자동 충전 ·{" "}
            <strong style={{ color: "var(--accent)" }}>5월 28일</strong> 예정
          </p>
        </div>

        {/* 섹션 라벨 */}
        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          진단권 늘리기
        </p>

        {/* 핵심 전환 1 — 카카오 채널 친구추가 */}
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
            친구 상태 유지 시 30일마다 자동 충전
          </p>

          {/* 얼리버드 */}
          <div style={{
            background: "var(--bg-dark)", borderRadius: "var(--r-sm)",
            padding: "12px", marginBottom: "10px",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--accent)" }}>🎁 얼리버드 쿠폰 즉시 지급</span>
              <div style={{ display: "flex", gap: "4px" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#FAFAFA", background: "var(--danger)", padding: "2px 6px", borderRadius: "999px" }}>선착순 50명</span>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#FAFAFA", background: "rgba(255,255,255,0.12)", padding: "2px 6px", borderRadius: "999px" }}>D-27</span>
              </div>
            </div>
            <p style={{ fontSize: "12px", color: "#D4D4D8", margin: "0 0 4px", lineHeight: 1.5 }}>
              5월 출시 예정 <strong style={{ color: "#FAFAFA" }}>AI 최적화 솔루션</strong>을 얼리버드{" "}
              <strong style={{ color: "var(--accent)" }}>30% 할인</strong>
            </p>
            <p style={{ fontSize: "11px", color: "#6B6B6B", margin: 0 }}>
              광진구 한식 전담팀 → 사장님 매장 직접 관리
            </p>
          </div>

          <button style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            width: "100%", padding: "13px", background: "var(--kakao)", color: "var(--kakao-text)",
            borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
            border: "none", cursor: "pointer",
          }}>
            <KakaoIcon size={14} /> 채널 친구추가하고 진단권 받기
          </button>
        </div>

        {/* 핵심 전환 2 — 사장님 초대 */}
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

        {/* 진단 이력 */}
        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          진단 이력
        </p>
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "14px 16px", marginBottom: "8px",
          boxShadow: "var(--sh-sm)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)", margin: "0 0 2px" }}>광장동 한미옥</p>
              <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: 0 }}>4월 28일 · 5개 중 0개 인용 · 평균 23점</p>
            </div>
            <Link href="/diagnosis/result" style={{
              padding: "7px 12px", background: "var(--white)", color: "var(--ink)",
              borderRadius: "var(--r-sm)", fontSize: "12px", fontWeight: 700,
              border: "1px solid var(--border)", textDecoration: "none", whiteSpace: "nowrap",
            }}>
              결과 보기
            </Link>
          </div>
        </div>

        {/* 추가 진단받기 */}
        <Link href="/diagnosis/input" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "var(--accent)", color: "#fff",
          borderRadius: "var(--r-md)", padding: "15px 20px", marginBottom: "20px",
          textDecoration: "none", boxShadow: "var(--sh-accent)",
        }}>
          <p style={{ fontSize: "14px", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>추가 진단받기</p>
          <span style={{ fontSize: "18px" }}>→</span>
        </Link>

        {/* AI 솔루션 */}
        <div style={{
          background: "var(--bg-dark)", borderRadius: "var(--r-md)",
          padding: "16px", marginBottom: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
            <p style={{ fontSize: "14px", fontWeight: 800, color: "#FAFAFA", margin: 0 }}>AI 최적화 솔루션</p>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--accent)", background: "rgba(232,93,58,0.15)", padding: "2px 8px", borderRadius: "999px" }}>
              5월 출시 예정
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "#A3A3A3", margin: "0 0 12px", lineHeight: 1.55 }}>
            전문팀이 직접 사장님 매장 AI 노출을 관리합니다. 채널 친구추가 시 얼리버드 30% 할인.
          </p>
          <a href="https://talkb.co.kr" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", padding: "11px", background: "rgba(255,255,255,0.08)",
            color: "#FAFAFA", borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
            border: "1px solid rgba(255,255,255,0.12)", textDecoration: "none",
          }}>
            서비스 알아보기 →
          </a>
        </div>

        <Link href="/" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", padding: "12px", color: "var(--ink-muted)", fontSize: "13px",
          textDecoration: "none",
        }}>
          처음으로
        </Link>

      </main>

      <Footer />
    </div>
  );
}
