import { Box, Text } from "@mantine/core";
import LinkedInline from "../linked-inline";
import classes from "./styles.module.css";

export default function Footer() {
  return (
    <Box
      p="xl"
      ta="center"
      h="120px"
      className={classes.footer}
      style={{ position: "fixed", bottom: "0px", width: "100%", zIndex: -1 }}
    >
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
  );
}
