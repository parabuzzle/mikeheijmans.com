"use client";
import { useState, useEffect } from "react";
import { Select, Box } from "@mantine/core";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export interface Agency {
  id: string;
  name: string;
  slug: string;
  short_name: string;
}

export default function SelectAgency() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    fetch("https://www.federalregister.gov/api/v1/agencies")
      .then((response) => response.json())
      .then((data) => {
        const agencyArray = [] as Agency[];
        const akey = [] as string[];
        const avalue = [] as string[];
        for (const agency of data) {
          if (akey.includes(agency.slug)) {
            continue;
          }
          if (avalue.includes(agency.name)) {
            continue;
          }
          avalue.push(agency.name);
          akey.push(agency.slug);

          agencyArray.push({
            id: agency.slug,
            name: agency.name,
            slug: agency.slug,
            short_name: agency.short_name,
          });

          setAgencies(agencyArray);
        }
      });
  }, []);

  return (
    <Box>
      <Select
        placeholder={agencies.length === 0 ? "Loading..." : "Select an Agency"}
        disabled={agencies.length === 0}
        data={agencies.map((agency) => ({
          value: agency.slug,
          label: agency.name,
        }))}
        searchable
        value={searchParams.get("agency")}
        onChange={(value) => {
          const qParams = new URLSearchParams();
          for (const [key, value] of searchParams) {
            qParams.set(key, value);
          }
          qParams.set("agency", value as string);
          qParams.set("page", "1");

          router.push(`${pathname}?${qParams.toString()}`);
        }}
      />
    </Box>
  );
}
