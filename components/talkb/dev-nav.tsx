"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const screens = [
  { label: "1. 시작", href: "/" },
  { label: "2. 로그인", href: "/diagnosis/login" },
  { label: "3. 입력", href: "/diagnosis/input" },
  { label: "4. 매칭", href: "/diagnosis/match" },
  { label: "5. 측정", href: "/diagnosis/measuring" },
  { label: "6. 결과", href: "/diagnosis/result" },
  { label: "7. 마이페이지", href: "/mypage" },
];

export default function DevNav() {
  const pathname = usePathname();
  if (process.env.NEXT_PUBLIC_APP_ENV !== "development") return null;
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: "480px",
      background: "var(--bg-dark)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      padding: "8px 12px 12px",
      zIndex: 100,
    }}>
      <p style={{ fontSize: "10px", color: "#6B6B6B", margin: "0 0 6px", fontWeight: 600, letterSpacing: "0.05em" }}>
        화면 이동 (개발용)
      </p>
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
        {screens.map((s) => (
          <Link key={s.href} href={s.href} style={{
            fontSize: "11px",
            padding: "4px 8px",
            borderRadius: "4px",
            background: pathname === s.href ? "var(--accent)" : "rgba(255,255,255,0.08)",
            color: pathname === s.href ? "#fff" : "#A3A3A3",
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
