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

const REGISTERED = 1;
const MAX_STORES = 3;
const INVITED = 0;

export default function MyPage() {
  return (
    <div className="app-container">
      <Header isLoggedIn={true} tickets={REGISTERED} />

      <main style={{ padding: "20px 20px 48px" }}>

        {/* 사장님 요약 */}
        <div style={{ marginBottom: "16px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px", color: "var(--ink)" }}>
            📋 내 매장 개선 노트
          </h1>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink-mid)", margin: 0 }}>
            광장동 한미옥 사장님
          </p>
        </div>

        {/* 내 매장 현황 카드 */}
        <div style={{
          background: "var(--bg-dark)", borderRadius: "var(--r-md)",
          padding: "16px", marginBottom: "20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#D4D4D8", margin: 0 }}>등록된 매장</p>
            <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--accent)", fontFamily: "var(--f-mono)" }}>
              {REGISTERED} / {MAX_STORES}
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
            {Array.from({ length: MAX_STORES }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: "6px", borderRadius: "999px",
                background: i < REGISTERED ? "var(--accent)" : "rgba(255,255,255,0.12)",
              }} />
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "#6B6B6B", margin: 0 }}>
            남은 슬롯 <strong style={{ color: "#A3A3A3" }}>{MAX_STORES - REGISTERED}개</strong> · 친구추가 또는 초대로 추가 등록 가능
          </p>
        </div>

        {/* 섹션 라벨 */}
        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          매장 슬롯 늘리기
        </p>

        {/* 카카오 채널 친구추가 */}
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
            }}>매장 +1 등록 가능</span>
          </div>
          <p style={{ fontSize: "12px", color: "var(--ink-mid)", margin: "0 0 10px", lineHeight: 1.5 }}>
            친구 상태 유지 시 슬롯 유지
          </p>

          <div style={{
            background: "#F5F0E8", border: "1px solid #E8E0D0",
            borderRadius: "var(--r-sm)", padding: "12px 14px", marginBottom: "10px",
          }}>
            <p style={{ fontSize: "12px", fontWeight: 800, color: "var(--ink)", margin: "0 0 8px" }}>
              🎁 채널 친구 전용 혜택
            </p>
            {[
              "매월 자동 진단 + 리포트 발송",
              "친구 상태 유지 시 30일마다 갱신",
              "신규 서비스 우선 안내",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                <span style={{ color: "var(--success)", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: "12.5px", color: "var(--ink-mid)" }}>{item}</span>
              </div>
            ))}
          </div>

          <button style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            width: "100%", padding: "13px", background: "var(--kakao)", color: "var(--kakao-text)",
            borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
            border: "none", cursor: "pointer",
          }}>
            <KakaoIcon size={14} /> 채널 친구추가하고 매월 리포트 받기
          </button>
        </div>

        {/* 주변 사장님 초대하기 */}
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "16px", marginBottom: "24px",
          boxShadow: "var(--sh-sm)",
        }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: "0 0 12px" }}>
            🤝 함께 성공하고 싶은 사장님 초대하기
          </p>

          {/* 내 초대 현황 */}
          <div style={{
            background: "var(--bg-soft)", borderRadius: "var(--r-sm)",
            padding: "12px 14px", marginBottom: "10px",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink-mid)", margin: "0 0 8px" }}>
              내 초대: <strong style={{ color: "var(--ink)", fontSize: "14px" }}>{INVITED}명</strong>
            </p>
            <p style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px" }}>
              초대 1명당 받는 혜택 (택 1)
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {[
                "매장 1개 추가 등록",
                "이번 달 진단 1회 추가",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "11px", color: "var(--ink-muted)" }}>○</span>
                  <span style={{ fontSize: "12px", color: "var(--ink-mid)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 명예 보상 */}
          <div style={{
            background: "var(--bg-dark)", borderRadius: "var(--r-sm)",
            padding: "12px 14px", marginBottom: "12px",
          }}>
            <p style={{ fontSize: "12px", fontWeight: 800, color: "#D4D4D8", margin: "0 0 8px" }}>
              🏅 누적 명예 보상
            </p>
            {[
              { count: "3명", badge: "추천 사장님 배지" },
              { count: "5명", badge: "베타 앰배서더 배지" },
              { count: "10명", badge: "마스터 사장님 배지" },
            ].map(({ count, badge }) => (
              <div key={count} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent)", minWidth: "28px" }}>{count}</span>
                <span style={{ fontSize: "12px", color: "#A3A3A3" }}>· {badge}</span>
              </div>
            ))}
          </div>

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

        {/* 내 매장 진단 기록 */}
        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          📅 내 매장 진단 기록
        </p>
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "14px 16px", marginBottom: "8px",
          boxShadow: "var(--sh-sm)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", margin: "0 0 3px" }}>광장동 한미옥</p>
              <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: "0 0 3px" }}>4월 28일 진단 · 5개 중 0개 인용 · 평균 23점</p>
              <p style={{ fontSize: "11.5px", color: "var(--accent)", fontWeight: 600, margin: 0 }}>다음 진단 예정: 5월 28일</p>
            </div>
            <Link href="/diagnosis/result" style={{
              padding: "7px 12px", background: "var(--white)", color: "var(--ink)",
              borderRadius: "var(--r-sm)", fontSize: "12px", fontWeight: 700,
              border: "1px solid var(--border)", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
            }}>
              결과 보기
            </Link>
          </div>
        </div>

        {/* 매장 추가하기 */}
        <Link href="/diagnosis/input" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "var(--accent)", color: "#fff",
          borderRadius: "var(--r-md)", padding: "15px 20px", marginTop: "16px",
          textDecoration: "none", boxShadow: "var(--sh-accent)",
        }}>
          <p style={{ fontSize: "14px", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>+ 매장 추가하기</p>
          <span style={{ fontSize: "18px" }}>→</span>
        </Link>

      </main>

      <Footer />
    </div>
  );
}
