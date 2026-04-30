import Link from "next/link";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor">
      <path d="M9 1C4.582 1 1 3.694 1 7.018c0 2.116 1.435 3.973 3.6 5.034l-.728 2.649c-.06.218.18.39.366.262L7.41 12.83C7.93 12.92 8.46 13 9 13c4.418 0 8-2.694 8-6.018C17 3.694 13.418 1 9 1z" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="app-container">
      <Header />

      <main style={{ padding: "48px 20px 48px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 120px)" }}>

        <div style={{ width: "100%", maxWidth: "360px" }}>
          <h2 style={{ fontSize: "26px", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.03em", margin: "0 0 8px", color: "var(--ink)", textAlign: "center" }}>
            카카오로 시작하세요
          </h2>
          <p style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.6, margin: "0 0 36px", textAlign: "center" }}>
            1초 로그인 후 바로 진단 시작 · 무료
          </p>

          <Link href="/diagnosis/input" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            width: "100%", padding: "16px", background: "var(--kakao)", color: "var(--kakao-text)",
            borderRadius: "var(--r-md)", fontSize: "16px", fontWeight: 800,
            minHeight: "54px", textDecoration: "none", letterSpacing: "-0.01em",
            marginBottom: "12px",
          }}>
            <KakaoIcon />
            카카오로 시작하기
          </Link>

          <p style={{ textAlign: "center", fontSize: "12px", color: "var(--ink-muted)", margin: "0 0 16px" }}>
            30초 안에 결과 확인 · 별도 회원가입 없음
          </p>

          <p style={{
            textAlign: "center", fontSize: "11.5px", color: "var(--ink-muted)",
            lineHeight: 1.65, margin: "0 0 32px",
          }}>
            시작하기를 누르면 토크비의{" "}
            <a href="/terms" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--ink-mid)", fontWeight: 700, textDecoration: "underline" }}>
              이용약관
            </a>
            {" "}및{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--ink-mid)", fontWeight: 700, textDecoration: "underline" }}>
              개인정보처리방침
            </a>
            에 동의한 것으로 간주합니다.
          </p>

          <Link href="/" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", padding: "12px", background: "transparent",
            color: "var(--ink-muted)", fontSize: "13px", fontWeight: 500,
            textDecoration: "none",
          }}>
            ← 이전으로
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
