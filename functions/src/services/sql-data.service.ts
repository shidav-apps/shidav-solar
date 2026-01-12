import { Connector, IpAddressTypes } from "@google-cloud/cloud-sql-connector";
import { Connection, Request } from "tedious";

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
    const connector = new Connector();
    console.log('SQL Connection, The options are: ');
    console.log('instance name: ', options.connectionString);
    console.log('database name: ', options.databaseName);
    console.log('user: ', options.user);

    const clientOptions = await connector.getTediousOptions({
        instanceConnectionName: options.connectionString, 
        ipType: IpAddressTypes.PUBLIC,
    });

    const config: any = {
        ...clientOptions, 
        authentication: {  
            type: 'default',
            options: {
                userName: options.user,
                password: options.password,
            }
        },
        options: {
            database: options.databaseName,
            encrypt: true,
            trustServerCertificate: true
        }      
    }

    const connection = new Connection(config);
    await new Promise<void>((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });


    async function getCompanyIds(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            const companyIds: string[] = [];
            const request = new Request(
                `SELECT DISTINCT company_id FROM companies;`,
                (err, rowCount) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(companyIds);
                    }
                }
            );
            request.on('row', (columns) => {
                const companyId = columns[0].value as string;
                companyIds.push(companyId);
            });
            connection.execSql(request);
        });
    }

    async function dispose(): Promise<void> {
        connection.close();
        await connector.close();
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