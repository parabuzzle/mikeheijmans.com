import { Metadata } from "next";
import { Box, Text, Title } from "@mantine/core";
import { PostCard } from "@/components/blog/post-card";
import { listPosts } from "./actions";

export const metadata: Metadata = {
  title: "Blog",
  description: "Mike's personal blog posts.",
};

export default async function Page() {
  const posts = await listPosts();

  return (
    <Box>
      <Title order={1}>Blog</Title>

      <Text c="dimmed" mb="md">
        I am easily distracted by all the cool things I get to do and I often
        forget to write blog posts. But when I do, they&apos;ll show up here.
      </Text>

      <Box>
        {posts.length === 0 && (
          <Text c="dimmed">No posts to show right now.</Text>
        )}
        {posts.map((post, idx) => (
          <PostCard key={post.slug} post={post} delay={idx} />
        ))}
      </Box>
    </Box>
  );
}
