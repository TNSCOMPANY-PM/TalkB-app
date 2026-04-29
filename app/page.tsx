import Link from "next/link";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";
import TypewriterSearch from "@/components/talkb/typewriter-search";

export default function Home() {
  return (
    <div className="app-container">
      <Header isLoggedIn={false} />

      <main style={{ padding: "16px 20px 32px" }}>

        <h1 style={{
          fontSize: "26px", fontWeight: 800, lineHeight: 1.35,
          letterSpacing: "-0.03em", margin: "0 0 16px", color: "var(--ink)",
        }}>
          요즘 손님들은 GPT에 물어봅니다.<br />
          <span style={{ color: "var(--accent)" }}>사장님 가게가 나올까요?</span>
        </h1>

        {/* GPT 검색창 데모 */}
        <TypewriterSearch />

        {/* 버튼 상단 문구 */}
        <div style={{
          background: "var(--bg-dark)", borderRadius: "var(--r-md)",
          padding: "16px 18px", marginBottom: "12px",
        }}>
          <p style={{ fontSize: "15px", fontWeight: 800, color: "#FAFAFA", lineHeight: 1.45, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            내가 검색하면 나오는 우리 가게,<br />
            <span style={{ color: "var(--accent)" }}>손님이 검색해도 나올까요?</span>
          </p>
          <p style={{ fontSize: "12.5px", color: "#A3A3A3", margin: 0, lineHeight: 1.65 }}>
            GPT는 사장님을 기억합니다. 토크비는 진짜 손님 환경에서 확인해드려요.
          </p>
        </div>

        {/* CTA */}
        <Link href="/diagnosis/login" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", padding: "14px 20px", background: "var(--accent)", color: "#FFFFFF",
          borderRadius: "var(--r-md)", fontSize: "15px", fontWeight: 800,
          letterSpacing: "-0.02em", minHeight: "48px", textDecoration: "none",
          boxShadow: "var(--sh-accent)", marginBottom: "8px",
        }}>
          무료로 확인하기
        </Link>
        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--ink-muted)", margin: "0 0 14px" }}>
          30초 안에 결과 확인 · 카카오로 1초 시작
        </p>

        {/* 무료로 받는 것 */}
        <div style={{
          background: "var(--bg-soft)", border: "1px solid var(--border-soft)",
          borderRadius: "var(--r-md)", padding: "14px 16px",
        }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            30초 안에 이걸 알 수 있어요
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "손님 시점으로 GPT가 내 가게를 추천하는지 알 수 있어요",
              "GPT가 추천할 수 있게 어떤 걸 개선해야 하는지 알 수 있어요",
              "직접 쉽게 실행할 수 있는 GPT 최적화 컨설팅 자료집(PDF)이 무료로 제공돼요",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
                <span style={{ fontSize: "13px", color: "var(--ink-mid)", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
