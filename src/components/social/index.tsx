import { Flex, ActionIcon } from "@mantine/core";
import { motion } from "motion/react";
import {
  IconBrandLinkedin,
  IconBrandBluesky,
  IconBrandGithub,
} from "@tabler/icons-react";
import type { MantineSize } from "@mantine/core";
import Contact from "@/components/contact";
import Link from "next/link";

export default function Social({
  visibleFrom,
}: Readonly<{ visibleFrom?: MantineSize }>) {
  return (
    <Flex
      gap="xs"
      justify="flex-end"
      align="center"
      visibleFrom={visibleFrom}
      direction="row"
      wrap="nowrap"
      mb="xl"
    >
      <Link href="https://www.linkedin.com/in/mheijmans/" target="_blank">
        <motion.div
          initial={{ opacity: 0, scale: 1.4 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", bounce: 0.6, duration: 1 }}
        >
          <ActionIcon
            radius="xl"
            variant="gradient"
            size="lg"
            title="LinkedIn"
            aria-label="mheijmans on LinkedIn"
          >
            <IconBrandLinkedin />
          </ActionIcon>
        </motion.div>
      </Link>

      <Link
        href="https://bsky.app/profile/heijmans.bsky.social"
        target="_blank"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.4 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ delay: 0.1, type: "spring", bounce: 0.6, duration: 1 }}
        >
          <ActionIcon
            radius="xl"
            size="lg"
            variant="gradient"
            title="Bluesky"
            aria-label="@heijmans on BlueSky"
          >
            <IconBrandBluesky />
          </ActionIcon>
        </motion.div>
      </Link>

      <Link href="https://github.com/parabuzzle" target="_blank">
        <motion.div
          initial={{ opacity: 0, scale: 1.4 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.6, duration: 1 }}
        >
          <ActionIcon
            radius="xl"
            size="lg"
            variant="gradient"
            title="Github"
            aria-label="parabuzzle on GitHub"
          >
            <IconBrandGithub />
          </ActionIcon>
        </motion.div>
      </Link>
      <motion.div
        initial={{ opacity: 0, scale: 1.4 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ delay: 0.3, type: "spring", bounce: 0.6, duration: 1 }}
      >
        <Contact />
      </motion.div>
    </Flex>
  );
}
