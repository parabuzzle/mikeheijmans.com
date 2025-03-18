import { Metadata } from "next";
import { Box, Text, Title } from "@mantine/core";
//import { listPosts } from "./actions";

export const metadata: Metadata = {
  title: "Blog",
  description: "Mike's personal blog posts.",
};

export default async function Page() {
  //const posts = await listPosts();

  return (
    <Box>
      <Title order={1}>Blog</Title>

      <Text c="dimmed" mb="md">
        I am easily distracted by all the cool things I get to do and I often
        forget to write blog posts. But when I do, they&apos;ll show up here.
      </Text>

      <Text mb="md">blog posts go here</Text>
    </Box>
  );
}
