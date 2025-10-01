import { DashboardInvoice, InvoiceStatus } from "@contract";

const statusLabels: Record<InvoiceStatus, string> = {
    'confirmed': 'חשבונית אושרה',
    'in-process': 'חשבונית בטיפול',
    'paid': 'חשבונית שולמה',
    'rejected': 'חשבונית נדחתה',
    'sent': 'חשבונית נשלחה'
}

const statusIcons: Record<InvoiceStatus, string> = {
    'confirmed': 'task_alt',
    'rejected': 'info', 
    'in-process': 'access_time',
    'paid': 'order_approve',
    'sent': 'mark_email_read'
}


export interface DashboardInvoiceVm {
    readonly date: string;
    readonly id: number;
    readonly totalAmount: number;
    readonly statusLabel: string;
    readonly statusIcon: string;
    readonly status: InvoiceStatus;
}

export function createDashboardInvoiceVm(model: DashboardInvoice): DashboardInvoiceVm {
    return {
        date: model.date,
        id: model.id,
        totalAmount: model.totalAmount,
        statusLabel: statusLabels[model.status],
        statusIcon: statusIcons[model.status], 
        status: model.status
    };
}

export function buildDashboardInvoicesVm(models: DashboardInvoice[]): DashboardInvoiceVm[] {
    return [...models]
        .sort((a, b) => a.date.localeCompare(b.date))
        .reverse()
        .slice(0, 10)
        .map(m => createDashboardInvoiceVm(m));
}

