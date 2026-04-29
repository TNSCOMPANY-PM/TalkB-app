"use client";

import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn?: boolean;
  tickets?: number;
}

function NoteIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export default function Header({ isLoggedIn = false, tickets = 0 }: HeaderProps) {
  const [hovered, setHovered] = useState(false);
  const logoHref = isLoggedIn ? "/mypage" : "/";

  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg)",
      position: "sticky",
      top: 0,
      zIndex: 10,
      paddingTop: "max(16px, env(safe-area-inset-top))",
    }}>
      <Link href={logoHref} style={{ textDecoration: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" }}>TalkB</span>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", marginBottom: "1px" }} />
          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink-mid)", letterSpacing: "-0.01em" }}>토크비</span>
        </div>
        <p style={{ fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", margin: "2px 0 0", letterSpacing: "0.01em" }}>
          NO.1 외식업 전문 AI노출 솔루션
        </p>
      </Link>

      {isLoggedIn ? (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            fontSize: "13px", fontWeight: 800,
            color: tickets >= 3 ? "var(--ink-mid)" : tickets === 0 ? "#fff" : "var(--accent)",
            background: tickets >= 3 ? "var(--bg-deep)" : tickets === 0 ? "#EF4444" : "var(--accent-soft)",
            padding: "6px 12px", borderRadius: "999px",
            whiteSpace: "nowrap", letterSpacing: "-0.01em",
            border: tickets === 0 ? "none" : tickets >= 3 ? "1px solid var(--border)" : "1px solid rgba(232,93,58,0.25)",
            boxShadow: tickets === 0 ? "0 1px 4px rgba(239,68,68,0.3)" : "none",
          }}>
            🏪 {tickets}개 운영
          </span>
          <Link
            href="/mypage"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
              background: hovered ? "var(--bg-deep)" : "var(--bg-soft)",
              border: "1px solid var(--border)",
              color: hovered ? "var(--ink)" : "var(--ink-mid)",
              textDecoration: "none",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            <NoteIcon />
          </Link>
        </div>
      ) : (
        <Link href="/diagnosis/login" style={{
          fontSize: "13px", fontWeight: 700, color: "var(--ink-mid)",
          textDecoration: "none", flexShrink: 0,
        }}>
          로그인
        </Link>
      )}
    </header>
  );
}
