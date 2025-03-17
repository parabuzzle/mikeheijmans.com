"use client";

import { useState, useEffect } from "react";
import { TextInput, Box, Loader, Tooltip } from "@mantine/core";
import { IconMap } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import classes from "./fedreg.module.css";

export default function Location({ location }: { location?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(location || "");
  const [debouncedTerm] = useDebouncedValue(searchTerm, 300);

  const handleSearch = (value: string) => {
    const qParams = new URLSearchParams();
    for (const [key, value] of searchParams) {
      if (key === "location") {
        continue;
      }

      qParams.set(key, value);
    }
    if (value !== "" && value !== undefined) {
      qParams.set("location", debouncedTerm);
    }
    qParams.set("page", "1");
    router.push(`${pathname}?${qParams.toString()}`);
  };

  useEffect(() => {
    handleSearch(debouncedTerm);
  }, [debouncedTerm]);

  useEffect(() => {
    setLoading(false);
  }, [location]);

  return (
    <Box w="100%">
      <Tooltip
        label="Accepts Zipcode, City, or State"
        openDelay={700}
        position="bottom-start"
      >
        <TextInput
          placeholder="Location"
          classNames={{ input: classes.input }}
          leftSection={loading ? <Loader size="xs" /> : <IconMap />}
          value={searchTerm}
          onChange={(event) => {
            setLoading(true);
            setSearchTerm(event.currentTarget.value);
          }}
        />
      </Tooltip>
    </Box>
  );
}
