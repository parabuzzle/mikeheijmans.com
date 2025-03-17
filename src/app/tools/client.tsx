"use client";
import { Box, Text, Title, Paper, Divider, Group } from "@mantine/core";
import { motion } from "motion/react";
import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

export default function ClientRendered() {
  return (
    <Box>
      <motion.div
        key="trade-calculator"
        initial={{ opacity: 0, scale: 1, y: 0, x: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        whileHover={{ x: -10, scale: 1.02 }}
        transition={{
          type: "spring",
          bounce: 0.4,
          delay: 0 * 0.1,
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        <Link
          href="/tools/risk-reward"
          style={{ textDecoration: "none", color: "light-dark(#000, #ffff)" }}
        >
          <Paper
            mb="md"
            p="md"
            shadow="md"
            radius="md"
            style={{ backgroundColor: "light-dark(#efedff, #000000)" }}
          >
            <Group gap="sm">
              <Title order={4}>Trade Calculator</Title>
              <IconExternalLink size="1.5em" />
            </Group>
            <Divider mb="sm" color="violet" />
            <Text c="dimmed">
              This is a little tool I built years ago to help caluculate a
              trading plan using a risk:reward ratio.
            </Text>
            <Text mt="lg">
              The idea is that if you have a risk to reward ratio above 1:2 you
              you can be profitable even if you are right less than 50% of the
              time.
            </Text>
            <Text mt="xs" mb="xl">
              As an example, if the risk to reward is 1:3, you can be right only
              25% of the time to break even because your winners are 3 times
              bigger than your losers. You, of course, need to find the
              opportunities that give you this edge. The calculator helps me
              figure out if the required upside sell price is realistic and
              helps me plan a more disciplined exit strategy.
            </Text>
          </Paper>
        </Link>
      </motion.div>
      <motion.div
        key="pres-docs"
        initial={{ opacity: 0, scale: 1, y: 0, x: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        whileHover={{ x: -10, scale: 1.02 }}
        transition={{
          type: "spring",
          bounce: 0.4,
          delay: 1 * 0.1,
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        <Link
          href="/tools/federal-register"
          style={{ textDecoration: "none", color: "light-dark(#000, #ffff)" }}
        >
          <Paper
            mb="md"
            p="md"
            shadow="md"
            radius="md"
            style={{ backgroundColor: "light-dark(#efedff, #000000)" }}
          >
            <Group gap="sm">
              <Title order={4}>U.S. Federal Register Tool</Title>
              <IconExternalLink size="1.5em" />
            </Group>
            <Divider mb="sm" color="violet" />
            <Text c="dimmed">
              This tool searches the US Federal Register for documents.
            </Text>
            <Text mt="lg" mb="xl">
              From Presidential Orders to Rule Proposals by various agencies,
              this tool helps me keep track of the documents as they are
              published to the Federal Register to keep up with what&apos;s
              happening on Capital Hill.
            </Text>
          </Paper>
        </Link>
      </motion.div>
    </Box>
  );
}
