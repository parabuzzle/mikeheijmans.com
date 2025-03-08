import type { Metadata } from "next";
import { Container } from "@mantine/core";
import ClientRendered from "./client";

export const metadata: Metadata = {
  title: "Mike's Projects",
  description:
    "Various projects that Mike works on in his spare time. Many of these projects are open source and available on GitHub.",
};

export default function Page() {
  return (
    <Container>
      <ClientRendered />
    </Container>
  );
}
