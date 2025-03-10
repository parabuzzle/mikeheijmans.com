import { Metadata } from "next";
import { Container, Box, Text, Title } from "@mantine/core";
import ClientRendered from "./client";

export const metadata: Metadata = {
  title: "Mike's Tools",
  description: "Various web-based tools that help me do things.",
};

export default function Page() {
  return (
    <Container>
      <Box>
        <Title order={1}>Tools</Title>

        <Text c="dimmed" mb="md">
          {metadata.description}
        </Text>
        <ClientRendered />
      </Box>
    </Container>
  );
}
