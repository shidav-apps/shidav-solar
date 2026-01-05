import { MockCustomer } from '../models/mock-customer';

export const MOCK_CUSTOMERS: MockCustomer[] = [
  {
    "id": "ashdot-yakov",
    "displayName": "אשדות יעקב"
  },
  {
    "id": "sde-eliyahu",
    "displayName": "מושב שדה אליהו"
  },
  {
    "id": "mopshe-amiad",
    "displayName": "משה עמיאד"
  },
  {
    "id": "pitriot",
    "displayName": "פטריות הכפר"
  },
  {
    "id": "kfar-mazon",
    "displayName": "כפר מזון"
  },
  {
    "id": "shdemot-gan",
    "displayName": "שדות גן"
  },
  {
    "id": "nativ-lamed",
    "displayName": "נתיב למד"
  },
  {
    "id": "hagal-gadol",
    "displayName": "הגל הגדול"
  },
  {
    "id": "meir-cohen",
    "displayName": "מאיר כהן"
  },
  {
    "id": "oref-hadash",
    "displayName": "עוף חדש"
  },
  {
    "id": "tzur-yaakov",
    "displayName": "צור יעקב"
  },
  {
    "id": "beit-or",
    "displayName": "בית אור"
  }
];

export const MOCK_CUSTOMER_MAP: Record<string, MockCustomer> = 
  Object.fromEntries(MOCK_CUSTOMERS.map(customer => [customer.id, customer]));
