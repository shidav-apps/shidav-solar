export interface DbSchema {
    readonly companies: {
        readonly id: string;
        readonly displayName: string;
    }, 
    readonly users: {
        readonly email: string;
        readonly displayName: string;
    }, 
    readonly userCompanies: {
        readonly companyId: string;
        readonly email: string;
    }
}