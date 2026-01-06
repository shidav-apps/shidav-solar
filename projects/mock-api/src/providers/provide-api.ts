import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SOLAR_API } from '@contract';
import { MockApiService } from '../services/mock-api.service';
import { FirebaseOptions } from '@angular/fire/app';
import { provideFirebaseConfig, withFirebaseAuth, withFirebaseFunctions } from '@solar-lib';

export function provideApi(firebaseConfig: FirebaseOptions): EnvironmentProviders {
  console.log('Providing MockApiService as SOLAR_API');
  return makeEnvironmentProviders([
    {
      provide: SOLAR_API,
      useClass: MockApiService,
    },
    provideFirebaseConfig(firebaseConfig, 'me-west1', 
      withFirebaseAuth(true), 
      withFirebaseFunctions(true)
    ),
  ]);
}
