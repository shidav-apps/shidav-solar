import { MockUser } from '../models/mock-user';

export const MOCK_USERS: MockUser[] = [
  {
    id: 'kobihari',
    displayName: 'Kobi Hari',
    email: 'kobihari@gmail.com',
    companyIds: ['solar', 'soleg', 'greentech'],
  },
  {
    id: 'nirpeleg',
    displayName: 'Nir Peleg',
    email: 'nirpeleg@gmail.com',
    companyIds: ['soleg', 'sunpower'],
  },
  {
    id: 'danamir',
    displayName: 'Dana Mir',
    email: 'dana.mir@example.com',
    companyIds: ['solar', 'greentech', 'brightfuture', 'helios'],
  },
  {
    id: 'ronlevi',
    displayName: 'Ron Levi',
    email: 'ron.levi@example.com',
    companyIds: ['soleg', 'solar', 'sunpower'],
  },
  {
    id: 'liorshapira',
    displayName: 'Lior Shapira',
    email: 'lior.shapira@example.com',
    companyIds: ['greentech', 'brightfuture', 'helios', 'solar', 'sunpower'],
  },
];
