import { Observable } from "rxjs";
import { LoginResult } from "../models/login-error.model";
import { DataPeriod } from "../models/data-period.model";
import { DashboardData } from "../models/dashboard/dashboard-data.model";
import { SolarReport } from "@contract";

export interface Api {
    login(credentials: {userid: string, password: string} | null) : Observable<LoginResult>;
    logout(): Observable<void>;
    getDashboardData(siteId: number, period: DataPeriod): Observable<DashboardData>;

    downloadReport(report: SolarReport): Observable<void>;

    

}


