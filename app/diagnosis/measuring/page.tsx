"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/talkb/header";
import Footer from "@/components/talkb/footer";

const STEPS = [
  "매장 정보 분석",
  "ChatGPT에 질문 5개 전송",
  "인용 결과 수집",
  "5대 항목 자동 점검",
];

const INSIGHTS = [
  "ChatGPT는 사용자를 기억합니다. 사장님 본인이 검색하면 자기 매장이 잘 나오지만, 처음 보는 손님에게는 다르게 답변할 수 있습니다.",
  "AI는 한 번 신뢰한 출처를 계속 인용합니다. 먼저 자리잡은 매장이 다음 인용도 가져갑니다.",
  "광고비 없이도 인용이 누적되는 자산형 채널. 같은 비용으로 옆집은 자리를 잡고 있습니다.",
  "식당업은 AI 답변 노출률 78%로 헬스케어 다음 두 번째로 높은 업종입니다.",
];

export default function MeasuringPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const [insightIdx, setInsightIdx] = useState(0);

  useEffect(() => {
    const progressValues = [25, 50, 75, 100];
    let idx = 0;

    function next() {
      if (idx >= progressValues.length) {
        setTimeout(() => router.push("/diagnosis/result"), 700);
        return;
      }
      setProgress(progressValues[idx]);
      if (idx > 0) setDoneSteps((prev) => [...prev, idx - 1]);
      setCurrentStep(idx);
      setInsightIdx(idx);
      idx++;
      setTimeout(next, 1500);
    }

    const timer = setTimeout(next, 400);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="app-container">
      <Header isLoggedIn={true} stores={[{ name: "한미옥 광장점" }]} />

      <main style={{ padding: "28px 20px 48px" }}>
        <span style={{
          display: "inline-block", fontSize: "11px", color: "var(--accent)",
          background: "var(--accent-soft)", padding: "5px 10px", borderRadius: "999px",
          marginBottom: "16px", fontWeight: 600, letterSpacing: "0.02em",
        }}>
          Step 3 of 4 · AI 측정 진행 중
        </span>

        <h2 style={{ fontSize: "24px", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.03em", margin: "0 0 10px", color: "var(--ink)" }}>
          한미옥 광장점의<br />AI 노출을 진단 중입니다
        </h2>
        <p style={{ fontSize: "14.5px", color: "var(--ink-mid)", lineHeight: 1.65, margin: "0 0 28px" }}>
          약 1분 소요
        </p>

        {/* Progress Bar */}
        <div style={{
          width: "100%", height: "6px", background: "var(--bg-deep)",
          borderRadius: "999px", marginBottom: "24px", overflow: "hidden",
        }}>
          <div style={{
            height: "100%", background: "var(--accent)",
            borderRadius: "999px", width: `${progress}%`,
            transition: "width 0.8s ease",
          }} />
        </div>

        {/* Step List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
          {STEPS.map((step, i) => {
            const isDone = doneSteps.includes(i);
            const isActive = currentStep === i;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "14px 16px",
                background: isActive ? "var(--accent-soft)" : isDone ? "var(--success-soft)" : "var(--white)",
                border: `1px solid ${isActive ? "rgba(232,93,58,0.3)" : isDone ? "rgba(22,163,74,0.2)" : "var(--border)"}`,
                borderRadius: "var(--r-sm)",
                transition: "all 0.3s ease",
              }}>
                <div style={{
                  minWidth: "24px", height: "24px", borderRadius: "50%",
                  background: isDone ? "var(--success)" : isActive ? "var(--accent)" : "var(--bg-deep)",
                  color: isDone || isActive ? "#fff" : "var(--ink-muted)",
                  fontSize: "12px", fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {isDone ? "✓" : i + 1}
                </div>
                <p style={{
                  fontSize: "14px", fontWeight: 600, margin: 0,
                  color: isActive ? "var(--accent-deep)" : isDone ? "var(--success)" : "var(--ink-mid)",
                }}>
                  {step}
                </p>
                {isActive && (
                  <span style={{
                    marginLeft: "auto", fontSize: "11px", color: "var(--accent)",
                    fontWeight: 600, animation: "pulse 1s infinite",
                  }}>진행 중…</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Insight Card */}
        <div style={{
          background: "var(--bg-dark)", borderRadius: "var(--r-md)", padding: "20px",
        }}>
          <p style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 600, margin: "0 0 8px", letterSpacing: "0.04em" }}>
            잠깐, 이것 알고 계셨나요?
          </p>
          <p style={{ fontSize: "13.5px", color: "#D4D4D8", lineHeight: 1.65, margin: 0 }}>
            {INSIGHTS[insightIdx]}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
