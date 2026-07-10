"use client";
import { Anchor, Box, List, Text } from "@mantine/core";

export function AppliedAI() {
  return (
    <Box>
      <Text mb="md" size="lg">
        AI isn&apos;t a spectator sport for me. I use it, build with it, and
        instrument it every day:
      </Text>
      <List mb="md" size="lg" spacing="sm">
        <List.Item>
          I run multi-agent development workflows where coding agents work
          across multiple repositories, negotiate API contracts with each
          other, and hand off work through Linear.
        </List.Item>
        <List.Item>
          I build MCP servers that connect agents to running applications,
          turning AI from a code generator into a developer that can test its
          own work.
        </List.Item>
        <List.Item>
          I instrument my AI usage with OpenTelemetry and make workflow
          decisions from real token and cost data, not vibes.
        </List.Item>
        <List.Item>
          I <Anchor href="/blog">write about all of it</Anchor>: context
          engineering, how attention bias shapes agent behavior, and what
          actually works in production.
        </List.Item>
      </List>
    </Box>
  );
}
