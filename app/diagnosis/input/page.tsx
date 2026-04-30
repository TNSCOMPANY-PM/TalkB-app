import Link from "next/link";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  background: "var(--white)",
  border: "1px solid var(--border)",
  borderRadius: "var(--r-sm)",
  fontSize: "15px",
  color: "var(--ink)",
  outline: "none",
  minHeight: "50px",
  fontFamily: "var(--f-body)",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: 700,
  color: "var(--ink)",
  display: "block",
  marginBottom: "8px",
};

export default function InputPage() {
  return (
    <div className="app-container">
      <Header isLoggedIn={true} stores={[{ name: "한미옥 광장점" }]} />

      <main style={{ padding: "28px 20px 48px" }}>
        <span style={{
          display: "inline-block", fontSize: "11px", color: "var(--accent)",
          background: "var(--accent-soft)", padding: "5px 10px", borderRadius: "999px",
          marginBottom: "16px", fontWeight: 600, letterSpacing: "0.02em",
        }}>
          Step 1 of 4 · 매장 정보
        </span>

        <h2 style={{ fontSize: "24px", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.03em", margin: "0 0 10px", color: "var(--ink)" }}>
          우리 매장 정보를 알려주세요
        </h2>
        <p style={{ fontSize: "14.5px", color: "var(--ink-mid)", lineHeight: 1.65, margin: "0 0 28px" }}>
          상호명 + 지역 또는 네이버 플레이스 URL을 입력해주세요
        </p>

        {/* 상호명 */}
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle} htmlFor="store-name">상호명</label>
          <input
            type="text"
            id="store-name"
            placeholder="예: 광장동 한미옥"
            style={inputStyle}
          />
        </div>

        {/* 지역 */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle} htmlFor="store-area">지역</label>
          <input
            type="text"
            id="store-area"
            placeholder="예: 서울 광진구 광장동"
            style={inputStyle}
          />
        </div>

        {/* 구분선 */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "4px 0 20px" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ fontSize: "12px", color: "var(--ink-muted)", fontWeight: 500 }}>또는</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        {/* 네이버 URL */}
        <div style={{ marginBottom: "28px" }}>
          <label style={labelStyle} htmlFor="naver-url">네이버 플레이스 URL</label>
          <input
            type="text"
            id="naver-url"
            placeholder="https://map.naver.com/..."
            style={inputStyle}
          />
        </div>

        {/* 매장 찾기 */}
        <Link href="/diagnosis/match" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", padding: "16px", background: "var(--accent)", color: "#FFFFFF",
          borderRadius: "var(--r-md)", fontSize: "15px", fontWeight: 700,
          minHeight: "52px", textDecoration: "none", letterSpacing: "-0.01em",
          boxShadow: "var(--sh-accent)", marginBottom: "8px",
        }}>
          매장 찾기 →
        </Link>

        <Link href="/diagnosis/login" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", padding: "12px", background: "transparent",
          color: "var(--ink-mid)", fontSize: "13px", fontWeight: 500,
          textDecoration: "none", minHeight: "44px",
        }}>
          이전으로
        </Link>
      </main>

      <Footer />
    </div>
  );
}
