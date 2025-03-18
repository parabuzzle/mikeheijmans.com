import { Container } from "@mantine/core";
import "./code.css";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}
