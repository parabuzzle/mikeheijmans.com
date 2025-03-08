"use client";
import { motion } from "motion/react";
import { Box, Text, Title, Avatar, Group } from "@mantine/core";

export function Name() {
  const easing = [0, 0.71, 0.1, 1.01];

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ ease: easing }}
      >
        <Text c="dimmed" size="lg">
          Hello there, my name is
        </Text>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 2, x: 100, y: -100 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 2, delay: 0.5, ease: easing }}
      >
        <Avatar
          style={{ float: "right", marginRight: "10px" }}
          hiddenFrom="sm"
          size="xl"
          src="/mike.png"
          alt="Mike Heijmans"
        />
      </motion.div>

      <Group gap="xl" justify="flex-start" align="center" mb="xl">
        <motion.div
          initial={{ opacity: 0, scale: 1, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1.5, ease: easing }}
        >
          <Title mb="xl" order={1} size="80px">
            Mike Heijmans
          </Title>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 2, x: 100, y: -100 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 2, delay: 0.5, ease: easing }}
        >
          <Avatar
            visibleFrom="sm"
            size="xl"
            src="/mike.png"
            alt="Mike Heijmans"
          />
        </motion.div>
      </Group>
    </Box>
  );
}
