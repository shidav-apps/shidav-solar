import { Api, SolarRecord } from '@contract';
import { delay, Observable, of } from 'rxjs';

export class RealApiService implements Api{
    #myRecords: SolarRecord[] = [
        { id: 1, displayName: 'True life solar panels number 1' },
        { id: 2, displayName: 'True life solar panels number 2' },
        { id: 3, displayName: 'True life solar panels number 3' },
        { id: 4, displayName: 'True life solar panels number 4' },
        { id: 5, displayName: 'True life solar panels number 5' },
        { id: 6, displayName: 'True life solar panels number 6' },
        { id: 7, displayName: 'True life solar panels number 7' },
        { id: 8, displayName: 'True life solar panels number 8' },
        { id: 9, displayName: 'True life solar panels number 9' },
        { id: 10, displayName: 'True life solar panels number 10' }

    ];


    getAllRecords(): Observable<SolarRecord[]> {
        return of(this.#myRecords).pipe(
            delay(1000)
        )
    }

}