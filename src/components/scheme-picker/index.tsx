"use client";
import { useEffect, useState } from "react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function SchemePicker() {
  const [schemeIcon, setSchemeIcon] = useState<React.ReactNode>(null);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setSchemeIcon(colorScheme === "dark" ? <IconSun /> : <IconMoon />);
  }, [colorScheme]);

  return (
    <ActionIcon
      variant="transparent"
      size="sm"
      aria-label="Toggle color scheme"
      title="Toggle color scheme"
      c="gray"
      onClick={toggleColorScheme}
    >
      {schemeIcon}
    </ActionIcon>
  );
}
