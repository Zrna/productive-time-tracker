import { useQuery } from '@tanstack/react-query';
import { getTimeEntries } from '../../apis/time-entries';

interface UseTimeEntriesProps {
  params?: string;
  enabled?: boolean;
}

export const useTimeEntries = ({ enabled, params }: UseTimeEntriesProps) => {
  return useQuery({
    queryKey: ['timeEntries'],
    queryFn: () => getTimeEntries(params),
    enabled: enabled,
  });
};
