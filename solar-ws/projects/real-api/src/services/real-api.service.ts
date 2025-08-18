import { Api, LoginResult } from '@contract';
import { delay, Observable, of } from 'rxjs';

export class RealApiService implements Api{
    login(userid: string, password: string): Observable<LoginResult> {
        throw new Error('Method not implemented.');
    }
    
    logout(): Observable<void> {
        throw new Error('Method not implemented.');
    }
}