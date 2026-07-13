"use client";
import { Box, Text } from "@mantine/core";

export function About() {
  return (
    <Box>
      <Text mb="md" size="lg" fw={500}>
        I build intelligent hardware from silicon to cloud. I spent roughly
        twenty years on platform and infrastructure engineering at scale:
        Kubernetes, CI/CD, observability, and globally distributed teams. Now
        I also design the hardware underneath, from PCBs in Altium and ESP32
        firmware in C to the cloud platform that manages the fleet. Applied AI
        is the through-line: multi-agent coding pipelines, MCP servers that
        let agents drive real applications, and the observability to measure
        whether any of it actually works. Most engineers build one end of that
        stack; the interesting problems live in owning both.
      </Text>
    </Box>
  );
}
