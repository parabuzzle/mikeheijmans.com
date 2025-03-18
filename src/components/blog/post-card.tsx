"use client";
import { Paper, Title, Text, Divider, Flex } from "@mantine/core";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import type { Post } from "@/app/blog/actions";
import classes from "./styles.module.css";

export function PostCard({ post, delay }: { post: Post; delay?: number }) {
  const { title } = post.attributes;
  const { publishDate, preview } = post;

  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1, y: 0, x: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      transition={{
        delay: delay ? delay * 0.05 : 0,
        duration: 0.1,
        ease: "easeInOut",
      }}
    >
      <motion.div
        whileHover={{ x: -10, scale: 1.02 }}
        transition={{
          type: "spring",
          bounce: 0.4,
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        <a
          href={`/blog/post/${post.slug}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
          onClick={(e) => e.preventDefault()}
        >
          <Paper
            p="lg"
            radius="md"
            shadow="sm"
            mb="xl"
            className={classes.paper}
            onClick={() => router.push(`/blog/post/${post.slug}`)}
          >
            <Title order={4} style={{ marginBottom: 0 }}>
              {title}
            </Title>
            <Text c="dimmed" size="sm">
              {new Date(publishDate).toLocaleDateString()}
            </Text>
            <Divider color="violet" mb="md" />
            <Text>{preview}</Text>
            <Flex justify="flex-end">
              <Text size="sm">Read more...</Text>
            </Flex>
          </Paper>
        </a>
      </motion.div>
    </motion.div>
  );
}
