import { Observable } from "rxjs";
import { LoginResult } from "../models/login-error.model";

export interface Api {
    login(credentials: {userid: string, password: string} | null) : Observable<LoginResult>;
    logout(): Observable<void>;
}
