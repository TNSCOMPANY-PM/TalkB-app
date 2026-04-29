import Link from "next/link";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";

export default function CompletePage() {
  return (
    <div className="app-container">
      <Header />

      <main style={{ padding: "60px 20px 48px", textAlign: "center" }}>
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%",
          background: "var(--success-soft)", border: "2px solid rgba(22,163,74,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
            stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--ink)", margin: "0 0 10px", letterSpacing: "-0.03em" }}>
          PDF 준비가 됐어요
        </h2>
        <p style={{ fontSize: "14px", color: "var(--ink-mid)", margin: "0 0 32px", lineHeight: 1.65 }}>
          GPT 최적화 컨설팅 자료집을<br />바로 다운받으실 수 있어요.
        </p>

        <button style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", padding: "16px", background: "var(--accent)", color: "#FFFFFF",
          borderRadius: "var(--r-md)", fontSize: "15px", fontWeight: 800,
          minHeight: "52px", border: "none", cursor: "pointer", letterSpacing: "-0.01em",
          boxShadow: "var(--sh-accent)", marginBottom: "12px",
        }}>
          PDF 다운받기
        </button>

        <Link href="/mypage" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", padding: "13px", background: "var(--white)", color: "var(--ink)",
          borderRadius: "var(--r-md)", fontSize: "14px", fontWeight: 700,
          border: "1px solid var(--border)", textDecoration: "none",
        }}>
          마이페이지로 이동
        </Link>
      </main>

      <Footer />
    </div>
  );
}
