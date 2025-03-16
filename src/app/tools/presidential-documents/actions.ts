"use server";

export interface Agency {
  raw_name: string;
  name: string;
  id: number;
  url: string;
  json_url: string;
  parent_id: number | null;
  slug: string;
}

export interface PresidentialDocument {
  title: string;
  type: string;
  abstract?: string | null;
  document_number: string;
  html_url: string;
  pdf_url: string;
  public_inspection_pdf_url: string;
  publication_date: string;
  agencies: Agency[];
  excerpts?: string[] | null | string;
}

export interface PresidentialDocumentResults {
  count: number;
  description: string;
  total_pages?: number;
  next_page_url?: string;
  results?: PresidentialDocument[];
}

export const getPresidentialDocuments = async ({
  doc_type,
  per_page,
  page,
}: {
  doc_type?: string;
  per_page?: string;
  page?: string;
}): Promise<PresidentialDocumentResults | Error> => {
  const baseUrl = "https://www.federalregister.gov/api/v1/documents.json";
  const params = new URLSearchParams();

  params.append("per_page", per_page?.toString() || "10");
  if (page) {
    params.append("page", page.toString());
  }
  params.append("order", "newest");
  params.append("conditions[president][]", "donald-trump");
  if (doc_type) {
    params.append("conditions[presidential_document_type][]", doc_type);
  }

  const url = `${baseUrl}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    return Error("Failed to fetch presidential documents");
  }

  const data = (await response.json()) as PresidentialDocumentResults;
  return data;
};
