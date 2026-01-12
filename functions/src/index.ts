/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { initializeApp } from 'firebase-admin/app';
import { setGlobalOptions } from 'firebase-functions';
import { defineSecret } from 'firebase-functions/params';
import { onCall } from 'firebase-functions/v2/https';
import { ApiModel } from './models/api/alias';
import { DbModel } from './models/db/alias';
import { getMockDataService } from './services/mock-data.service';
import { withSqlDataService } from './services/sql-data.service';

const region = 'me-west1';
const isEmulator = process.env.FUNCTIONS_EMULATOR === 'true';

const secrets = ['SQL_CONNECTION_NAME', 'SQL_USER', 'SQL_PASSWORD', 'SQL_DB_NAME'] as const;
type SecretName = (typeof secrets)[number];
const config = { region, secrets: [...secrets] };

function getSecret(name: SecretName): string {
  if (isEmulator) {
    const envVar = process.env[name];
    return envVar ?? '';
  } else {
    const secret = defineSecret(name);
    const envVar = secret.value();
    return envVar ?? '';
  }
}

function sqlConnectionName(): string { return getSecret('SQL_CONNECTION_NAME'); }
function sqlUser(): string { return getSecret('SQL_USER'); }
function sqlPassword(): string { return getSecret('SQL_PASSWORD'); }
function sqlDbName(): string { return getSecret('SQL_DB_NAME'); }


setGlobalOptions({
  maxInstances: 50,
  region,
});

initializeApp();

export const getDashboardData = onCall<
  ApiModel.getDashboardDataRequest,
  Promise<DbModel.DashboardData>
>(config, async (req) => {
  const data = getMockDataService({});
  return data.getDashboardData(req.data.siteId, req.data.period);
});

export const getUserProfile = onCall<string, Promise<DbModel.User>>(
  config,
  async (req) => {
    const data = getMockDataService({});
    return data.getUserProfile(req.data);
  }
);

export const getCompanyNames = onCall<void, Promise<string[]>>(
  config,
  async (_) => {
    const res = await withSqlDataService({
      connectionString: sqlConnectionName(),
      databaseName: sqlDbName(),
      user: sqlUser(),
      password: sqlPassword(),
    }, async data => data.getCompanyIds());
    return res;
  }
);
