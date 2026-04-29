"use client";

import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn?: boolean;
  tickets?: number;
}

function BookOpenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export default function Header({ isLoggedIn = false, tickets = 0 }: HeaderProps) {
  const [hovered, setHovered] = useState(false);
  const logoHref = isLoggedIn ? "/mypage" : "/";

  return (
    <>
      <style>{`
        .hdr-badge-short { display: none; }
        @media (max-width: 360px) {
          .hdr-badge-long { display: none; }
          .hdr-badge-short { display: inline; }
        }
      `}</style>

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
        <Link href={logoHref} style={{ textDecoration: "none", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" }}>TalkB</span>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", flexShrink: 0, marginBottom: "1px" }} />
            <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink-mid)", letterSpacing: "-0.01em" }}>토크비</span>
          </div>
          <p style={{ fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", margin: "2px 0 0", letterSpacing: "0.01em" }}>
            NO.1 외식업 전문 AI노출 솔루션
          </p>
        </Link>

        {isLoggedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, marginLeft: "12px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "3px",
              fontSize: "13px", fontWeight: 800,
              color: "var(--accent)",
              background: "var(--accent-soft)",
              padding: "6px 11px", borderRadius: "999px",
              whiteSpace: "nowrap", letterSpacing: "-0.01em",
              border: "1px solid rgba(232,93,58,0.25)",
            }}>
              🏪{" "}
              <span className="hdr-badge-long">{tickets}개 운영</span>
              <span className="hdr-badge-short">{tickets}</span>
            </span>

            <Link
              href="/mypage"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                background: hovered ? "var(--bg-deep)" : "var(--bg-soft)",
                border: "1px solid var(--border)",
                color: hovered ? "var(--ink)" : "var(--ink-mid)",
                textDecoration: "none",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              <BookOpenIcon />
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
    </>
  );
}
