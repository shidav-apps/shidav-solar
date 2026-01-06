import { provideApi } from "@mock-api";
import { firebaseConfig } from "./firebase-config";

export const environment = {
    provideApi: provideApi, 
    isProduction: false, 
    isLocal: true, 
    firebaseConfig
}

