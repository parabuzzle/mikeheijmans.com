"use client";
import { motion } from "motion/react";
import { Container, Box, Divider } from "@mantine/core";
import {
  About,
  Name,
  Management,
  FreeTime,
  Connect,
} from "@/components/sections/home";

const easing = [0, 0.71, 0.2, 1.01] as const;

export function HomePage() {
  return (
    <Container>
      <Box>
        <Name />

        <motion.div
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: easing }}
        >
          <Divider color="violet" mb="xl" />
        </motion.div>

        <section id="about">
          <motion.div
            initial={{ opacity: 0, scale: 1, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 2 }}
          >
            <About />
          </motion.div>
        </section>

        <section id="management">
          <motion.div
            initial={{ opacity: 0, scale: 1, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 2, duration: 2 }}
          >
            <Management />
          </motion.div>
        </section>

        <section id="free-time">
          <motion.div
            initial={{ opacity: 0, scale: 1, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 2 }}
          >
            <FreeTime />
          </motion.div>
        </section>

        <section id="connect">
          <motion.div
            initial={{ opacity: 0, scale: 1, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 3, duration: 2 }}
          >
            <Connect />
          </motion.div>
        </section>
      </Box>
    </Container>
  );
}
