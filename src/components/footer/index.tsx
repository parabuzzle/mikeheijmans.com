"use client";
import { Affix, Box, Text, useMantineColorScheme } from "@mantine/core";
import LinkedInline from "../linked-inline";

export default function Footer() {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Affix bottom={0} left={0} zIndex={1} style={{ width: "100%" }}>
      <Box p="xl" ta="center" bg={colorScheme === "dark" ? "dark" : "#efedff"}>
        This site is built using{" "}
        <LinkedInline href="https://nextjs.org" target="_blank">
          Next.js
        </LinkedInline>
        ,{" "}
        <LinkedInline href="https://motion.dev/" target="_blank">
          Motion
        </LinkedInline>
        , and{" "}
        <LinkedInline href="https://mantine.dev" target="_blank">
          Mantine
        </LinkedInline>{" "}
        running on{" "}
        <LinkedInline href="https://vercel.com" target="_blank">
          Vercel
        </LinkedInline>
        . The source code is available on{" "}
        <LinkedInline
          href="https://github.com/parabuzzle/mikeheijmans.com"
          target="_blank"
        >
          GitHub
        </LinkedInline>
        .
        <Text mt="md" size="sm">
          &copy; {new Date().getFullYear()} Michael Heijmans
        </Text>
      </Box>
    </Affix>
  );
}
