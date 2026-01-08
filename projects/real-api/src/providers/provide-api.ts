import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SOLAR_API } from '@contract';
import { RealApiService } from '../services/real-api.service';
import { provideFirebaseConfig, withFirebaseAuth, withFirebaseFunctions } from '@solar-lib';
import { FirebaseOptions } from '@angular/fire/app';

export function provideApi(firebaseConfig: FirebaseOptions): EnvironmentProviders {
  console.log('Providing RealApiService as SOLAR_API');
  return makeEnvironmentProviders([
    {
      provide: SOLAR_API,
      useClass: RealApiService,
    },
    provideFirebaseConfig(firebaseConfig, 'me-west1', 
      withFirebaseAuth(), 
      withFirebaseFunctions()
    ),
  ]);

}
