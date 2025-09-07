import { DashboardData, DashboardInvoice, DashboardWash, DataPeriod } from "@contract";
import { MockDashboardRecord } from "../models/mock-dashboard-record";
import { average, sum } from "../utils/numeric";

export const MOCK_RECORDS: MockDashboardRecord[] = Array.from({ length: 500 }, (_, i) =>
  randomRecord(i * 10),
);


export function getDataForSiteForPeriod(siteId: number, period: DataPeriod): DashboardData {
    const { periodStart, periodLength } = getDateAndPeriodLength(period);
    const records = getMockDashboardRecords(siteId, periodStart, periodLength);
    return {
        totals: {
            daylightHoursAvg: average(records.map(r => r.daylightHours)),
            efficiency: average(records.map(r => r.efficiency)),
            totalEnergy: sum(records.map(r => r.energy)),
            totalRevenue: sum(records.map(r => r.revenue)),
        }, 
        siteId, 
        period, 
        invoices: records.flatMap(r => r.invoices),
        washes: records.flatMap(r => r.washes),
    }
    // 
}

export function getDateAndPeriodLength(period: DataPeriod): { periodStart: string, periodLength: number } {
    const now = new Date();
    let periodStart: Date;
    let periodLength: number;
    switch (period) {
        case 'today': 
            periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            periodLength = 1;
            break;
        case 'this-month': 
            periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
            periodLength = now.getDate();
            break;
        case 'last-month': 
            periodStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            periodLength = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            break; 
    }
    return { periodStart: periodStart.toISOString(), periodLength };           
}

export function getMockDashboardRecords(siteId: number, periodStart: string, periodLength: number): MockDashboardRecord[] {
    const index = getHashIndex(siteId, periodStart);

    // return an array of MockDashboardRecord items starting from index, and collection periodLength Items
    // notice that if index + periodLength exceeds the length of MOCK_RECORDS, it will wrap around to the start
    const records: MockDashboardRecord[] = [];
    for (let i = 0; i < periodLength; i++) {
        records.push(MOCK_RECORDS[(index + i) % MOCK_RECORDS.length]);
    }
    return records;
}

export function getHashIndex(siteId: number, periodStart: string) {
    const input = `${siteId}|${new Date(periodStart).toISOString()}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0; // unsigned 32-bit
  }
  return hash % 500;
}

// Generate 500 MockDashboardRecord items per your rules
const STATUSES = ['in-process', 'sent', 'confirmed', 'paid', 'rejected'] as const;
const CLEANERS = ['אורי כהן', 'טל לוי', 'רוני מזרחי', 'דנה פרידמן', 'יואל שמואלי'];

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const choice = <T,>(arr: readonly T[]) => arr[randInt(0, arr.length - 1)];
const roundTo = (n: number, step: number) => Math.round(n / step) * step;
const randomDateInPastYear = () => {
  const now = Date.now();
  const past = now - 365 * 24 * 60 * 60 * 1000;
  return new Date(randInt(past, now)).toISOString();
};

// Skewed helper (0..1), centered-ish for efficiency, lower-biased for revenue
const skewMid = () => (Math.random() + Math.random()) / 2; // ~triangular(0.5)
const skewLow = () => Math.random() ** 2;

function randomInvoice(idBase: number): DashboardInvoice {
  return {
    id: idBase + randInt(1, 1_000_000),
    date: randomDateInPastYear(),
    totalAmount: randInt(500, 30_000),
    status: choice(STATUSES),
  };
}

function randomWash(): DashboardWash {
  return {
    date: randomDateInPastYear(),
    cleaer: choice(CLEANERS), // per your interface: "cleaer"
    totalCost: randInt(2000, 4000),
  };
}

function randomRecord(idBase: number): MockDashboardRecord {
  const invoiceCount = randInt(1, 5);
  const washCount = randInt(1, 3);

  // energy 100..1000, nearest 50
  const energy = roundTo(randInt(100, 1000), 50);

  // daylightHours 8..12, nearest 0.5
  const daylightHours = roundTo(8 + Math.random() * 4, 0.5);

  // revenue usually 20..1000, bias lower a bit
  const revenue = Math.round(20 + skewLow() * (1000 - 20));

  // efficiency < 1, usually ~0.05..0.5, round 0.01
  const effRaw = 0.02 + skewMid() * 0.78; // 0.02..0.8, centered near ~0.41
  const efficiency = Math.min(0.99, Math.max(0.01, Math.round(effRaw * 100) / 100));

  return {
    invoices: Array.from({ length: invoiceCount }, () => randomInvoice(idBase)),
    washes: Array.from({ length: washCount }, randomWash),
    energy,
    daylightHours,
    revenue,
    efficiency,
  };
}


