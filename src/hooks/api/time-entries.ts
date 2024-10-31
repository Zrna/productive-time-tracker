import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTimeEntry,
  deleteTimeEntry,
  getTimeEntries,
} from '../../apis/time-entries';
import { CreateTimeEntry } from '../../interfaces/time-entries';

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

export const useCreateTimeEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTimeEntry) => {
      await createTimeEntry(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['timeEntries'] });
    },
    onError: error => {
      console.error(error);
    },
  });
};
