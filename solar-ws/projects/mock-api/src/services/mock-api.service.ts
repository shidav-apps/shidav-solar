import { Api, LoginResult, User } from '@contract';
import { delay, Observable, of } from 'rxjs';

export class MockApiService implements Api {
  #users: User[] = [
    {
      id: 'kobihari',
      dispalyName: 'Kobi Hari',
      email: 'kobihari@gmail.com',
      companies: [
        {
          id: 'solar', 
          dispalyName: 'Solar Inc'
        }
      ],
      imageUrl: '',
    },
    {
      id: 'nirpeleg',
      dispalyName: 'Nir Peleg',
      email: 'nirpeleg@gmail.com',
      companies: [
        {
          id: 'soleg', 
          dispalyName: 'Soleg Ltd'
        }
      ],
      imageUrl: '',
    },
  ];

  login(userid: string, password: string): Observable<LoginResult> {
    const user = this.#users.find(u => u.id === userid);
    const found = (!!user) && password === 'correct';

    const res: LoginResult = (found)
        ? { type: 'success', user}
        : { type: 'error', 
            reason: (user ? 'Incorrect Password' : 'User Id Not Found')
        };

    return of(res).pipe(
        delay(2000)
    );
  }
  logout(): Observable<void> {
    return of().pipe(
        delay(1000)
    );
  }
}
