import { useQuery } from '@tanstack/react-query';
import { getOrganizationMemberships } from '../../apis/organization';

export const useOrganizationMemberships = (params?: string) => {
  return useQuery({
    queryKey: ['organizationMemberships'],
    queryFn: () => getOrganizationMemberships(params),
  });
};
