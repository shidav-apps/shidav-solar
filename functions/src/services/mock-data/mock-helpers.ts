import { DbModel } from '../../models/db/alias';
import { MockCompany } from './company';
import { MOCK_CUSTOMER_MAP } from './customers';
import { MOCK_SITES_BY_COMPANY, MOCK_SITES_MAP } from './sites';

function siteIdsToSiteInfos(siteIds: number[]): DbModel.SiteInfo[] {
  return siteIds.map((id) => idToSiteInfo(id));
}

function idToSiteInfo(id: number): DbModel.SiteInfo {
  const siteMock = MOCK_SITES_MAP[id];
  return {
    id: siteMock.id,
    displayName: siteMock.displayName,
    iceContract: siteMock.iceContract,
    customerName: MOCK_CUSTOMER_MAP[siteMock.customerId].displayName,
  };
}

function mockCompanyToCompany(mock: MockCompany): DbModel.Company {
  const mockSites = MOCK_SITES_BY_COMPANY[mock.id] || [];
  const siteIds = mockSites.map((site) => site.id);

  return {
    id: mock.id,
    dispalyName: mock.displayName,
    sites: siteIdsToSiteInfos(siteIds),
  };
}

export const MockHelpers = {
    siteIdsToSiteInfos, 
    idToSiteInfo,
    mockCompanyToCompany,
}