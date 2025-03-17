"use client";

import { Select, Box } from "@mantine/core";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SelectDoctype({ docType }: { docType: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <Box>
      <Select
        allowDeselect={false}
        data={[
          { value: "all", label: "All Documents" },
          { value: "presidential_document", label: "Presidential Documents" },
          { value: "section", label: "By Section" },
          { value: "agency", label: "By Agency" },
        ]}
        value={docType}
        onChange={(value) => {
          const qParams = new URLSearchParams();
          //for (const [key, value] of searchParams) {
          // qParams.set(key, value);
          //}
          if (value !== "all") {
            qParams.set("doc_type", value as string);
          }
          if (
            searchParams.get("page") &&
            (searchParams.get("page") as string) > "1"
          ) {
            qParams.set("page", "1");
          }

          router.push(`${pathname}?${qParams.toString()}`);
        }}
      />
    </Box>
  );
}
