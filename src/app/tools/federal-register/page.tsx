import { Metadata } from "next";
import { Container, Box, Text, Title, Flex } from "@mantine/core";
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
import Filters from "./filters";

export const metadata: Metadata = {
  title: "U.S. Federal Register Tool",
  description: "This tool searches the U.S. Federal Register for documents.",
};

interface QueryParams {
  page?: string;
  per_page?: string;
  doc_type?: string;
  term?: string;
  section?: string;
  agency?: string;
  location?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<QueryParams>;
}) {
  const { page, per_page, doc_type, section, agency, term, location } =
    await searchParams;

  const pageNum = page || "1";
  const perPage = per_page || "10";
  const docType = doc_type || "all";
  let data;

  if (docType === "presidential_document" || docType === undefined) {
    data = (await getPresidentialDocuments({
      per_page: perPage,
      page: pageNum,
      term: term,
      location: location,
    })) as FedRegDocumentResults;
  }

  if (docType === "section") {
    if (section) {
      data = (await getBySection({
        per_page: perPage,
        page: pageNum,
        section: section,
        term: term,
        location: location,
      })) as FedRegDocumentResults;
    }
  }

  if (docType === "agency") {
    if (agency) {
      data = (await getByAgency({
        per_page: perPage,
        page: pageNum,
        agency: agency,
        term: term,
        location: location,
      })) as FedRegDocumentResults;
    }
  }

  if (data === undefined) {
    data = (await getAllDocs({
      per_page: perPage,
      page: pageNum,
      term: term,
      location: location,
    })) as FedRegDocumentResults;
  }

  return (
    <Container>
      <Box>
        <Title order={1}>U.S. Federal Register Tool</Title>

        <Text c="dimmed" mb="md">
          From Presidential Orders to Rule Proposals by various agencies, this
          tool helps you keep track of the documents as they are published to
          the Federal Register to keep up with what&apos;s happening on Capital
          Hill.
        </Text>
      </Box>

      <Filters
        docType={docType}
        term={term}
        location={location}
        data={data}
        perPage={perPage}
      />

      {data?.results?.map((doc, idx) => (
        <Document key={doc.document_number} document={doc} idx={idx} />
      ))}

      {data?.results?.length === 0 ||
        (data === undefined && (
          <Text c="dimmed" mt="xl">
            No documents found
          </Text>
        ))}
      <Flex align="center" justify="flex-end" mb="xl">
        <PerPage perPage={perPage} />
      </Flex>
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
