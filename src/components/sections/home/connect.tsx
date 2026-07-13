"use client";
import { Box, Group, Text } from "@mantine/core";
import Contact from "@/components/contact";

export function Connect() {
  return (
    <Box>
      <Text mb="md" size="lg">
        Check out my projects to see what I&apos;ve been working on, read the
        blog for the details, and connect with me on social media to stay up
        to date with my latest work.
      </Text>
      <Group gap="sm" mb="md" wrap="nowrap" align="center">
        <Contact />
        <Text size="lg">
          I&apos;m open to select advisory and fractional engagements across
          platform engineering, embedded systems, and applied AI. If that
          sounds relevant, or you just want to talk shop, reach out.
        </Text>
      </Group>
    </Box>
  );
}
