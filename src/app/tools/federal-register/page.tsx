import { Metadata } from "next";
import { Container, Box, Text, Title, Flex, Group } from "@mantine/core";
import {
  getPresidentialDocuments,
  getAllDocs,
  getBySection,
  getByAgency,
  type FedRegDocumentResults,
} from "./actions";
import Link from "next/link";
import { Document } from "@/components/tools/fedreg";
import { PerPage, Paginate } from "@/components/pagination";
import SelectDoctype from "./select-doctype";
import SelectSection from "./select-section";
import SelectAgency from "./select-agency";

export const metadata: Metadata = {
  title: "Federal Register Tool",
  description: "This tool searches the US Federal Register for documents.",
};

interface QueryParams {
  page?: string;
  per_page?: string;
  doc_type?: string;
  section?: string;
  agency?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<QueryParams>;
}) {
  const { page, per_page, doc_type, section, agency } = await searchParams;

  const pageNum = page || "1";
  const perPage = per_page || "10";
  const docType = doc_type || "all";
  let data;

  if (docType === "presidential_document" || docType === undefined) {
    data = (await getPresidentialDocuments({
      per_page: perPage,
      page: pageNum,
    })) as FedRegDocumentResults;
  }

  if (docType === "section") {
    if (section) {
      data = (await getBySection({
        per_page: perPage,
        page: pageNum,
        section: section,
      })) as FedRegDocumentResults;
    }
  }

  if (docType === "agency") {
    if (agency) {
      data = (await getByAgency({
        per_page: perPage,
        page: pageNum,
        agency: agency,
      })) as FedRegDocumentResults;
    }
  }

  if (data === undefined) {
    data = (await getAllDocs({
      per_page: perPage,
      page: pageNum,
    })) as FedRegDocumentResults;
  }

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
    <Container>
      <Box>
        <Title order={1}>U.S. Federal Register Tool</Title>

        <Text c="dimmed" mb="md">
          From Presidential Orders to Rule Proposals by various agencies, this
          tool helps me keep track of the documents as they are published to the
          Federal Register to keep up with what&apos;s happening on Capital
          Hill.
        </Text>
      </Box>

      <Group justify="space-between" gap="sm" align="flex-start" mb="md">
        <Flex direction="column" gap="xs" w={300}>
          <SelectDoctype docType={docType} />
          {SecondarySelect()}
        </Flex>

        <Flex
          justify="flex-end"
          align="flex-end"
          gap="xs"
          mb="md"
          direction="column"
        >
          <PerPage perPage={perPage} />
          <Text c="dimmed">
            Showing {data?.results?.length || 0} of {data?.count || 0} documents
          </Text>
        </Flex>
      </Group>

      {data?.results?.map((doc, idx) => (
        <Document key={doc.document_number} document={doc} idx={idx} />
      ))}

      {data?.results?.length === 0 ||
        (data === undefined && (
          <Text c="dimmed" mt="xl">
            No documents found
          </Text>
        ))}

      <Paginate
        totalDocuments={data?.count || 0}
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
