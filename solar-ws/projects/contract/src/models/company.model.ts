import { SiteInfo } from "./site-info.model";

export interface Company {
    readonly id: string;
    readonly dispalyName: string;
    readonly sites: SiteInfo[]; 
}