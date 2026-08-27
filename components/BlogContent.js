import React from "react";

// Helper to parse inline markdown: **bold**, *italic*, `code`, [links](url)
function parseInlineMarkdown(text) {
  if (!text) return "";

  // Strip leading markdown hashes if any got through
  let cleanText = text.replace(/^#{1,6}\s+/, "");

  const parts = [];
  let remaining = cleanText;
  let key = 0;

  // Regex matches: [link](url) | **bold** | *italic* | `code`
  const regex = /(\[(.*?)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)|\*\*(.*?)\*\*|\*(.*?)\*|`(.*?)`)/;

  while (remaining) {
    const match = remaining.match(regex);
    if (!match) {
      parts.push(remaining);
      break;
    }

    const index = match.index;
    if (index > 0) {
      parts.push(remaining.substring(0, index));
    }

    const fullMatch = match[0];
    if (fullMatch.startsWith("[") && match[2] && match[3]) {
      // Link [text](url)
      parts.push(
        <a
          key={`link-${key++}`}
          href={match[3]}
          target={match[3].startsWith("http") ? "_blank" : undefined}
          rel={match[3].startsWith("http") ? "noopener noreferrer" : undefined}
          style={{
            color: "#2563eb",
            fontWeight: 700,
            textDecoration: "underline",
            textUnderlineOffset: "3px"
          }}
        >
          {match[2]}
        </a>
      );
    } else if (fullMatch.startsWith("**") && match[4]) {
      // Bold **text**
      parts.push(
        <strong key={`bold-${key++}`} style={{ fontWeight: 800, color: "#0f172a" }}>
          {match[4]}
        </strong>
      );
    } else if (fullMatch.startsWith("*") && match[5]) {
      // Italic *text*
      parts.push(
        <em key={`em-${key++}`} style={{ fontStyle: "italic", color: "#334155" }}>
          {match[5]}
        </em>
      );
    } else if (fullMatch.startsWith("`") && match[6]) {
      // Inline code
      parts.push(
        <code
          key={`code-${key++}`}
          style={{
            background: "#f1f5f9",
            color: "#0f172a",
            padding: "0.2rem 0.45rem",
            borderRadius: "6px",
            fontSize: "0.9em",
            fontFamily: "monospace",
            fontWeight: 600
          }}
        >
          {match[6]}
        </code>
      );
    }

    remaining = remaining.substring(index + fullMatch.length);
  }

  return parts;
}

// Check if a line is a title or section heading (even without markdown #)
function isLikelyHeading(line, prevLineWasEmpty, nextLineIsShort) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (trimmed.length > 85) return false;
  if (trimmed.endsWith(".") && !/^\d+\.\s/.test(trimmed)) return false; // Sentences ending in period are not headings unless numbered
  
  // Starts with explicit Markdown hash
  if (/^#{1,4}\s+/.test(trimmed)) return true;

  // Numbered heading like "1. Title" or "10. Title"
  if (/^\d+\.\s+[A-Z0-9]/.test(trimmed) && trimmed.length < 75) return true;

  // Ends with colon like "Our services include:" or "Why choose us:"
  if (trimmed.endsWith(":") && trimmed.length < 70) return true;

  // Short title-cased sentence standing alone between paragraphs
  const words = trimmed.split(/\s+/);
  if (words.length >= 2 && words.length <= 10) {
    const isCapitalized = words.filter(w => /^[A-Z]/.test(w)).length >= Math.ceil(words.length * 0.6);
    if (isCapitalized && !trimmed.endsWith(",") && !trimmed.endsWith(";")) {
      return true;
    }
  }

  return false;
}

export function BlogContent({ content }) {
  if (!content) return null;

  const rawLines = content.split("\n");
  const elements = [];
  let currentList = null; // { type: 'ul' | 'ol', items: [] }
  let key = 0;

  function flushList() {
    if (!currentList) return;
    if (currentList.type === "ul") {
      elements.push(
        <ul
          key={`ul-${key++}`}
          style={{
            margin: "0.75rem 0 1.75rem",
            paddingLeft: "0",
            listStyle: "none",
            display: "grid",
            gap: "0.75rem"
          }}
        >
          {currentList.items.map((item, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                fontSize: "1.125rem",
                lineHeight: "1.8",
                color: "#1e293b",
                fontWeight: 500
              }}
            >
              <span
                style={{
                  color: "#2563eb",
                  fontWeight: 900,
                  fontSize: "1.15rem",
                  lineHeight: "1.6",
                  flexShrink: 0
                }}
              >
                ✓
              </span>
              <div style={{ flex: 1, color: "#1e293b" }}>{parseInlineMarkdown(item)}</div>
            </li>
          ))}
        </ul>
      );
    } else if (currentList.type === "ol") {
      elements.push(
        <ol
          key={`ol-${key++}`}
          style={{
            margin: "0.75rem 0 1.75rem",
            paddingLeft: "0",
            listStyle: "none",
            display: "grid",
            gap: "0.85rem"
          }}
        >
          {currentList.items.map((item, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.85rem",
                fontSize: "1.125rem",
                lineHeight: "1.8",
                color: "#1e293b",
                fontWeight: 500
              }}
            >
              <span
                style={{
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  fontWeight: 800,
                  fontSize: "0.88rem",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  border: "1px solid #bfdbfe"
                }}
              >
                {item.num || idx + 1}
              </span>
              <div style={{ flex: 1, color: "#1e293b" }}>{parseInlineMarkdown(item.text)}</div>
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  }

  let inListContext = false;

  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i];
    const trimmed = rawLine.trim();
    const prevLine = i > 0 ? rawLines[i - 1].trim() : "";
    const nextLine = i < rawLines.length - 1 ? rawLines[i + 1].trim() : "";

    // Empty lines
    if (!trimmed) {
      flushList();
      inListContext = false;
      continue;
    }

    // Explicit Markdown H1: "# Title"
    if (/^#\s+(.+)/.test(trimmed)) {
      flushList();
      inListContext = false;
      const titleText = trimmed.replace(/^#\s+/, "");
      elements.push(
        <h2
          key={`h1-${key++}`}
          style={{
            margin: "3rem 0 1.25rem",
            fontSize: "clamp(1.75rem, 3.4vw, 2.3rem)",
            fontWeight: 900,
            color: "#0f172a",
            lineHeight: 1.28,
            letterSpacing: "-0.025em"
          }}
        >
          {parseInlineMarkdown(titleText)}
        </h2>
      );
      continue;
    }

    // Explicit Markdown H2: "## Title"
    if (/^##\s+(.+)/.test(trimmed)) {
      flushList();
      inListContext = false;
      const titleText = trimmed.replace(/^##\s+/, "");
      elements.push(
        <h2
          key={`h2-${key++}`}
          style={{
            margin: "2.75rem 0 1.1rem",
            fontSize: "clamp(1.5rem, 2.9vw, 1.95rem)",
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.32,
            letterSpacing: "-0.02em"
          }}
        >
          {parseInlineMarkdown(titleText)}
        </h2>
      );
      continue;
    }

    // Explicit Markdown H3: "### Title"
    if (/^###\s+(.+)/.test(trimmed)) {
      flushList();
      inListContext = false;
      const titleText = trimmed.replace(/^###\s+/, "");
      elements.push(
        <h3
          key={`h3-${key++}`}
          style={{
            margin: "2.25rem 0 0.85rem",
            fontSize: "clamp(1.25rem, 2.4vw, 1.55rem)",
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.38,
            letterSpacing: "-0.015em"
          }}
        >
          {parseInlineMarkdown(titleText)}
        </h3>
      );
      continue;
    }

    // Explicit Markdown H4: "#### Title"
    if (/^####\s+(.+)/.test(trimmed)) {
      flushList();
      inListContext = false;
      const titleText = trimmed.replace(/^####\s+/, "");
      elements.push(
        <h4
          key={`h4-${key++}`}
          style={{
            margin: "1.85rem 0 0.6rem",
            fontSize: "1.2rem",
            fontWeight: 800,
            color: "#1e3a8a",
            lineHeight: 1.45
          }}
        >
          {parseInlineMarkdown(titleText)}
        </h4>
      );
      continue;
    }

    // Explicit Bullet list item: starts with -, *, •, or →
    if (/^([-*•→])\s+(.+)/.test(trimmed)) {
      const itemText = trimmed.replace(/^([-*•→])\s+/, "");
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(itemText);
      inListContext = true;
      continue;
    }

    // Numbered list item: "1. Some item description..."
    const numListMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
    if (numListMatch) {
      // If it's a short numbered title like "1. On-Page SEO"
      if (numListMatch[2].length < 60 && !numListMatch[2].endsWith(".")) {
        flushList();
        inListContext = false;
        elements.push(
          <h2
            key={`numhead-${key++}`}
            style={{
              margin: "2.75rem 0 1rem",
              fontSize: "clamp(1.45rem, 2.8vw, 1.85rem)",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.35
            }}
          >
            <span style={{ color: "#2563eb", marginRight: "0.45rem" }}>{numListMatch[1]}.</span>
            {parseInlineMarkdown(numListMatch[2])}
          </h2>
        );
        continue;
      }

      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push({ num: numListMatch[1], text: numListMatch[2] });
      inListContext = true;
      continue;
    }

    // Line ending with colon: e.g. "Our influencer marketing services include:"
    if (trimmed.endsWith(":") && trimmed.length < 80) {
      flushList();
      inListContext = true; // Signals that following short lines may be list items
      elements.push(
        <h3
          key={`colhead-${key++}`}
          style={{
            margin: "2rem 0 0.85rem",
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.4
          }}
        >
          {parseInlineMarkdown(trimmed)}
        </h3>
      );
      continue;
    }

    // If we are in a list context (after "Our services include:") and this is a short line without sentence punctuation, format as list item!
    if (inListContext && trimmed.length < 75 && !trimmed.endsWith(".") && !trimmed.endsWith("?")) {
      if (!currentList || currentList.type !== "ul") {
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(trimmed);
      continue;
    }

    // Auto-detect standalone section heading (e.g. "Complete Influencer Marketing Solutions in Surat")
    if (isLikelyHeading(trimmed, !prevLine, nextLine.length < 70)) {
      flushList();
      inListContext = false;
      elements.push(
        <h2
          key={`autohead-${key++}`}
          style={{
            margin: "2.75rem 0 1rem",
            fontSize: "clamp(1.45rem, 2.8vw, 1.85rem)",
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.35,
            letterSpacing: "-0.015em"
          }}
        >
          {parseInlineMarkdown(trimmed)}
        </h2>
      );
      continue;
    }

    // Blockquote: "> Quote text"
    if (/^>\s*(.+)/.test(trimmed)) {
      flushList();
      inListContext = false;
      const quoteText = trimmed.replace(/^>\s*/, "");
      elements.push(
        <blockquote
          key={`quote-${key++}`}
          style={{
            margin: "1.75rem 0",
            padding: "1.1rem 1.5rem",
            borderLeft: "4px solid #2563eb",
            background: "#f8fafc",
            borderRadius: "0 14px 14px 0",
            color: "#1e293b",
            fontSize: "1.125rem",
            fontStyle: "italic",
            lineHeight: "1.8"
          }}
        >
          {parseInlineMarkdown(quoteText)}
        </blockquote>
      );
      continue;
    }

    // Divider: "---" or "***"
    if (/^([-*_]){3,}$/.test(trimmed)) {
      flushList();
      inListContext = false;
      elements.push(
        <hr
          key={`hr-${key++}`}
          style={{
            margin: "2.75rem 0",
            border: "none",
            borderTop: "1px solid #e2e8f0"
          }}
        />
      );
      continue;
    }

    // Regular paragraph with high readability
    flushList();
    inListContext = false;
    elements.push(
      <p
        key={`p-${key++}`}
        style={{
          margin: "0 0 1.45rem",
          fontSize: "1.125rem",
          lineHeight: "1.9",
          color: "#1e293b",
          fontWeight: 450
        }}
      >
        {parseInlineMarkdown(trimmed)}
      </p>
    );
  }

  // Flush any remaining list
  flushList();

  return (
    <div
      className="blog-article-body"
      style={{
        fontSize: "1.125rem",
        color: "#1e293b",
        lineHeight: "1.9"
      }}
    >
      {elements}
    </div>
  );
}
