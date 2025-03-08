"use client";
import {
  Group,
  Badge,
  Text,
  Card,
  Image,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import { JSX } from "react";
import Link from "next/link";

export interface ProjectCardData {
  title: string;
  description: string;
  active?: boolean;
  image: string;
  imageAlt?: string;
  links: {
    link: string;
    name: string;
    target?: string;
    icon?: JSX.Element;
  }[];
}

export function ProjectCard({ data }: { data: ProjectCardData }) {
  const { colorScheme } = useMantineColorScheme();

  const badge = data.active ? (
    <Badge color="blue">Active</Badge>
  ) : (
    <Badge color="pink">Not Active</Badge>
  );
  return (
    <Card
      bg={colorScheme === "dark" ? "dark" : "#efedff"}
      shadow="md"
      withBorder
    >
      <Card.Section>
        <Image src={data.image} height={160} alt={data.imageAlt} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{data.title}</Text>
        {badge}
      </Group>
      <Text size="sm" c="dimmed">
        {data.description}
      </Text>
      <Group gap="xs" mt="md">
        {data.links.map((link) => {
          return (
            <Link key={link.link} href={link.link} target={link.target}>
              <Button variant="light" size="compact-md">
                {link.name}
              </Button>
            </Link>
          );
        })}
      </Group>
    </Card>
  );
}
