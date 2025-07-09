import { Observable } from "rxjs";
import { LoginResult } from "../models/login-error.model";

export interface Api {
    login(userid: string, password: string) : Observable<LoginResult>;
    logout(): Observable<void>;
}
