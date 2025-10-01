import { DashboardData, DashboardInvoice, DashboardRecommend, DataPeriod } from "@contract";
import { MockDashboardRecord } from "../models/mock-dashboard-record";
import { average, choice, randInt, randomDateInPastYear, roundTo, skewLow, skewMid, sum } from "../utils/numeric";

const STATUSES = ['in-process', 'sent', 'confirmed', 'paid', 'rejected'] as const;
const CLEANERS = ['אורי כהן', 'טל לוי', 'רוני מזרחי', 'דנה פרידמן', 'יואל שמואלי'];


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
        recommendations: records.flatMap(r => r.recommendations),
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


function randomInvoice(idBase: number): DashboardInvoice {
  return {
    id: idBase + randInt(1, 1_000_000),
    date: randomDateInPastYear(),
    totalAmount: randInt(500, 30_000),
    status: choice(STATUSES),
  };
}

function randomRecommend(): DashboardRecommend {
  const date = randomDateInPastYear();
  const production = randInt(1000, 15000);

  // random amount, usually ~8000..20000, but sometimes more
  const amount = Math.round(5000 + skewMid() * 15000);

  // start date is usually beteen 3 - 6 weeks prior to 'date'
  const startDate = new Date(new Date(date).getTime() - (21 + Math.round(skewMid() * 21)) * 24 * 60 * 60 * 1000);

  // end date it usually 3-7 days before 'date'
  const endDate = new Date(new Date(date).getTime() - (3 + Math.round(skewMid() * 4)) * 24 * 60 * 60 * 1000);

  // code is usually in the format `dddd-ddddddddd` where the first 4 digits is the year of the date
  // and the rest is random digits
  const code = `${new Date(date).getFullYear()}-${randInt(100000000, 999999999)}`;



  return {
    code,
    date,
    production,
    amount,
    dateStart: startDate.toISOString(),
    dateEnd: endDate.toISOString(),
  };
}

function randomRecord(idBase: number): MockDashboardRecord {
  const invoiceCount = randInt(1, 5);

  // recommend count is between 0 and 2. Roughly in 30 records there should be 12 recommendations
  const recommendCount = (randInt(1, 30) <= 12) ? randInt(1, 2) : 0;

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
    recommendations: Array.from({ length: recommendCount }, randomRecommend),
    energy,
    daylightHours,
    revenue,
    efficiency,
  };
}


