import fs from "fs";
import path from "path";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";
import MarkdownRenderer from "@/components/talkb/markdown-renderer";

export const metadata = {
  title: "개인정보처리방침 | 토크비 (TalkB)",
};

export default function PrivacyPage() {
  const content = fs.readFileSync(
    path.join(process.cwd(), "docs", "privacy-policy.md"),
    "utf-8"
  );

  return (
    <div className="app-container">
      <Header isLoggedIn={false} />

      <main style={{ padding: "28px 20px 48px", maxWidth: "720px", margin: "0 auto" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "11px", color: "var(--ink-muted)",
          marginBottom: "24px", fontWeight: 600,
        }}>
          <a href="/" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>홈</a>
          <span>›</span>
          <span>개인정보처리방침</span>
        </div>

        <MarkdownRenderer content={content} />
      </main>

      <Footer />
    </div>
  );
}
