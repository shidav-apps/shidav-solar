import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from "@angular/core";
import { delay, of } from "rxjs";
import { InitService } from "../services/init.service";

export function provideLib(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideAppInitializer(() => {
            inject(InitService).init();
        })
    ])
}