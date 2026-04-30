import Link from "next/link";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";
import PwaBanner from "@/components/talkb/pwa-banner";

function KakaoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="currentColor">
      <path d="M9 1C4.582 1 1 3.694 1 7.018c0 2.116 1.435 3.973 3.6 5.034l-.728 2.649c-.06.218.18.39.366.262L7.41 12.83C7.93 12.92 8.46 13 9 13c4.418 0 8-2.694 8-6.018C17 3.694 13.418 1 9 1z" />
    </svg>
  );
}

const REGISTERED: number = 1;
const INVITED: number = 0;

const stores = [
  { name: "광장동 한미옥", date: "4월 28일", cited: 0, score: 23, nextDiagnosis: "5월 28일" },
];

export default function MyPage() {
  return (
    <div className="app-container">
      <Header isLoggedIn={true} stores={stores} />

      <main style={{ padding: "20px 20px 48px" }}>

        {/* 사장님 요약 */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px", color: "var(--ink)" }}>
            📋 내 매장 개선 노트
          </h1>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink-mid)", margin: 0 }}>
            광장동 한미옥 사장님
          </p>
        </div>

        {/* 🏪 운영 중인 매장 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {REGISTERED === 1 ? "🏪 운영 중인 매장" : `🏪 내 매장 (${REGISTERED}개)`}
          </p>
          <span style={{
            fontSize: "11px", fontWeight: 600, color: "var(--ink-mid)",
            background: "var(--bg-deep)", padding: "3px 9px", borderRadius: "999px",
            border: "1px solid var(--border)",
          }}>
            Free 플랜 · {REGISTERED}개 운영
          </span>
        </div>

        {stores.map((store) => (
          <div key={store.name} style={{
            background: "var(--white)", border: "1px solid var(--border)",
            borderRadius: "var(--r-md)", padding: "14px 16px", marginBottom: "8px",
            boxShadow: "var(--sh-sm)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", margin: "0 0 3px" }}>{store.name}</p>
                <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: "0 0 3px" }}>
                  {store.date} 진단 · 5개 중 {store.cited}개 인용 · 평균 {store.score}점
                </p>
                <p style={{ fontSize: "11.5px", color: "var(--accent)", fontWeight: 600, margin: 0 }}>
                  다음 진단 예정: {store.nextDiagnosis}
                </p>
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
        ))}

        {REGISTERED === 2 && (
          <p style={{ fontSize: "12px", color: "var(--ink-mid)", margin: "4px 0 0", textAlign: "center" }}>
            💡 1명 더 초대하면 매장 1개 추가 등록 가능
          </p>
        )}

        <div style={{ height: "24px" }} />

        {/* PWA 설치 배너 (미설치 모바일 사용자) */}
        <PwaBanner />

        {/* 섹션 라벨 */}
        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          매장 추가 등록
        </p>

        {/* 카카오 채널 친구추가 */}
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "16px", marginBottom: "8px",
          boxShadow: "var(--sh-sm)",
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>카카오 채널 친구추가</p>
          </div>
          <p style={{ fontSize: "12px", color: "var(--ink-mid)", margin: "0 0 10px", lineHeight: 1.5 }}>
            친구 상태 유지 시 등록 유지
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

        {/* 초대하기 */}
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "16px", marginBottom: "24px",
          boxShadow: "var(--sh-sm)",
        }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: "0 0 12px", lineHeight: 1.55 }}>
            🎉 다른 매장도 진단받고 싶으신가요?<br />
            GPT 노출 변화를 빨리 확인하고 싶으신가요?
          </p>

          {/* 즉시 보상 */}
          <div style={{
            background: "var(--bg-soft)", borderRadius: "var(--r-sm)",
            padding: "12px 14px", marginBottom: "8px",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontSize: "12px", fontWeight: 800, color: "var(--ink)", margin: "0 0 8px" }}>
              친구 1명 초대 = 매번 받는 혜택 (택 1)
            </p>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "5px" }}>
              <span style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "2px", flexShrink: 0 }}>·</span>
              <span style={{ fontSize: "12.5px", color: "var(--ink-mid)", lineHeight: 1.45 }}>🏪 매장 1개 추가 등록 (최대 3매장까지)</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "2px" }}>
              <span style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "2px", flexShrink: 0 }}>·</span>
              <span style={{ fontSize: "12.5px", color: "var(--ink-mid)", lineHeight: 1.45 }}>🎫 진단권 1개 추가 (월 최대 5개)</span>
            </div>
            <div style={{
              marginLeft: "14px", marginTop: "6px",
              paddingLeft: "10px", borderLeft: "2px solid var(--border)",
            }}>
              <p style={{ fontSize: "11.5px", color: "var(--accent)", fontWeight: 700, margin: "0 0 2px" }}>
                → 매월 자동 진단을 기다리지 않고
              </p>
              <p style={{ fontSize: "11.5px", color: "var(--accent)", fontWeight: 700, margin: "0 0 6px" }}>
                &nbsp;&nbsp;&nbsp;원할 때 즉시 다시 진단받기!
              </p>
              <p style={{ fontSize: "11px", color: "var(--ink-muted)", margin: 0 }}>
                진단권으로 미션 완료 후 GPT 노출 변화를 즉시 확인하세요
              </p>
            </div>
          </div>

          {/* 양방향 보상 강조 */}
          <div style={{
            background: "#FFF4E8", border: "1px solid #FFD9AD",
            borderRadius: "var(--r-sm)", padding: "10px 14px", marginBottom: "8px",
          }}>
            <p style={{ fontSize: "12.5px", fontWeight: 700, color: "#B45309", margin: 0, lineHeight: 1.5 }}>
              🎁 친구도 가입 즉시 경쟁사 분석 1회를 받아요!
            </p>
          </div>

          {/* 내 초대 현황 */}
          <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: "0 0 12px" }}>
            내 초대: <strong style={{ color: "var(--ink)", fontSize: "13px" }}>{INVITED}명</strong>
          </p>

          {/* 5명 누적 보상 */}
          <div style={{
            background: "var(--bg-dark)", borderRadius: "var(--r-sm)",
            padding: "14px", marginBottom: "12px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <span style={{ fontSize: "18px" }}>🏆</span>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "#FAFAFA", margin: 0 }}>
                5명 초대 시 특별 보상
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {[
                "'베타 앰배서더' 배지",
                "토크비 혜택 단톡방 초대",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <span style={{ color: "var(--accent)", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: "12.5px", color: "#D4D4D8" }}>{item}</span>
                </div>
              ))}
              <div style={{
                marginLeft: "18px", marginTop: "2px", paddingLeft: "10px",
                borderLeft: "2px solid rgba(255,255,255,0.1)",
              }}>
                {[
                  "신규 기능 우선 알림",
                  "베타 한정 이벤트 우선 안내",
                  "Pro 플랜 출시 시 사전 공지",
                  "외식업 사장님 노하우 공유",
                ].map((sub) => (
                  <p key={sub} style={{ fontSize: "11.5px", color: "#6B6B6B", margin: "0 0 3px" }}>· {sub}</p>
                ))}
              </div>
            </div>
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

        {/* 매장 추가하기 */}
        <Link href="/diagnosis/input" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "var(--accent)", color: "#fff",
          borderRadius: "var(--r-md)", padding: "15px 20px",
          textDecoration: "none", boxShadow: "var(--sh-accent)",
        }}>
          <p style={{ fontSize: "14px", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>+ 매장 추가하기</p>
          <span style={{ fontSize: "18px" }}>→</span>
        </Link>

        <div style={{ height: "28px" }} />

        {/* Pro 플랜 사전 등록 */}
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "18px 16px",
          boxShadow: "var(--sh-sm)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span style={{ fontSize: "16px" }}>⭐</span>
            <p style={{ fontSize: "14px", fontWeight: 800, color: "var(--ink)", margin: 0 }}>Pro 플랜 준비 중</p>
            <span style={{
              fontSize: "10px", fontWeight: 700, color: "var(--accent)",
              background: "var(--accent-soft)", padding: "2px 8px", borderRadius: "999px",
              border: "1px solid rgba(232,93,58,0.2)", marginLeft: "auto",
            }}>Coming Soon</span>
          </div>
          {[
            "매장 무제한 등록",
            "데이터 정밀 분석 리포트",
            "전담 우선 지원",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px" }}>
              <span style={{ color: "var(--accent)", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: "13px", color: "var(--ink-mid)" }}>{item}</span>
            </div>
          ))}
          <button style={{
            width: "100%", padding: "12px", background: "var(--bg-dark)", color: "#FAFAFA",
            borderRadius: "var(--r-md)", fontSize: "14px", fontWeight: 700,
            border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", marginTop: "8px",
          }}>
            Pro 플랜 출시 알림 받기
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}
