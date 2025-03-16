import { Metadata } from "next";
import { Container, Box, Text, Title, Flex } from "@mantine/core";
import {
  getPresidentialDocuments,
  PresidentialDocumentResults,
} from "./actions";
import Link from "next/link";
import { Document } from "@/components/tools/fedreg";
import { PerPage, Paginate } from "@/components/pagination";

export const metadata: Metadata = {
  title: "Presidential Documents",
  description:
    "This tool searches the Federal Register for presidential documents.",
};

interface QueryParams {
  page?: string;
  per_page?: string;
  doc_type?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<QueryParams>;
}) {
  const { page, per_page, doc_type } = await searchParams;

  const pageNum = page || "1";
  const perPage = per_page || "10";

  const data = (await getPresidentialDocuments({
    doc_type,
    per_page: perPage,
    page: pageNum,
  })) as PresidentialDocumentResults;

  return (
    <Container>
      <Box>
        <Title order={1}>Presidential Documents</Title>

        <Text c="dimmed" mb="md">
          I found that I&apos;ve been struggling to keep up with all the things
          coming out of the Executive Office lately so I built this tool to help
          me keep track of the documents as they are published to the{" "}
          <Link href="https://www.federalregister.gov" target="_blank">
            Federal Register.
          </Link>
        </Text>
      </Box>

      <Flex
        justify="flex-end"
        align="flex-end"
        gap="xs"
        mb="md"
        direction="column"
      >
        <PerPage perPage={perPage} />
        <Text c="dimmed">
          Showing {data.results?.length} of {data.count} documents
        </Text>
      </Flex>

      {data.results?.map((doc, idx) => (
        <Document key={doc.document_number} document={doc} idx={idx} />
      ))}

      <Paginate
        totalDocuments={data.count}
        perPage={perPage}
        pageNum={pageNum}
      />
      <Flex align="center" justify="center" mt="xl">
        <Text size="sm">
          Powered by the{" "}
          <Link
            href="https://www.federalregister.gov/developers/documentation/api/v1"
            target="_blank"
          >
            Federal Register API
          </Link>
        </Text>
      </Flex>
    </Container>
  );
}
