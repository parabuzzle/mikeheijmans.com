"use server";
import Link from "next/link";
import { Text } from "@mantine/core";
import { headers } from "next/headers";

export default async function ReferrerHandler() {
  const headersList = await headers();
  const isBsky =
    headersList.get("referer") === "https://go.bsky.app/" ||
    headersList.get("referer") === "https://bsky.app/";

  if (!isBsky) {
    return null;
  }

  return (
    <Text c="dimmed" fs="italic" size="xs" mb="lg">
      Welcome Bluesky Friend! If I could ask a favor, could you please give me a
      follow? It would mean the world to me.{" "}
      <Link href="https://bsky.app/profile/heijmans.bsky.social">
        @heijmans.bsky.social
      </Link>
    </Text>
  );
}
