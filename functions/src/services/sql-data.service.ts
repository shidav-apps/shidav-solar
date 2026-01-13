import { createDb } from "./sql-data/create-db";

export interface SqlDataService {
    getCompanyIds(): Promise<string[]>;
}

type InternalSqlDataService = SqlDataService & {
    dispose(): Promise<void>;
}

export interface SqlDataServiceOptions {
    readonly connectionString: string;
    readonly databaseName: string;
    readonly user: string;
    readonly password: string;
}

async function getSqlDataService(options: SqlDataServiceOptions): Promise<InternalSqlDataService> {
    const db = createDb(options);

    async function getCompanyIds(): Promise<string[]> {
        const companies = await db.selectFrom('companies')
            .selectAll()
            .execute();
        return companies.map(c => c.id);
    }

    async function dispose() {
        await db.destroy();
    }


    return {
        getCompanyIds,
        dispose,
    };
}


export async function withSqlDataService<T>(
    options: SqlDataServiceOptions,
    fn: (service: SqlDataService) => Promise<T>
): Promise<T> {
    const sqlDataService = await getSqlDataService(options);
    try {
        return await fn(sqlDataService);
    } finally {
        await sqlDataService.dispose();
    }
}