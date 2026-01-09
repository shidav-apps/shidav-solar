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
import { onCall } from 'firebase-functions/v2/https';
import { ApiModel } from './models/api/alias';
import { DbModel } from './models/db/alias';

const region = 'me-west1';
// const isEmulator = process.env.FUNCTIONS_EMULATOR === 'true';
setGlobalOptions({
  maxInstances: 50,
  region,
});

initializeApp();
const config = {
  region,
};

export const getDashboardData = onCall<
  ApiModel.getDashboardDataRequest,
  Promise<DbModel.DashboardData>
>(config, async (req) => {
  throw new Error('Not implemented');
});

export const getUserProfile = onCall<string, Promise<DbModel.User>>(
  config,
  async (req) => {
    throw new Error('Not implemented');
  }
);
