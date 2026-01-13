import { Connector, IpAddressTypes } from "@google-cloud/cloud-sql-connector";
import { SqlDataServiceOptions } from "../sql-data.service";
import { Kysely, MssqlDialect } from "kysely";
import * as tedious from 'tedious'
import * as tarn from 'tarn'
import { DbSchema } from "./db-schema";

export async function createConnection(options: SqlDataServiceOptions) {
    const connector = new Connector();
    const clientOptions = await connector.getTediousOptions({
        instanceConnectionName: options.connectionString, 
        ipType: IpAddressTypes.PUBLIC,
    });

    const config: tedious.ConnectionConfiguration = {
        server: '0.0.0.0', 
        authentication: {  
            type: 'default',
            options: {
                userName: options.user,
                password: options.password,
            }
        },
        options: {
            ...clientOptions,
            port: 9999,
            database: options.databaseName,
            encrypt: true,
            trustServerCertificate: true,                         
        }
    }

    const connection = new tedious.Connection(config);
    return connection;
}


export function createDialect(options: SqlDataServiceOptions) {
    const dialect = new MssqlDialect({
        tarn: {
            ...tarn, 
            options: {
                min: 0,
                max: 10,
            }
        }, 
        tedious: {
            ...tedious,
            connectionFactory: () => createConnection(options),
        },
    });
    return dialect;
}

export function createDb(options: SqlDataServiceOptions) {
    const db = new Kysely<DbSchema>({
        dialect: createDialect(options),
    });
    return db;
}