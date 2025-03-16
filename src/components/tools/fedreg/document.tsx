"use client";
import { motion } from "motion/react";
import { Text, Title, Box, Paper, Divider, Group, Flex } from "@mantine/core";
import LinkedButton from "@/components/linked-button";
import { useViewportSize } from "@mantine/hooks";
import type { PresidentialDocument } from "@/app/tools/presidential-documents/actions";

export function Document({
  document,
  idx,
}: {
  document: PresidentialDocument;
  idx: number;
}) {
  const { width } = useViewportSize();
  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: 0, x: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        //whileHover={{ x: -10, scale: 1.02 }}
        transition={{
          type: "spring",
          bounce: 0.4,
          delay: idx * 0.03,
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        <Paper
          shadow="md"
          p="lg"
          mb="xl"
          radius="md"
          style={{ backgroundColor: "light-dark(#efedff, #000000)" }}
        >
          <Title order={3}>{document.title}</Title>
          <Divider color="violet" mb="md" />
          <Text mb="md">{document.abstract}</Text>
          <Group
            justify="space-between"
            align={document.abstract ? "flex-end" : "flex-start"}
          >
            <Box>
              <Text c="dimmed">{document.type}</Text>
              <Text c="dimmed" size="sm">
                Published: {document.publication_date}
              </Text>
            </Box>
            <Box w={width < 420 ? "100%" : "auto"}>
              <Flex gap="xs" justify="flex-end" direction="column">
                <LinkedButton
                  disabled={!document.html_url}
                  href={document.html_url}
                  buttonProps={{ variant: "light" }}
                  target="_blank"
                >
                  View Online
                </LinkedButton>
                <LinkedButton
                  disabled={!document.pdf_url}
                  href={document.pdf_url}
                  buttonProps={{ variant: "light" }}
                  target="_blank"
                >
                  View PDF
                </LinkedButton>
                <LinkedButton
                  disabled={!document.public_inspection_pdf_url}
                  href={document.public_inspection_pdf_url}
                  buttonProps={{ variant: "light" }}
                  target="_blank"
                >
                  Inspection Document
                </LinkedButton>
              </Flex>
            </Box>
          </Group>
        </Paper>
      </motion.div>
    </Box>
  );
}
