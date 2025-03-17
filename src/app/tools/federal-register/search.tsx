"use client";

import { useState, useEffect } from "react";
import { TextInput, Box, Loader } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import classes from "./fedreg.module.css";

export default function Search({ term }: { term?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(term || "");
  const [debouncedTerm] = useDebouncedValue(searchTerm, 300);

  const handleSearch = (value: string) => {
    const qParams = new URLSearchParams();
    for (const [key, value] of searchParams) {
      if (key === "term") {
        continue;
      }

      if (key === "page") {
        continue;
      }

      qParams.set(key, value);
    }
    if (value !== "" && value !== undefined) {
      qParams.set("term", debouncedTerm);
    }
    if (
      searchParams.get("page") &&
      (searchParams.get("page") as string) > "1"
    ) {
      qParams.set("page", "1");
    }
    router.push(`${pathname}?${qParams.toString()}`);
  };

  useEffect(() => {
    handleSearch(debouncedTerm);
  }, [debouncedTerm]);

  useEffect(() => {
    setLoading(false);
  }, [term]);

  return (
    <Box w="100%">
      <TextInput
        placeholder="Full Text Search"
        leftSection={loading ? <Loader size="xs" /> : <IconSearch />}
        value={searchTerm}
        classNames={{ input: classes.input }}
        onChange={(event) => {
          setLoading(true);
          setSearchTerm(event.currentTarget.value);
        }}
      />
    </Box>
  );
}
