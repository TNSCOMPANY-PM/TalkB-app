"use client";

import { useState, useEffect } from "react";
import InstallPrompt, { detectDevice } from "@/components/talkb/install-prompt";

const BANNER_KEY = "talkb_banner_dismissed_at";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export default function PwaBanner() {
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // PWA standalone 모드 → 이미 설치됨, 표시 안 함
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    // 데스크탑 → 표시 안 함
    if (detectDevice() === "desktop") return;
    // 배너 X 클릭 후 7일 이내 → 표시 안 함
    try {
      const val = localStorage.getItem(BANNER_KEY);
      if (val && Date.now() - parseInt(val) < SEVEN_DAYS) return;
    } catch { /* ignore */ }

    setShow(true);
  }, []);

  const dismissBanner = () => {
    try {
      localStorage.setItem(BANNER_KEY, String(Date.now()));
    } catch { /* ignore */ }
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      <div style={{
        background: "var(--bg-dark)",
        borderRadius: "var(--r-md)",
        padding: "16px 16px 16px 16px",
        marginBottom: "20px",
        border: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
      }}>
        {/* X 닫기 버튼 (7일 비표시) */}
        <button
          onClick={dismissBanner}
          aria-label="배너 닫기"
          style={{
            position: "absolute", top: "12px", right: "12px",
            background: "none", border: "none", cursor: "pointer",
            color: "#6B6B6B", fontSize: "14px", padding: "4px",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <p style={{
          fontSize: "14px", fontWeight: 800, color: "#FAFAFA",
          margin: "0 0 6px", letterSpacing: "-0.02em", paddingRight: "24px",
        }}>
          📱 토크비를 홈 화면에 추가하세요
        </p>
        <p style={{
          fontSize: "12.5px", color: "#A3A3A3",
          margin: "0 0 14px", lineHeight: 1.6,
        }}>
          진단 체크리스트로 관리하고<br />
          진단 결과를 빠르게 확인할 수 있어요
        </p>

        <button
          onClick={() => setModalOpen(true)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", padding: "12px",
            background: "var(--accent)", color: "#fff",
            borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
            border: "none", cursor: "pointer",
          }}
        >
          앱 설치하기 →
        </button>
      </div>

      {/* 배너에서 트리거된 모달 (controlled mode) */}
      {modalOpen && (
        <InstallPrompt
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
