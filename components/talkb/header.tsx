import Link from "next/link";

interface HeaderProps {
  tickets?: number;
  showTickets?: boolean;
}

export default function Header({ tickets = 0, showTickets = false }: HeaderProps) {
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
      <Link href="/" style={{ textDecoration: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" }}>TalkB</span>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", marginBottom: "1px" }} />
          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink-mid)", letterSpacing: "-0.01em" }}>토크비</span>
        </div>
        <p style={{ fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", margin: "2px 0 0", letterSpacing: "0.01em" }}>
          NO.1 외식업 전문 AI노출 솔루션
        </p>
      </Link>

      {showTickets && (
        tickets > 0 ? (
          <span style={{
            fontSize: "12px", color: "var(--accent)", background: "var(--accent-soft)",
            padding: "6px 12px", borderRadius: "999px",
            border: "0.5px solid rgba(232,93,58,0.3)", fontWeight: 600,
            display: "inline-flex", alignItems: "center", gap: "5px",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
            진단권 {tickets}개
          </span>
        ) : (
          <span style={{
            fontSize: "12px", color: "var(--ink-muted)", background: "var(--bg-deep)",
            padding: "6px 12px", borderRadius: "999px",
            border: "1px solid var(--border)", fontWeight: 600,
          }}>
            진단권 0개
          </span>
        )
      )}
    </header>
  );
}
