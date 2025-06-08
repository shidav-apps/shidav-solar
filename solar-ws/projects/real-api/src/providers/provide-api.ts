import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SOLAR_API } from '@contract';
import { RealApiService } from '../services/real-api.service';

export function provideApi(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: SOLAR_API,
      useClass: RealApiService,
    },
  ]);
}
