export interface SqlDataService {
    getCompanyIds(): Promise<string[]>;
}

export interface SqlDataServiceOptions {
    readonly connectionString: string;
    readonly databaseName: string;
    readonly user: string;
    readonly password: string;
}

export function getSqlDataService(options: SqlDataServiceOptions): SqlDataService {
    async function getCompanyIds(): Promise<string[]> {
        // Implementation to fetch company IDs from SQL database
        return []; // Placeholder return
    }

    return {
        getCompanyIds,
    };
}