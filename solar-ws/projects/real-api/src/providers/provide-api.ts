import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SOLAR_API } from '@contract';
import { RealApiService } from '../services/real-api.service';
import { provideHttpClient } from '@angular/common/http';

export function provideApi(): EnvironmentProviders {
  console.log('Providing RealApiService as SOLAR_API');
  return makeEnvironmentProviders([
    {
      provide: SOLAR_API,
      useClass: RealApiService,
    },
    provideHttpClient()
  ]);

}
