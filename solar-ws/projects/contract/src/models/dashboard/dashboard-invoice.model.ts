export interface DashboardInvoice {
    readonly date: string;
    readonly id: number;
    readonly totalAmount: number; // in currency unit
    readonly status: InvoiceStatus;


}

export type InvoiceStatus = 'in-process' | 'sent' |  'confirmed' | 'paid'| 'rejected';

/*

in-process => sent => confirmed => paid
                   => rejected

*/