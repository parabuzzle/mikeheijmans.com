"use client";

import { Select, Box } from "@mantine/core";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import classes from "./fedreg.module.css";

const sections = [
  "business-and-industry",
  "environment",
  "health-and-public-welfare",
  "money",
  "science-and-technology",
  "world",
];

export default function SelectSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Box>
      <Select
        placeholder="Select a Section"
        classNames={{ input: classes.input, dropdown: classes.input }}
        data={sections.map((section) => ({
          value: section,
          label: section.replace(/-/g, " "),
        }))}
        value={searchParams.get("section")}
        onChange={(value) => {
          const qParams = new URLSearchParams();
          for (const [key, value] of searchParams) {
            qParams.set(key, value);
          }
          qParams.set("section", value as string);
          qParams.set("page", "1");

          router.push(`${pathname}?${qParams.toString()}`);
        }}
      />
    </Box>
  );
}
