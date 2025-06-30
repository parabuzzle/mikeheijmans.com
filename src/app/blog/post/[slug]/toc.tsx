"use client";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { useWindowScroll, useViewportSize } from "@mantine/hooks";
import { Affix, Box, Drawer, Button, Transition } from "@mantine/core";

export default function TableOfContents({ body }: { body: React.ReactNode }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [scroll] = useWindowScroll();
  const { width } = useViewportSize();

  const position = width / 2 - 65; // Center the button horizontally

  return (
    <Box>
      <Affix position={{ bottom: 20, left: position }}>
        <Transition transition="slide-up" mounted={scroll.y > 200}>
          {(transitionStyles) => (
            <Button variant="filled" style={transitionStyles} onClick={open}>
              Table of Contents
            </Button>
          )}
        </Transition>
      </Affix>
      <Button onClick={open} mb="md">
        Table of Contents
      </Button>
      <Drawer
        closeOnClickOutside
        closeOnEscape
        opened={opened}
        onClose={close}
        title="Table of Contents"
        padding="md"
        size="md"
      >
        {body}
      </Drawer>
    </Box>
  );
}
