"use client";
import { Text, Flex, Grid, Box } from "@mantine/core";

import SelectDoctype from "./select-doctype";
import SelectSection from "./select-section";
import SelectAgency from "./select-agency";
import Search from "./search";
import { PerPage } from "@/components/pagination";
import Location from "./location";
import type { FedRegDocumentResults } from "./actions";

export default function Filters({
  docType,
  term,
  location,
  data,
  perPage,
}: {
  docType: string;
  term?: string;
  location?: string;
  data: FedRegDocumentResults;
  perPage: string;
}) {
  const SecondarySelect = () => {
    if (docType === "section") {
      return <SelectSection />;
    }
    if (docType === "agency") {
      return <SelectAgency />;
    }
    return;
  };

  return (
    <Box>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
          <Flex direction="column" gap="xs">
            <SelectDoctype docType={docType} />
            {SecondarySelect()}
          </Flex>
        </Grid.Col>
        <Grid.Col offset={{ base: 0, sm: 4 }} span={{ base: 12, xs: 6, sm: 4 }}>
          <Flex
            justify="flex-end"
            align="flex-end"
            gap="xs"
            mb="md"
            direction="column"
          >
            <Search term={term} />
            <Location location={location} />
          </Flex>
        </Grid.Col>
      </Grid>
      <Flex
        visibleFrom="sm"
        justify="space-between"
        align="flex-end"
        mt="md"
        mb="sm"
      >
        <PerPage perPage={perPage} />

        <Text c="dimmed">
          Showing {data?.results?.length || 0} of {data?.count || 0} documents
        </Text>
      </Flex>
      <Flex hiddenFrom="sm" justify="flex-end" mt="xs" mb="sm" align="flex-end">
        <Text c="dimmed">
          Showing {data?.results?.length || 0} of {data?.count || 0} documents
        </Text>
      </Flex>
    </Box>
  );
}
