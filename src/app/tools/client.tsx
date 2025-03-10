"use client";
import { Box, Text, Title, Paper, Divider } from "@mantine/core";
import { motion } from "motion/react";
import Link from "next/link";

export default function ClientRendered() {
  return (
    <Box>
      <motion.div
        key="trade-calculator"
        initial={{ opacity: 0, scale: 1, y: 0, x: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
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
            p="md"
            shadow="xs"
            radius="md"
            style={{ backgroundColor: "light-dark(#efedff, #000000)" }}
          >
            <Title order={4}>Trade Calculator</Title>
            <Divider mb="sm" />
            <Text c="dimmed">
              This is a little tool I built years ago to help caluculate a
              trading plan using a risk:reward ratio.
            </Text>
            <Text mt="xl">
              The idea is that if you have a risk to reward ratio above 1:2 you
              you can be profitable even if you are right less than 50% of the
              time.
            </Text>
            <Text mt="xs" mb="xl">
              As an example, if the risk to reward is 1:3, you can be right only
              25% of the time and still be profitable because your winners are 3
              times bigger than your losers. You, of course, need to find the
              opportunities that give you this edge. The calculator helps me
              figure out if the required upside sell price is realistic and
              helps me plan a more disciplined exit strategy.
            </Text>
          </Paper>
        </Link>
      </motion.div>
    </Box>
  );
}
