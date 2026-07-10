"use client";
import { motion } from "motion/react";
import { Anchor, Container, Box, Divider, Flex, Title } from "@mantine/core";
import type { Post } from "@/app/blog/actions";
import { PostCard } from "@/components/blog/post-card";
import {
  About,
  AppliedAI,
  Name,
  Management,
  FreeTime,
  Connect,
} from "@/components/sections/home";

const easing = [0, 0.71, 0.2, 1.01] as const;

function Section({
  id,
  title,
  delay,
  children,
}: {
  id: string;
  title?: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, duration: 0.7, ease: easing }}
      >
        {title && (
          <Title order={2} size="h3" mb="sm" c="violet.4">
            {title}
          </Title>
        )}
        {children}
      </motion.div>
    </section>
  );
}

export function HomePage({ posts = [] }: { posts?: Post[] }) {
  return (
    <Container>
      <Box>
        <Name />

        <motion.div
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: easing }}
        >
          <Divider color="violet" mb="xl" />
        </motion.div>

        <Section id="about" delay={0.15}>
          <About />
        </Section>

        <Section id="applied-ai" title="Applied AI" delay={0.3}>
          <AppliedAI />
        </Section>

        <Section id="management" title="Leadership" delay={0.45}>
          <Management />
        </Section>

        <Section id="free-time" title="Beyond the Keyboard" delay={0.6}>
          <FreeTime />
        </Section>

        {posts.length > 0 && (
          <Section id="writing" title="Recent Writing" delay={0.75}>
            <Box>
              {posts.map((post, idx) => (
                <PostCard key={post.slug} post={post} delay={idx} />
              ))}
              <Flex justify="flex-end" mb="md">
                <Anchor href="/blog">More on the blog...</Anchor>
              </Flex>
            </Box>
          </Section>
        )}

        <Section id="connect" delay={0.9}>
          <Connect />
        </Section>
      </Box>
    </Container>
  );
}
