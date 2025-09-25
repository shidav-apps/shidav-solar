/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions/v2";
import { onCall } from "firebase-functions/v2/https";

const region = 'me-west1'; // Change this to your preferred region

setGlobalOptions({ 
    maxInstances: 10, 
    region
 });

export const helloWorld = onCall(_ => {
    return 'Hello World';
})