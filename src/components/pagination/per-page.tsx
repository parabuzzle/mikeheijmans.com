"use client";

import { useState, useEffect } from "react";
import { Flex, Select, Text } from "@mantine/core";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function PerPage({ perPage }: { perPage: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [perPage]);

  return (
    <Flex gap="xs" align="center">
      <Text>Results per page:</Text>
      <Select
        disabled={loading}
        value={perPage}
        w={75}
        onChange={(value) => {
          setLoading(true);
          const qParams = new URLSearchParams();
          for (const [key, value] of searchParams) {
            qParams.set(key, value);
          }
          qParams.set("page", "1");
          qParams.set("per_page", value as string);

          router.push(`${pathname}?${qParams.toString()}`);
        }}
        data={[
          { value: "10", label: "10" },
          { value: "25", label: "25" },
          { value: "50", label: "50" },
          { value: "100", label: "100" },
        ]}
      />
    </Flex>
  );
}
