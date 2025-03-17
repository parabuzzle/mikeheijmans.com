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

export interface FedRegDocument {
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

export interface FedRegDocumentResults {
  count: number;
  description: string;
  total_pages?: number;
  next_page_url?: string;
  results?: FedRegDocument[];
}

export const getPresidentialDocuments = async ({
  per_page,
  page,
}: {
  per_page?: string;
  page?: string;
}): Promise<FedRegDocumentResults | Error> => {
  const baseUrl = "https://www.federalregister.gov/api/v1/documents.json";
  const params = new URLSearchParams();

  params.append("per_page", per_page?.toString() || "10");
  if (page) {
    params.append("page", page.toString());
  }
  params.append("order", "newest");
  params.append("conditions[president][]", "donald-trump");

  const url = `${baseUrl}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    return Error("Failed to fetch presidential documents");
  }

  const data = (await response.json()) as FedRegDocumentResults;
  return data;
};

export const getBySection = async ({
  per_page,
  page,
  section,
}: {
  per_page?: string;
  page?: string;
  section: string;
}): Promise<FedRegDocumentResults | Error> => {
  const baseUrl = "https://www.federalregister.gov/api/v1/documents.json";
  const params = new URLSearchParams();

  params.append("per_page", per_page?.toString() || "10");
  if (page) {
    params.append("page", page.toString());
  }
  params.append("order", "newest");
  params.append("conditions[sections][]", section);

  const url = `${baseUrl}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    return Error("Failed to fetch documents by section");
  }

  const data = (await response.json()) as FedRegDocumentResults;
  return data;
};

export const getAllDocs = async ({
  per_page,
  page,
}: {
  per_page?: string;
  page?: string;
}): Promise<FedRegDocumentResults | Error> => {
  const baseUrl = "https://www.federalregister.gov/api/v1/documents.json";
  const params = new URLSearchParams();

  params.append("per_page", per_page?.toString() || "10");
  if (page) {
    params.append("page", page.toString());
  }
  params.append("order", "newest");

  const url = `${baseUrl}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    return Error("Failed to fetch documents");
  }

  const data = (await response.json()) as FedRegDocumentResults;
  return data;
};

export const getByAgency = async ({
  per_page,
  page,
  agency,
}: {
  per_page?: string;
  page?: string;
  agency: string;
}): Promise<FedRegDocumentResults | Error> => {
  const baseUrl = "https://www.federalregister.gov/api/v1/documents.json";
  const params = new URLSearchParams();

  params.append("per_page", per_page?.toString() || "10");
  if (page) {
    params.append("page", page.toString());
  }
  params.append("order", "newest");
  params.append("conditions[agencies][]", agency);

  const url = `${baseUrl}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    return Error("Failed to fetch documents by agency");
  }

  const data = (await response.json()) as FedRegDocumentResults;
  return data;
};
