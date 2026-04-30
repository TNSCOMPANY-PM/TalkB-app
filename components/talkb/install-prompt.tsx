"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "talkb_install_prompt_dismissed";

function detectOS(): "ios" | "android" | "other" {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [os, setOs] = useState<"ios" | "android" | "other">("other");

  useEffect(() => {
    // 이미 닫은 경우 표시 안 함
    if (localStorage.getItem(STORAGE_KEY)) return;
    // standalone 모드(이미 설치됨)인 경우 표시 안 함
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    // 데스크탑은 표시 안 함
    const detectedOs = detectOS();
    if (detectedOs === "other") return;

    setOs(detectedOs);
    setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* 딤 배경 */}
      <div
        onClick={dismiss}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 200,
        }}
      />

      {/* 모달 */}
      <div style={{
        position: "fixed", bottom: 0,
        left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: "480px",
        background: "var(--white)",
        borderRadius: "20px 20px 0 0",
        padding: "24px 20px 32px",
        paddingBottom: "max(32px, calc(env(safe-area-inset-bottom) + 20px))",
        zIndex: 201,
        boxShadow: "0 -8px 32px rgba(0,0,0,0.12)",
      }}>
        {/* 핸들 */}
        <div style={{
          width: "36px", height: "4px",
          background: "var(--border)", borderRadius: "999px",
          margin: "0 auto 20px",
        }} />

        <p style={{ fontSize: "18px", fontWeight: 800, color: "var(--ink)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          📱 토크비를 홈 화면에 추가하세요
        </p>
        <p style={{ fontSize: "13px", color: "var(--ink-mid)", margin: "0 0 20px", lineHeight: 1.6 }}>
          매월 자동 진단 결과를 카카오톡으로 받을 수 있어요
        </p>

        {/* OS별 안내 */}
        {os === "ios" ? (
          <div style={{
            background: "var(--bg-soft)", borderRadius: "var(--r-sm)",
            padding: "14px 16px", marginBottom: "16px",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink)", margin: "0 0 8px" }}>
              iPhone 설치 방법
            </p>
            {[
              "Safari 브라우저로 토크비 접속",
              "하단 공유 버튼(□↑) 탭",
              "\"홈 화면에 추가\" 선택 → 추가",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
                <span style={{
                  width: "18px", height: "18px", borderRadius: "50%",
                  background: "var(--accent)", color: "#fff",
                  fontSize: "10px", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: "1px",
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: "12.5px", color: "var(--ink-mid)", lineHeight: 1.5 }}>{step}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: "var(--bg-soft)", borderRadius: "var(--r-sm)",
            padding: "14px 16px", marginBottom: "16px",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink)", margin: "0 0 8px" }}>
              Android 설치 방법
            </p>
            {[
              "Chrome 브라우저로 토크비 접속",
              "우측 상단 메뉴(⋮) 탭",
              "\"홈 화면에 추가\" 또는 \"앱 설치\" 선택",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
                <span style={{
                  width: "18px", height: "18px", borderRadius: "50%",
                  background: "var(--accent)", color: "#fff",
                  fontSize: "10px", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: "1px",
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: "12.5px", color: "var(--ink-mid)", lineHeight: 1.5 }}>{step}</span>
              </div>
            ))}
          </div>
        )}

        {/* 버튼 영역 */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={dismiss}
            style={{
              flex: 1, padding: "13px",
              background: "var(--bg-deep)", color: "var(--ink-mid)",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
              border: "1px solid var(--border)", cursor: "pointer",
            }}
          >
            나중에
          </button>
          <button
            onClick={dismiss}
            style={{
              flex: 2, padding: "13px",
              background: "var(--accent)", color: "#fff",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
              border: "none", cursor: "pointer",
            }}
          >
            확인했어요 ✓
          </button>
        </div>
      </div>
    </>
  );
}
