import { DbModel } from "@db-model";
import { Observable } from "rxjs";

export interface Api {
    login(credentials: {userid: string, password: string} | null) : Observable<DbModel.LoginResult>;
    logout(): Observable<void>;
    getDashboardData(siteId: number, period: DbModel.DataPeriod): Observable<DbModel.DashboardData>;

    downloadReport(report: DbModel.SolarReport): Observable<void>;
    

}


