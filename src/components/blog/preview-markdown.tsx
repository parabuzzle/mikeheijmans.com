"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Text } from "@mantine/core";

// Renders post preview markdown safely inside a clickable card:
// links become plain text (no nested anchors), images are dropped,
// and headings render as bold text instead of huge titles.
export function PreviewMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <Text mb="xs">{children}</Text>,
        a: ({ children }) => <span>{children}</span>,
        img: () => null,
        h1: ({ children }) => (
          <Text fw={700} mb="xs">
            {children}
          </Text>
        ),
        h2: ({ children }) => (
          <Text fw={700} mb="xs">
            {children}
          </Text>
        ),
        h3: ({ children }) => (
          <Text fw={700} mb="xs">
            {children}
          </Text>
        ),
        h4: ({ children }) => (
          <Text fw={700} mb="xs">
            {children}
          </Text>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
