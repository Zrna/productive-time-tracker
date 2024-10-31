import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTimeEntry, getTimeEntries } from '../../apis/time-entries';

interface UseTimeEntriesProps {
  params?: string;
  enabled?: boolean;
}

export const useTimeEntries = ({ enabled, params }: UseTimeEntriesProps) => {
  return useQuery({
    queryKey: ['timeEntries'],
    queryFn: () => getTimeEntries(params),
    enabled: enabled,
    refetchOnWindowFocus: true,
  });
};

export const useDeleteTimeEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await deleteTimeEntry(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['timeEntries'] });
    },
    onError: error => {
      console.error(error);
    },
  });
};
