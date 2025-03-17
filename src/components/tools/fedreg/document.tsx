"use client";
import { motion } from "motion/react";
import {
  Text,
  Title,
  Box,
  Paper,
  Divider,
  Flex,
  Badge,
  Grid,
} from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import LinkedButton from "@/components/linked-button";
import type { FedRegDocument } from "@/app/tools/federal-register/actions";

export function Document({
  document,
  idx,
}: {
  document: FedRegDocument;
  idx: number;
}) {
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

          <Grid>
            <Grid.Col span={{ base: 12, xs: 7, sm: 8, md: 9 }}>
              <Box>
                <Text c="dimmed" size="md">
                  Type: {document.type}
                </Text>
                <Text c="dimmed" size="md">
                  Doc Number: {document.document_number}
                </Text>
                <Text c="dimmed" size="sm">
                  Published: {document.publication_date}
                </Text>
                <Box mt="xs">
                  <Text c="dimmed" size="xs" mb="xs">
                    Agencies:
                  </Text>
                  {document.agencies.map((agency) => {
                    // In some cases, the agency is not properly set.. skip those
                    if (!agency.id) return null;

                    return (
                      <Badge key={agency.id} p="xs" variant="light" mr="xs">
                        {agency.name}
                      </Badge>
                    );
                  })}
                </Box>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 5, sm: 4, md: 3 }}>
              <Flex justify="flex-end" align="center">
                <Box w={"100%"}>
                  <Flex
                    gap="xs"
                    justify="flex-end"
                    direction="column"
                    w={"100%"}
                  >
                    <LinkedButton
                      disabled={!document.html_url}
                      hidden={!document.html_url}
                      icon={<IconExternalLink size="1.2em" />}
                      href={document.html_url}
                      buttonProps={{
                        variant: "light",
                        justify: "space-between",
                      }}
                      target="_blank"
                    >
                      View Online
                    </LinkedButton>
                    <LinkedButton
                      icon={<IconExternalLink size="1.2em" />}
                      disabled={!document.pdf_url}
                      hidden={!document.pdf_url}
                      href={document.pdf_url}
                      buttonProps={{
                        variant: "light",
                        justify: "space-between",
                      }}
                      target="_blank"
                    >
                      View PDF
                    </LinkedButton>
                    <LinkedButton
                      hidden={!document.public_inspection_pdf_url}
                      icon={<IconExternalLink size="1.2em" />}
                      disabled={!document.public_inspection_pdf_url}
                      href={document.public_inspection_pdf_url}
                      buttonProps={{
                        variant: "light",
                        justify: "space-between",
                      }}
                      target="_blank"
                    >
                      Inspection Document
                    </LinkedButton>
                    <LinkedButton
                      hidden={!document.title.match("Sunshine Act")}
                      icon={<IconExternalLink size="1.2em" />}
                      href="https://www.acus.gov/sites/default/files/documents/17%20Government%20in%20the%20Sunshine%20Act%20Basics.pdf"
                      buttonProps={{
                        variant: "light",
                        justify: "space-between",
                      }}
                      target="_blank"
                    >
                      Sunshine Act Info
                    </LinkedButton>
                  </Flex>
                </Box>
              </Flex>
            </Grid.Col>
          </Grid>
          <Text mt="xl">{document.abstract}</Text>
        </Paper>
      </motion.div>
    </Box>
  );
}
