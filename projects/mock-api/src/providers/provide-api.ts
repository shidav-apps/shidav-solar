import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SOLAR_API } from '@contract';
import { MockApiService } from '../services/mock-api.service';

export function provideApi(): EnvironmentProviders {
  console.log('Providing MockApiService as SOLAR_API');
  return makeEnvironmentProviders([
    {
      provide: SOLAR_API,
      useClass: MockApiService,
    },
  ]);
}
