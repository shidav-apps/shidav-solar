/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import { onCall } from "firebase-functions/v2/https";

setGlobalOptions({ maxInstances: 10 });

export const helloWorld = onCall(_ => {
    return 'Hello World';
})