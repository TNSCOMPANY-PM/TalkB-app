"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";

const KAKAO_EMAIL = "hong****@gmail.com";

export default function CompletePage() {
  const router = useRouter();
  const [email, setEmail] = useState(KAKAO_EMAIL);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(KAKAO_EMAIL);
  const [sent, setSent] = useState(false);

  function handleSend() {
    setSent(true);
    setTimeout(() => router.push("/mypage"), 2000);
  }

  if (sent) {
    return (
      <div className="app-container">
        <Header tickets={0} />
        <main style={{ padding: "60px 20px", textAlign: "center" }}>
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: "var(--success-soft)", border: "2px solid rgba(22,163,74,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--ink)", margin: "0 0 10px", letterSpacing: "-0.03em" }}>
            리포트를 발송했습니다
          </h2>
          <p style={{ fontSize: "14px", color: "var(--ink-mid)", margin: 0, lineHeight: 1.65 }}>
            <strong style={{ color: "var(--ink)" }}>{email}</strong>으로<br />
            AI 최적화 가이드 PDF를 보내드렸습니다
          </p>
          <p style={{ fontSize: "12.5px", color: "var(--ink-muted)", marginTop: "16px" }}>
            마이페이지로 이동합니다…
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header tickets={0} />

      <main style={{ padding: "28px 20px 48px" }}>
        <span style={{
          display: "inline-block", fontSize: "11px", color: "var(--accent)",
          background: "var(--accent-soft)", padding: "5px 10px", borderRadius: "999px",
          marginBottom: "16px", fontWeight: 600, letterSpacing: "0.02em",
        }}>
          PDF 리포트 받기
        </span>

        <h2 style={{ fontSize: "24px", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.03em", margin: "0 0 10px", color: "var(--ink)" }}>
          어디로 발송할까요?
        </h2>
        <p style={{ fontSize: "14.5px", color: "var(--ink-mid)", lineHeight: 1.65, margin: "0 0 28px" }}>
          카카오 계정 이메일로 자동 입력됐습니다.<br />
          틀리다면 수정해주세요.
        </p>

        {/* 이메일 확인 카드 */}
        <div style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--r-lg)", padding: "20px", marginBottom: "16px",
          boxShadow: "var(--sh-md)",
        }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            수신 이메일
          </p>

          {isEditing ? (
            <div>
              <input
                type="email"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px",
                  background: "var(--bg-soft)", border: "2px solid var(--accent)",
                  borderRadius: "var(--r-sm)", fontSize: "15px", color: "var(--ink)",
                  outline: "none", fontFamily: "var(--f-body)",
                  boxSizing: "border-box", marginBottom: "10px",
                }}
                autoFocus
              />
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => { setEmail(editValue); setIsEditing(false); }}
                  style={{
                    flex: 1, padding: "11px", background: "var(--accent)", color: "#fff",
                    borderRadius: "var(--r-sm)", fontSize: "14px", fontWeight: 700,
                    border: "none", cursor: "pointer",
                  }}>
                  저장
                </button>
                <button
                  onClick={() => { setEditValue(email); setIsEditing(false); }}
                  style={{
                    flex: 1, padding: "11px", background: "var(--bg-soft)", color: "var(--ink-mid)",
                    borderRadius: "var(--r-sm)", fontSize: "14px", fontWeight: 600,
                    border: "1px solid var(--border)", cursor: "pointer",
                  }}>
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "var(--accent-soft)", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "16px" }}>✉️</span>
                </div>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {email}
                </span>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: "7px 12px", background: "var(--bg-deep)", color: "var(--ink-mid)",
                  borderRadius: "var(--r-sm)", fontSize: "12px", fontWeight: 600,
                  border: "1px solid var(--border)", cursor: "pointer", flexShrink: 0,
                }}>
                수정
              </button>
            </div>
          )}
        </div>

        {/* 리포트 내용 안내 */}
        <div style={{
          background: "var(--bg-soft)", borderRadius: "var(--r-md)", padding: "16px",
          marginBottom: "28px", border: "1px solid var(--border-soft)",
        }}>
          <p style={{ fontSize: "12.5px", color: "var(--ink-mid)", margin: "0 0 8px", fontWeight: 700 }}>
            PDF 리포트에 포함된 내용
          </p>
          {[
            "5대 항목별 점수 + 개선 방법",
            "경쟁사 대비 내 매장 위치 분석",
            "AI 노출 점수를 높이는 실행 체크리스트",
            "지역 업종별 평균 점수 비교",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{ color: "var(--success)", fontSize: "12px" }}>✓</span>
              <span style={{ fontSize: "12.5px", color: "var(--ink-mid)" }}>{item}</span>
            </div>
          ))}
        </div>

        {/* 발송 버튼 */}
        <button
          onClick={handleSend}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", padding: "16px", background: "var(--accent)", color: "#FFFFFF",
            borderRadius: "var(--r-md)", fontSize: "15px", fontWeight: 700,
            minHeight: "52px", border: "none", cursor: "pointer", letterSpacing: "-0.01em",
            boxShadow: "var(--sh-accent)", marginBottom: "8px",
          }}>
          이 이메일로 리포트 받기 →
        </button>

        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--ink-muted)", margin: 0 }}>
          카카오 알림톡으로도 함께 발송됩니다
        </p>
      </main>

      <Footer />
    </div>
  );
}
