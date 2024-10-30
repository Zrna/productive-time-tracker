import { OrganizationMemberships } from '../interfaces/organization';
import { backend } from '../services/backend';

export const getOrganizationMemberships = async (params?: string) => {
  return await backend.get<OrganizationMemberships>(
    `/organization_memberships${params ? `?${params}` : ''}`
  );
};
