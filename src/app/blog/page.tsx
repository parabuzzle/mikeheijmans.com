import { Container, Box, Text, Title } from "@mantine/core";

export default function Page() {
  return (
    <Container>
      <Box>
        <Title order={1}>Blog</Title>

        <Text c="dimmed" mb="md">
          I am easily distracted by all the cool things I get to do and I often
          forget to write blog posts. But when I do, they&apos;ll show up here.
        </Text>

        <Text mb="md">blog posts go here</Text>
      </Box>
    </Container>
  );
}
