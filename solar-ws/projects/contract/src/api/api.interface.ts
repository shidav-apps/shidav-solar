import { Observable } from "rxjs";
import { SolarRecord } from "../models/solar-record.model";

export interface Api {
    getAllRecords(): Observable<SolarRecord[]>;
}