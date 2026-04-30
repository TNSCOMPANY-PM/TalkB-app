"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ── 타입 ────────────────────────────────────────────────────
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export type DeviceType = "android-chrome" | "ios-safari" | "in-app-browser" | "desktop";

export interface InstallPromptProps {
  /** 외부에서 제어할 때 (배너 클릭 등). undefined이면 자동 표시 모드 */
  open?: boolean;
  onClose?: () => void;
  /** 자동 표시 지연 ms (기본: 0 = 즉시) */
  autoDelay?: number;
}

// ── 상수 ────────────────────────────────────────────────────
const DISMISSED_KEY = "talkb_install_dismissed_at";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

// ── 유틸 ────────────────────────────────────────────────────
export function detectDevice(): DeviceType {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent;

  // 인앱 브라우저 우선 감지
  if (/KAKAOTALK/i.test(ua)) return "in-app-browser";
  if (/Instagram/i.test(ua)) return "in-app-browser";
  if (/FBAN|FBAV/i.test(ua)) return "in-app-browser";
  if (/NaverApp/i.test(ua)) return "in-app-browser";
  if (/Line\//i.test(ua)) return "in-app-browser";
  if (/Snapchat/i.test(ua)) return "in-app-browser";

  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isChrome = /Chrome/i.test(ua) && !/Chromium/i.test(ua);
  const isSamsung = /SamsungBrowser/i.test(ua);

  if (isIOS) return "ios-safari";
  if (isAndroid && (isChrome || isSamsung)) return "android-chrome";
  if (isAndroid) return "in-app-browser";

  return "desktop";
}

function wasDismissedRecently(): boolean {
  try {
    const val = localStorage.getItem(DISMISSED_KEY);
    if (!val) return false;
    return Date.now() - parseInt(val) < SEVEN_DAYS;
  } catch {
    return false;
  }
}

export function saveDismissal(): void {
  try {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
  } catch { /* ignore */ }
}

// ── 컴포넌트 ────────────────────────────────────────────────
export default function InstallPrompt({
  open,
  onClose,
  autoDelay = 0,
}: InstallPromptProps) {
  const [visible, setVisible] = useState(false);
  const [device, setDevice] = useState<DeviceType>("desktop");
  // ios/in-app 설치 버튼 클릭 후 인라인 메시지 상태
  const [postClickMsg, setPostClickMsg] = useState<string | null>(null);
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const isControlled = open !== undefined;

  // beforeinstallprompt 조기 캡처 (Android Chrome)
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPromptRef.current = e as BeforeInstallPromptEvent;
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // 표시 로직
  useEffect(() => {
    const dev = detectDevice();

    if (isControlled) {
      setDevice(dev);
      setVisible(!!open);
      if (!open) setPostClickMsg(null);
      return;
    }

    // 자동 모드
    if (wasDismissedRecently()) return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (dev === "desktop") return;

    setDevice(dev);
    const timer = setTimeout(() => setVisible(true), autoDelay);
    return () => clearTimeout(timer);
  }, [open, isControlled, autoDelay]);

  const dismiss = useCallback(() => {
    saveDismissal(); // 모드 관계없이 항상 저장 (7일 뒤 재표시)
    setVisible(false);
    setPostClickMsg(null);
    onClose?.();
  }, [onClose]);

  const handleInstall = async () => {
    if (device === "android-chrome") {
      if (deferredPromptRef.current) {
        await deferredPromptRef.current.prompt();
        await deferredPromptRef.current.userChoice;
        deferredPromptRef.current = null;
        dismiss(); // 수락/거절 모두 닫기
      } else {
        // beforeinstallprompt 미발생 시 (이미 설치됐거나 기준 미충족)
        setPostClickMsg("이미 설치됐거나 브라우저에서 설치를 지원하지 않아요.");
      }
    } else if (device === "ios-safari") {
      setPostClickMsg("위 단계대로 진행해주세요 😊");
    } else if (device === "in-app-browser") {
      setPostClickMsg("외부 브라우저에서 다시 열어주세요.");
    }
  };

  if (!visible) return null;

  // ── 안내 콘텐츠 ─────────────────────────────────────────
  const guideContent = (() => {
    if (device === "android-chrome") {
      return (
        <div style={guideBox}>
          <p style={guideTitle}>Android 설치 방법</p>
          <p style={{ fontSize: "13px", color: "var(--ink-mid)", margin: 0, lineHeight: 1.6 }}>
            &lsquo;앱 설치&rsquo; 버튼을 눌러 바로 설치하세요
          </p>
        </div>
      );
    }
    if (device === "ios-safari") {
      return (
        <div style={guideBox}>
          <p style={guideTitle}>iPhone 설치 방법</p>
          {[
            "하단 공유 버튼(↑) 터치",
            "'홈 화면에 추가' 선택",
            "'추가' 버튼 터치",
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", marginBottom: i < 2 ? "8px" : 0 }}>
              <span style={stepBadge}>{i + 1}</span>
              <span style={{ fontSize: "13px", color: "var(--ink-mid)", lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>
      );
    }
    if (device === "in-app-browser") {
      return (
        <div style={guideBox}>
          <p style={guideTitle}>설치 방법</p>
          {[
            "우측 상단 메뉴(⋯) 터치",
            "'다른 브라우저로 열기' 선택",
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", marginBottom: i < 1 ? "8px" : 0 }}>
              <span style={stepBadge}>{i + 1}</span>
              <span style={{ fontSize: "13px", color: "var(--ink-mid)", lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  })();

  return (
    <>
      {/* 딤 배경 */}
      <div onClick={dismiss} style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 200,
      }} />

      {/* 바텀 시트 */}
      <div style={{
        position: "fixed", bottom: 0,
        left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: "480px",
        background: "var(--white)",
        borderRadius: "20px 20px 0 0",
        padding: "20px 20px 28px",
        paddingBottom: "max(28px, calc(env(safe-area-inset-bottom) + 20px))",
        zIndex: 201,
        boxShadow: "0 -8px 40px rgba(0,0,0,0.14)",
      }}>
        {/* 핸들 */}
        <div style={{
          width: "36px", height: "4px",
          background: "var(--border)", borderRadius: "999px",
          margin: "0 auto 20px",
        }} />

        {/* 제목 */}
        <p style={{
          fontSize: "18px", fontWeight: 800, color: "var(--ink)",
          margin: "0 0 6px", letterSpacing: "-0.02em", lineHeight: 1.35,
        }}>
          📱 토크비를 다시 찾기 어려울 수 있어요
        </p>

        {/* 메인 메시지 */}
        <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: "0 0 4px" }}>
          앱 설치하고 홈 화면에 추가해보세요
        </p>
        <p style={{ fontSize: "13px", color: "var(--ink-mid)", margin: "0 0 18px", lineHeight: 1.6 }}>
          진단 체크리스트로 관리하고 진단 결과를 빠르게 확인할 수 있어요
        </p>

        {/* 설치 방법 */}
        {guideContent}

        {/* 설치 버튼 클릭 후 인라인 메시지 */}
        {postClickMsg && (
          <div style={{
            background: "var(--accent-soft)", border: "1px solid rgba(232,93,58,0.2)",
            borderRadius: "var(--r-sm)", padding: "10px 14px",
            marginBottom: "12px", marginTop: "4px",
          }}>
            <p style={{ fontSize: "13px", color: "var(--accent-deep)", margin: 0, fontWeight: 600 }}>
              {postClickMsg}
            </p>
          </div>
        )}

        {/* 버튼 영역 */}
        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
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
            onClick={handleInstall}
            style={{
              flex: 2, padding: "13px",
              background: "var(--accent)", color: "#fff",
              borderRadius: "var(--r-sm)", fontSize: "13px", fontWeight: 700,
              border: "none", cursor: "pointer",
            }}
          >
            앱 설치
          </button>
        </div>
      </div>
    </>
  );
}

// ── 공통 스타일 상수 ─────────────────────────────────────────
const guideBox: React.CSSProperties = {
  background: "var(--bg-soft)",
  border: "1px solid var(--border-soft)",
  borderRadius: "var(--r-sm)",
  padding: "14px 16px",
  marginBottom: "14px",
};

const guideTitle: React.CSSProperties = {
  fontSize: "12px", fontWeight: 700, color: "var(--ink)",
  margin: "0 0 10px",
};

const stepBadge: React.CSSProperties = {
  width: "20px", height: "20px", borderRadius: "50%",
  background: "var(--accent)", color: "#fff",
  fontSize: "11px", fontWeight: 700,
  display: "flex", alignItems: "center", justifyContent: "center",
  flexShrink: 0, marginTop: "1px",
};
