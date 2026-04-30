"use client";

import { useEffect, useState } from "react";

const QUERIES = [
  "광장동에서 회식하기 좋은 한식당 추천해줘",
  "성수동 분위기 좋은 카페 어디야?",
  "강남 생일 파티 할 수 있는 이탈리안 레스토랑",
  "홍대 혼밥하기 좋은 라멘집 알려줘",
  "을지로에서 조용히 술 한잔 하기 좋은 이자카야",
  "인스타 감성 브런치 카페 어디 좋아?",
];

const RESPONSES = [
  "광장동 '한울정', '초가마루', '가람한식'을 추천드립니다. 한울정은 룸 구성이 잘 돼 있어 단체 회식에 특히 인기가 많습니다.",
  "성수동에서는 '오월의창', '브릭커피', '서울숲 로스터리'가 분위기 좋기로 유명합니다. 오월의창은 인더스트리얼 감성으로 특히 인기입니다.",
  "강남에서는 '벨라로마', '트라토리아비아', '루나테이블'을 추천합니다. 벨라로마는 프라이빗 룸 예약이 가능해 파티에 적합합니다.",
  "홍대 라멘은 '멘타로', '도쿄야 홍대점', '라멘소'가 유명합니다. 멘타로는 혼밥석이 따로 마련돼 있어 혼자 방문하기 좋습니다.",
  "을지로에서는 '골목야키', '사카에정', '을지이자카야'가 분위기 좋습니다. 골목야키는 좁은 골목 안에 있어 분위기가 독특합니다.",
  "인스타 감성 브런치로는 '오전열시', '화이트라운지', '르포르마'를 추천합니다. 오전열시는 자연광이 잘 들어와 사진 맛집으로 유명합니다.",
];

export default function TypewriterSearch() {
  const [queryIdx, setQueryIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "showing" | "erasing">("typing");

  useEffect(() => {
    const query = QUERIES[queryIdx];

    if (phase === "typing") {
      if (displayed.length < query.length) {
        const t = setTimeout(() => setDisplayed(query.slice(0, displayed.length + 1)), 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("showing"), 1200);
        return () => clearTimeout(t);
      }
    }

    if (phase === "showing") {
      const t = setTimeout(() => setPhase("erasing"), 2000);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
        return () => clearTimeout(t);
      } else {
        setQueryIdx((i) => (i + 1) % QUERIES.length);
        setPhase("typing");
      }
    }
  }, [displayed, phase, queryIdx]);

  const isShowingResponse = phase === "showing";
  const responseText = RESPONSES[queryIdx];

  return (
    <div style={{ marginBottom: "16px" }}>
      {/* ChatGPT 스타일 채팅 창 */}
      <div style={{
        background: "#ffffff", border: "1px solid #e5e7eb",
        borderRadius: "12px", overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}>
        {/* 헤더 — ChatGPT 스타일 (회색 상단바 + 워드마크) */}
        <div style={{
          background: "#f9fafb", borderBottom: "1px solid #e5e7eb",
          padding: "10px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* OpenAI 스타일 원형 아이콘 (로고 비복제, 원 + SVG 패턴) */}
            <div style={{
              width: "22px", height: "22px", borderRadius: "50%",
              background: "#000",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {/* 꽃 모양 SVG — OpenAI 로고 비복제, 유사 추상 패턴 */}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1.5 C5 1.5 4 2.8 4.2 4.2 C2.8 4 1.5 5 1.5 6.5 C1.5 8 2.8 9 4.2 8.8 C4 10.2 5 11.5 6.5 11.5 C8 11.5 9 10.2 8.8 8.8 C10.2 9 11.5 8 11.5 6.5 C11.5 5 10.2 4 8.8 4.2 C9 2.8 8 1.5 6.5 1.5Z" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#111", letterSpacing: "-0.02em" }}>
              ChatGPT
            </span>
          </div>
          {/* 점 세 개 메뉴 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3px", padding: "2px 4px" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: "14px", height: "2px", background: "#9ca3af", borderRadius: "999px" }} />
            ))}
          </div>
        </div>

        {/* 채팅 영역 */}
        <div style={{ padding: "14px 12px 12px", background: "#fff" }}>
          {/* 사용자 메시지 */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
            <div style={{
              background: "#f4f4f4",
              borderRadius: "18px 18px 4px 18px",
              padding: "9px 14px", maxWidth: "84%",
            }}>
              <p style={{ fontSize: "13px", color: "#111", margin: 0, lineHeight: 1.5 }}>
                {displayed}
                {phase === "typing" && (
                  <span style={{
                    display: "inline-block", width: "2px", height: "13px",
                    background: "#111", marginLeft: "2px", verticalAlign: "middle",
                    animation: "blink 0.8s step-end infinite",
                  }} />
                )}
              </p>
            </div>
          </div>

          {/* ChatGPT 응답 */}
          <div style={{
            display: "flex", gap: "8px", alignItems: "flex-start",
            opacity: isShowingResponse ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}>
            {/* ChatGPT 아바타 — 검정 원 */}
            <div style={{
              width: "24px", height: "24px", borderRadius: "50%",
              background: "#000",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginTop: "1px",
            }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1.5 C5 1.5 4 2.8 4.2 4.2 C2.8 4 1.5 5 1.5 6.5 C1.5 8 2.8 9 4.2 8.8 C4 10.2 5 11.5 6.5 11.5 C8 11.5 9 10.2 8.8 8.8 C10.2 9 11.5 8 11.5 6.5 C11.5 5 10.2 4 8.8 4.2 C9 2.8 8 1.5 6.5 1.5Z" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "12.5px", color: "#374151", margin: 0, lineHeight: 1.65 }}>
                {responseText}
              </p>
            </div>
          </div>
        </div>
      </div>


      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
