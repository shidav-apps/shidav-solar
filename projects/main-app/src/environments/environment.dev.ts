import { provideApi } from "@real-api";
import { firebaseConfig } from "./firebase-config";

export const environment = {
    provideApi: provideApi, 
    isProduction: false, 
    isLocal: false, 
    firebaseConfig
}