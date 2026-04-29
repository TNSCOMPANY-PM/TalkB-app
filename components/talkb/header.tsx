"use client";

import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn?: boolean;
  tickets?: number;
}

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
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
      padding: "12px 20px",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg)",
      position: "sticky",
      top: 0,
      zIndex: 10,
      paddingTop: "max(12px, env(safe-area-inset-top))",
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
            fontSize: "12px", fontWeight: 700, color: "#fff",
            background: tickets === 0 ? "#EF4444" : "var(--accent)",
            padding: "5px 10px", borderRadius: "999px",
            whiteSpace: "nowrap",
          }}>
            진단권 {tickets}개
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
            <PersonIcon />
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
