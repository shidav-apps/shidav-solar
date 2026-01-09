import { SitesListVm } from "./view-model/sites-list.vm";
import { GroupVm } from "./view-model/group.vm";
import { SiteVm } from "./view-model/site.vm";
import { groupBy } from "@tools";
import { DbModel } from "@db-model";

export function buildSitesListVm(sites: DbModel.SiteInfo[], searchWord: string, selectedSiteId: number | null): SitesListVm {
    const filteredSites = sites.filter(site => passesFilter(site));
    const siteGroups = groupBy(filteredSites, site => site.customerName);
    const groups = Object.entries(siteGroups);
    const groupVms: GroupVm[] = groups.map(([key, sites]) => buildGroupVm(key, sites));

    return {
        groups: groupVms,
    }

    function buildGroupVm(key: string, sites: DbModel.SiteInfo[]): GroupVm {
        return {
            key,
            title: key,
            sites: sites.map(buildSiteVm)
        };
    }

    function buildSiteVm(site: DbModel.SiteInfo): SiteVm {
        return {
            id: site.id,
            title: site.displayName, 
            contract: site.iceContract, 
            isSelected: selectedSiteId === site.id
        };
    }

    function passesFilter(site: DbModel.SiteInfo): boolean {
        const lowerSearchWord = searchWord.toLowerCase();
        return site.displayName.toLowerCase().includes(lowerSearchWord) ||
               site.id.toString().includes(lowerSearchWord) ||
               site.iceContract.toLowerCase().includes(lowerSearchWord);

    }
}