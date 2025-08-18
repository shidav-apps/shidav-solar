import { SiteInfo } from "@contract";
import { SitesListVm } from "./view-model/sites-list.vm";
import { groupBy } from "@solar-lib";
import { GroupVm } from "./view-model/group.vm";
import { SiteVm } from "./view-model/site.vm";

export function buildSitesListVm(sites: SiteInfo[], searchWord: string, selectedSiteId: number | null): SitesListVm {
    const filteredSites = sites.filter(site => passesFilter(site));
    const siteGroups = groupBy(filteredSites, site => site.customerName);
    const groups = Object.entries(siteGroups);
    const groupVms: GroupVm[] = groups.map(([key, sites]) => buildGroupVm(key, sites));

    return {
        groups: groupVms,
    }

    function buildGroupVm(key: string, sites: SiteInfo[]): GroupVm {
        return {
            key,
            title: key,
            sites: sites.map(buildSiteVm)
        };
    }

    function buildSiteVm(site: SiteInfo): SiteVm {
        return {
            id: site.id,
            title: site.displayName, 
            contract: site.iceContract, 
            isSelected: selectedSiteId === site.id
        };
    }

    function passesFilter(site: SiteInfo): boolean {
        const lowerSearchWord = searchWord.toLowerCase();
        return site.displayName.toLowerCase().includes(lowerSearchWord) ||
               site.id.toString().includes(lowerSearchWord) ||
               site.iceContract.toLowerCase().includes(lowerSearchWord);

    }
}