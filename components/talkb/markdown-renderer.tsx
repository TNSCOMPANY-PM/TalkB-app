"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--ink-mid)" }}>
      <style>{`
        .md-body h1 {
          font-size: 22px;
          font-weight: 800;
          color: var(--ink);
          margin: 0 0 8px;
          letter-spacing: -0.03em;
          line-height: 1.3;
        }
        .md-body h2 {
          font-size: 17px;
          font-weight: 800;
          color: var(--ink);
          margin: 32px 0 12px;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--accent);
          letter-spacing: -0.02em;
        }
        .md-body h3 {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          margin: 20px 0 8px;
        }
        .md-body p {
          margin: 0 0 12px;
          color: var(--ink-mid);
          font-size: 14px;
          line-height: 1.75;
        }
        .md-body strong {
          color: var(--ink);
          font-weight: 700;
        }
        .md-body ul, .md-body ol {
          margin: 0 0 12px;
          padding-left: 20px;
          color: var(--ink-mid);
        }
        .md-body li {
          margin-bottom: 5px;
          line-height: 1.65;
          font-size: 14px;
        }
        .md-body hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 28px 0;
        }
        .md-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0 20px;
          font-size: 13px;
          display: block;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .md-body th {
          background: var(--bg-deep);
          color: var(--ink);
          font-weight: 700;
          padding: 10px 12px;
          text-align: left;
          border: 1px solid var(--border);
          white-space: nowrap;
        }
        .md-body td {
          padding: 9px 12px;
          border: 1px solid var(--border);
          color: var(--ink-mid);
          vertical-align: top;
          line-height: 1.55;
        }
        .md-body tr:nth-child(even) td {
          background: var(--bg-soft);
        }
        .md-body a {
          color: var(--accent);
          text-decoration: none;
        }
        .md-body a:hover {
          text-decoration: underline;
        }
        .md-body blockquote {
          border-left: 3px solid var(--accent);
          margin: 0 0 12px;
          padding: 8px 14px;
          background: var(--bg-soft);
          border-radius: 0 var(--r-sm) var(--r-sm) 0;
          color: var(--ink-mid);
        }
      `}</style>
      <div className="md-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
