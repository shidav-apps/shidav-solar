export interface ResportsRecord {
    id: string;
    title: string;
    description: string;
}

export interface ReportsSlice {
    reports: ResportsRecord[];
}

export const initialReportsState: ReportsSlice = {
    reports: [
        {
            id: 'recommendations-status',
            title: 'דו"ח מצב המלצות',
            description: 'דו"ח המציג את הסטטוס של כל ההמלצות שהתקבלו באתר'
        }, 
        {
            id: 'overdue-recommendations',
            title: 'דו"ח המלצות לקבל', 
            description: 'דו"ח פיגורים בקבלת המלצות'
        }, 
        {
            id: 'monthly-customer-summary',
            title: 'סיכום חודשי ללקוח', 
            description: 'ייצור והכנסות ללקוח לפי אתרים'
        }, 
        {
            id: 'annual-income-report',
            title: 'דו"ח הכנסות שנתי', 
            description: 'מדו"ח הכנסות לחברה לפי חודשים'
        }, 
        {
            id: 'expected-income-report',
            title: 'דו"ח הכנסות לקבל', 
            description: 'חישוב הכנסה צפויה לפי נתוני ניתור'
        }
    ],
};
