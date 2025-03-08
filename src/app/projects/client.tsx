"use client";
import { Box, Text, Title, SimpleGrid } from "@mantine/core";
import { motion } from "motion/react";
import { ProjectCard } from "@/components/projects";
import Projects from "./projects";

export default function ClientRendered() {
  const projectCards = () => {
    return Projects.map((project, idx) => {
      return (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, scale: 1.5, y: -200 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.4, ease: "easeInOut" }}
        >
          <ProjectCard key={project.title} data={project} />
        </motion.div>
      );
    });
  };

  return (
    <Box>
      <Title order={1}>Projects</Title>

      <Text c="dimmed" mb="xl">
        Various projects I work on in my spare time. Many of these projects are
        open source and available on GitHub.
      </Text>

      <SimpleGrid
        type="container"
        cols={{ base: 1, "500px": 2, "768px": 3 }}
        spacing={{ base: 10, "768px": "md" }}
      >
        {projectCards()}
      </SimpleGrid>
    </Box>
  );
}
