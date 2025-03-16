"use client";
import { useState, useEffect } from "react";
import { Pagination, Flex } from "@mantine/core";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function Paginate({
  totalDocuments,
  pageNum,
  perPage,
}: {
  totalDocuments: number;
  pageNum: string;
  perPage: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(totalDocuments / parseInt(perPage));
  const updatePage = (page: number) => {
    const qParams = new URLSearchParams();
    for (const [key, value] of searchParams) {
      qParams.set(key, value);
    }
    qParams.set("page", page.toString());

    router.push(`${pathname}?${qParams.toString()}`);
  };

  useEffect(() => {
    setLoading(false);
  }, [pageNum, perPage]);

  return (
    <Flex justify="center" align="center" direction="column" gap="sm">
      <Pagination
        ta="center"
        size="sm"
        total={totalPages}
        disabled={loading}
        onChange={(page) => {
          setLoading(true);
          updatePage(page);
        }}
        value={parseInt(pageNum)}
        radius="xl"
      />
    </Flex>
  );
}
