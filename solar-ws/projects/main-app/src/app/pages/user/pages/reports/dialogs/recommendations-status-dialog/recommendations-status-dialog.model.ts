export interface RecommendationsStatusDialogInput {}

export interface RecommendationsStatusDialogOutput {
  readonly reportType: RecommendationsStatusReportType;
  readonly invoiceStatus: RecommendationsStatusInvoiceStatus;
  readonly dateType: RecommendationsStatusDateType;
  readonly fileType: RecommendationsStatusFileType;
  readonly fileName: string;
  readonly allCustomers: boolean;
  readonly fromDate: string;
  readonly toDate: string;
}

export const RECOMMENDATIONS_STATUS_OPTIONS = {
  reportTypes: {
    shortened: 'חשבוניות מקוצר',
    detailed: 'חשבוניות מפורט',
    grouped: 'ריכוז ללקוח',
  },
  invoiceStatuses: {
    all: 'כל החשבוניות',
    nipendoError: 'שגיאות ניפנדו',
    nipendoOk: 'קבלה בחברת חשמל תקינה',
  },
  dateTypes: {
    byInvoice: 'לפי תאריך חשבונית',
    byRecommendation: 'לפי תאריך המלצה',
  },
  fileType: {
    csv: 'CSV',
    excel: 'Excel',
  },
} as const;

export type RecommendationsStatusReportType =
  keyof typeof RECOMMENDATIONS_STATUS_OPTIONS.reportTypes;
export type RecommendationsStatusInvoiceStatus =
  keyof typeof RECOMMENDATIONS_STATUS_OPTIONS.invoiceStatuses;
export type RecommendationsStatusDateType =
  keyof typeof RECOMMENDATIONS_STATUS_OPTIONS.dateTypes;

export type RecommendationsStatusFileType =
  keyof typeof RECOMMENDATIONS_STATUS_OPTIONS.fileType;
