export default function Footer() {
  return (
    <footer style={{
      padding: "24px 20px 32px",
      borderTop: "1px solid var(--border)",
      textAlign: "center",
      marginTop: "8px",
    }}>
      <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: "0 0 4px" }}>
        © 2026 (주)티앤에스컴퍼니 · TalkB
      </p>
      <p style={{ fontSize: "12px", margin: 0 }}>
        <a href="#" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>개인정보 처리방침</a>
        {" · "}
        <a href="#" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>이용약관</a>
      </p>
    </footer>
  );
}
