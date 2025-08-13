import { MockCompany } from "../models/mock-company";

export const MOCK_COMPANIES: MockCompany[] = [
  {
    "id": "solar",
    "displayName": "סולר אנרגיה בע\"מ"
  },
  {
    "id": "soleg",
    "displayName": "סולג אנרגיה ירוקה"
  },
  {
    "id": "greentech",
    "displayName": "גרין טק אנרגיה מתחדשת"
  },
  {
    "id": "sunpower",
    "displayName": "סאן פאוור פתרונות סולאריים"
  },
  {
    "id": "brightfuture",
    "displayName": "ברייט פיוצ'ר אנרגיה סולארית"
  },
  {
    "id": "helios",
    "displayName": "הליאוס מערכות אנרגיה"
  }
];

export const MOCK_COMPANY_MAP: Record<string, MockCompany> = 
  Object.fromEntries(MOCK_COMPANIES.map(company => [company.id, company]));
