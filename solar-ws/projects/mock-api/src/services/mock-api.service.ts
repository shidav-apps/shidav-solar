import { Api, SolarRecord } from '@contract';
import { delay, Observable, of } from 'rxjs';

export class MockApiService implements Api{
    #myRecords: SolarRecord[] = [
        { id: 1, displayName: 'Solar Panel A' },
        { id: 2, displayName: 'Solar Panel B' },
        { id: 3, displayName: 'Solar Panel C' }
    ];


    getAllRecords(): Observable<SolarRecord[]> {
        return of(this.#myRecords).pipe(
            delay(2000)
        )
    }

}