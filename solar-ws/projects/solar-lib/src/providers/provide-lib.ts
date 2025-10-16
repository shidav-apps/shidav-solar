import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from "@angular/core";
import { delay, of } from "rxjs";
import { InitService } from "../services/init.service";
import { provideHttpClient } from "@angular/common/http";
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from "@angular/material/core";

export function provideLib(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideHttpClient(),
        provideAppInitializer(() => {
            inject(InitService).init();
        }), 
        provideNativeDateAdapter(), 
        { provide: MAT_DATE_LOCALE, useValue: 'he-IL' }
    ])
}