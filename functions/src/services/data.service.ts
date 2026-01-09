import { DbModel } from '../models/db/alias';
import { MOCK_COMPANY_MAP } from './mock-data/company';
import { getDataForSiteForPeriod } from './mock-data/dashboard-data';
import { MockHelpers } from './mock-data/mock-helpers';
import { MOCK_USERS } from './mock-data/users';

export interface DataService {
    getUserProfile(email: string): DbModel.User;
    getDashboardData(siteId: number, period: DbModel.DataPeriod): DbModel.DashboardData;
}

export interface DataServiceOptions {}

export function getDataService(options: DataServiceOptions): DataService {
  function getUserProfile(email: string): DbModel.User {
    const mockUser = MOCK_USERS.find((u) => u.email === email);
    const companies: DbModel.Company[] =
      mockUser?.companyIds
        .map((cid) => MOCK_COMPANY_MAP[cid])
        .map(MockHelpers.mockCompanyToCompany) || [];
    return {
      id: mockUser?.id || 'unknown',
      email: mockUser?.email || '',
      displayName: mockUser ? mockUser.displayName : 'Unknown User',
      companies: companies,
    };
  }

  function getDashboardData(
    siteId: number,
    period: DbModel.DataPeriod
  ): DbModel.DashboardData {
    return getDataForSiteForPeriod(siteId, period);
  }

  return {
    getUserProfile,
    getDashboardData,
  } 
}
