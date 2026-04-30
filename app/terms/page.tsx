import fs from "fs";
import path from "path";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";
import MarkdownRenderer from "@/components/talkb/markdown-renderer";

export const metadata = {
  title: "이용약관 | 토크비 (TalkB)",
};

export default function TermsPage() {
  const content = fs.readFileSync(
    path.join(process.cwd(), "docs", "terms-of-service.md"),
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
          <span>이용약관</span>
        </div>

        <MarkdownRenderer content={content} />
      </main>

      <Footer />
    </div>
  );
}
