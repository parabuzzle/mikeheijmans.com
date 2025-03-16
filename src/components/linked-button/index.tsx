"use client";
import { Button } from "@mantine/core";
import type { ButtonProps } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function LinkedButton({
  href,
  buttonProps,
  target,
  children,
  disabled,
  icon,
}: Readonly<{
  href: string;
  buttonProps?: ButtonProps;
  target?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <Button
      disabled={disabled}
      rightSection={icon}
      variant="subtle"
      {...buttonProps}
      onMouseOver={(): void => {
        if (target === "_blank") {
          return;
        }
        router.prefetch(href);
      }}
      onClick={(e): void => {
        e.preventDefault();
        if (target === "_blank") {
          window.open(href, "_blank");
          return;
        }
        router.push(href);
      }}
    >
      <a
        href={disabled ? "#" : href}
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={(e): void => {
          e.preventDefault();
        }}
      >
        {children}
      </a>
    </Button>
  );
}
