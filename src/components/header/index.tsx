"use client";
import {
  Burger,
  Container,
  Group,
  Button,
  Box,
  Text,
  Drawer,
  Flex,
  useMantineColorScheme,
} from "@mantine/core";
import {
  //IconExternalLink,
  IconHome,
  IconTool,
  IconUserScreen,
  IconSun,
  //IconBallpen,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import SocialBar from "@/components/social";
import Link from "next/link";
import LinkedButton from "@/components/linked-button";
import SchemePicker from "@/components/scheme-picker";
import classes from "./header.module.css";
import React from "react";

const iconSize = "1.5em";

const links = [
  { link: "/", label: "Home", icon: <IconHome size={iconSize} /> },
  {
    link: "/projects",
    label: "Projects",
    target: "inline",
    icon: <IconUserScreen size={iconSize} />,
  },
  { link: "/tools", label: "Tools", icon: <IconTool size={iconSize} /> },
  //{
  //  link: "/blog",
  //  label: "Blog",
  //  target: "inline",
  //  icon: <IconBallpen size={iconSize} />,
  //},
];

export default function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();

  const items = links.map((link) => (
    <LinkedButton
      buttonProps={{ color: "#dcd6ff" }}
      href={link.link}
      key={link.label}
      target={link.target}
      icon={link.icon}
    >
      {link.label}
    </LinkedButton>
  ));

  const Burgeritems = links.map((link) => (
    <Box key={link.label} mb="sm">
      <Button
        variant="gradient"
        key={link.label}
        fullWidth
        justify="flex-start"
        leftSection={link.icon}
        onClick={(): void => {
          if (link.target === "_blank") {
            window.open(link.link, "_blank");
          } else {
            router.push(link.link);
          }
          close();
        }}
      >
        {link.label}
      </Button>
    </Box>
  ));

  const burgerSchemePicker = () => (
    <Box key="scheme" mb="sm">
      <Button
        variant="gradient"
        key="scheme"
        fullWidth
        justify="flex-start"
        leftSection={<IconSun size={iconSize} />}
        onClick={(): void => {
          toggleColorScheme();
        }}
      >
        {colorScheme === "dark" ? "Light Mode" : "Dark Mode"}
      </Button>
    </Box>
  );

  return (
    <Box>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
            }}
          >
            <Text
              size="2.5em"
              fw={900}
              c="#dcd6ff"
              style={{ fontFamily: "relation-one, sans-serif" }}
            >
              Mike Heijmans
            </Text>
          </Link>
          <Flex align="flex-end" visibleFrom="sm">
            {items}
            <Box ml="lg">
              <SchemePicker />
            </Box>
          </Flex>

          <Group gap="xs" hiddenFrom="sm">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              color="white"
              size="sm"
            />
          </Group>
          <Drawer
            offset={12}
            hiddenFrom="sm"
            radius="md"
            opened={opened}
            onClose={close}
            title={
              <Text fw={900} size="xl">
                Navigation
              </Text>
            }
          >
            {Burgeritems}
            {burgerSchemePicker()}

            <Box mt="xl">
              <SocialBar navClose={close} />
            </Box>
          </Drawer>
        </Container>
      </header>
      <Container>
        <SocialBar visibleFrom="sm" />
      </Container>
    </Box>
  );
}
