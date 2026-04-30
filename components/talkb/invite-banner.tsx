"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function InviteBanner() {
  const params = useSearchParams();
  const invite = params.get("invite");

  if (!invite) return null;

  // 백엔드 연동 전 임시: 초대코드로 매장명 조회 예정 (동균팀장)
  const storeName = "광장동 한미옥";

  return (
    <div style={{
      background: "linear-gradient(135deg, #FFF8F0 0%, #FFF4E8 100%)",
      border: "1px solid #FFD9AD",
      borderRadius: "var(--r-lg)",
      padding: "20px",
      marginBottom: "20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <span style={{ fontSize: "26px", lineHeight: 1 }}>🎁</span>
        <div>
          <p style={{ fontSize: "16px", fontWeight: 800, color: "#7C3D00", margin: 0, letterSpacing: "-0.02em" }}>
            초대받으셨네요!
          </p>
          <p style={{ fontSize: "12.5px", color: "#B45309", margin: "2px 0 0", fontWeight: 600 }}>
            {storeName} 사장님이 초대하셨어요
          </p>
        </div>
      </div>

      <div style={{
        background: "rgba(255, 255, 255, 0.7)",
        borderRadius: "var(--r-sm)",
        padding: "12px 14px",
        marginBottom: "14px",
        border: "1px solid rgba(255, 185, 100, 0.3)",
      }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#B45309", margin: "0 0 8px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          가입 즉시 받는 혜택
        </p>
        {[
          "우리 매장 무료 GPT 노출 진단",
          "GPT 노출 진단권 1회 (보너스!)",
          "GPT 최적화 컨설팅 PDF",
        ].map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
            <span style={{ color: "#D97706", fontSize: "12px", fontWeight: 800, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: "13px", color: "#7C3D00", fontWeight: 600, lineHeight: 1.4 }}>{item}</span>
          </div>
        ))}
      </div>

      <Link
        href={`/diagnosis/login?invite=${invite}`}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          width: "100%", padding: "14px", background: "var(--accent)", color: "#FFFFFF",
          borderRadius: "var(--r-md)", fontSize: "15px", fontWeight: 800,
          textDecoration: "none", letterSpacing: "-0.02em",
          boxShadow: "0 2px 12px rgba(232, 93, 58, 0.35)",
        }}
      >
        무료로 진단받기 →
      </Link>
    </div>
  );
}
