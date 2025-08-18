import { SiteVm } from "./site.vm";

export interface GroupVm {
    readonly key: string;
    readonly title: string;
    readonly sites: SiteVm[];
}