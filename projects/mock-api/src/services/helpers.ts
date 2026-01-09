import { MOCK_SITES_BY_COMPANY, MOCK_SITES_MAP } from "../data/sites";
import { MOCK_CUSTOMER_MAP } from "../data/customers";
import { MockCompany } from "../models/mock-company";
import { DbModel } from "@db-model";


export function mockCompanyToCompany(mock: MockCompany): DbModel.Company {
    const mockSites = MOCK_SITES_BY_COMPANY[mock.id] || [];
    const siteIds = mockSites.map(site => site.id);

    return {
        id: mock.id,
        dispalyName: mock.displayName, 
        sites: siteIdsToSiteInfos(siteIds)
    };
}

export function siteIdsToSiteInfos(siteIds: number[]): DbModel.SiteInfo[] {
    return siteIds.map(id => idToSiteInfo(id));
}

export function idToSiteInfo(id: number): DbModel.SiteInfo {
    const siteMock = MOCK_SITES_MAP[id];
    return {
        id: siteMock.id,
        displayName: siteMock.displayName,
        iceContract: siteMock.iceContract,
        customerName: MOCK_CUSTOMER_MAP[siteMock.customerId].displayName
    }
}