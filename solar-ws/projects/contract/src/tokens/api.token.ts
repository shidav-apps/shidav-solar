import { InjectionToken } from "@angular/core";
import { Api } from "../api/api.interface";

export const SOLAR_API = new InjectionToken<Api>('SOLAR_API');