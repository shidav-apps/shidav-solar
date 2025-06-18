import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from "@angular/core";
import { delay, of } from "rxjs";
import { InitService } from "../services/init.service";
import { provideHttpClient } from "@angular/common/http";

export function provideLib(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideHttpClient(),
        provideAppInitializer(() => {
            inject(InitService).init();
        }), 

    ])
}