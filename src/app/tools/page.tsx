import { Container, Box, Text, Title } from "@mantine/core";

export default function Page() {
  return (
    <Container>
      <Box>
        <Title order={1}>Tools</Title>

        <Text c="dimmed" mb="md">
          Various tools that I&apos;ve built over the years to help me with my
          projects.
        </Text>

        <Text mb="md">tools go here</Text>
      </Box>
    </Container>
  );
}
