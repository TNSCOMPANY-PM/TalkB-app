import Link from "next/link";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";

export default function MatchPage() {
  return (
    <div className="app-container">
      <Header isLoggedIn={true} stores={[{ name: "한미옥 광장점" }]} />

      <main style={{ padding: "28px 20px 48px" }}>
        <span style={{
          display: "inline-block", fontSize: "11px", color: "var(--accent)",
          background: "var(--accent-soft)", padding: "5px 10px", borderRadius: "999px",
          marginBottom: "16px", fontWeight: 600, letterSpacing: "0.02em",
        }}>
          Step 2 of 4 · 매장 확인
        </span>

        <h2 style={{ fontSize: "24px", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.03em", margin: "0 0 6px", color: "var(--ink)" }}>
          이 매장 정보가 맞으신가요?
        </h2>
        <p style={{ fontSize: "13.5px", color: "var(--ink-mid)", lineHeight: 1.6, margin: "0 0 16px" }}>
          확인 후 AI 노출 진단을 시작합니다
        </p>

        {/* Store Card */}
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-lg)", overflow: "hidden", marginBottom: "24px",
          boxShadow: "var(--sh-md)",
        }}>
          {/* Store Photo Placeholder */}
          <div style={{
            width: "100%", height: "160px", background: "var(--bg-deep)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: "13px", color: "var(--ink-muted)" }}>매장 대표 사진</span>
          </div>

          <div style={{ padding: "20px" }}>
            <p style={{ fontSize: "20px", fontWeight: 800, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
              광장동 한미옥
            </p>
            <p style={{ fontSize: "13.5px", color: "var(--ink-mid)", margin: "0 0 2px" }}>서울 광진구 광장동 OO-OO</p>
            <p style={{ fontSize: "13.5px", color: "var(--ink-mid)", margin: "0 0 16px" }}>한식 · 한정식</p>

            {/* 소구점 뱃지 */}
            <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              자동 추출된 매장 소구점
            </p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
              {["가족 모임", "룸 5개", "발렛 가능"].map((tag) => (
                <span key={tag} style={{
                  fontSize: "12px", fontWeight: 600, color: "var(--accent)",
                  background: "var(--accent-soft)", padding: "5px 10px",
                  borderRadius: "999px", border: "1px solid rgba(232,93,58,0.2)",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* 예상 질문 5개 */}
            <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              ChatGPT에 던질 예상 질문 5개
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                "광장동 근처 가족 모임하기 좋은 한식당 추천해줘",
                "광진구 룸 있는 한정식 맛집 어디야?",
                "광장동 회식 장소 추천해줘",
                "서울 한정식 분위기 좋은 곳 알려줘",
                "발렛파킹 되는 광장동 한식당 있어?",
              ].map((q, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "8px",
                  background: "var(--bg-deep)", borderRadius: "var(--r-sm)",
                  padding: "10px 12px",
                }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent)", minWidth: "16px", marginTop: "1px" }}>Q{i + 1}</span>
                  <span style={{ fontSize: "12.5px", color: "var(--ink-mid)", lineHeight: 1.5 }}>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link href="/diagnosis/measuring" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", padding: "15px", background: "var(--accent)", color: "#FFFFFF",
          borderRadius: "var(--r-md)", fontSize: "15px", fontWeight: 700,
          minHeight: "50px", textDecoration: "none", letterSpacing: "-0.01em",
          boxShadow: "var(--sh-accent)", marginBottom: "10px",
        }}>
          맞아요, 진단 시작하기 →
        </Link>

        {/* 정보가 다른 경우 */}
        <div style={{
          background: "var(--bg-soft)", border: "1px solid var(--border-soft)",
          borderRadius: "var(--r-md)", padding: "14px 16px",
        }}>
          <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: "0 0 10px", fontWeight: 600 }}>
            정보가 다른가요?
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <Link href="/diagnosis/input" style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              padding: "10px", background: "var(--white)", color: "var(--ink)",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 600,
              border: "1px solid var(--border)", textDecoration: "none", gap: "4px",
            }}>
              ✏️ 정보 수정하기
            </Link>
            <Link href="/diagnosis/input" style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              padding: "10px", background: "var(--white)", color: "var(--ink)",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 600,
              border: "1px solid var(--border)", textDecoration: "none", gap: "4px",
            }}>
              🔍 다시 검색
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
