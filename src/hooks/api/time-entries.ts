import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createTimeEntry,
  deleteTimeEntry,
  getTimeEntries,
} from '../../apis/time-entries';
import { ErrorResponse } from '../../interfaces/common';
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
      toast.info('Time entry deleted', {
        icon: () => '🗑️',
      });
    },
    onError: (error: ErrorResponse) => {
      toast.error(
        error.response.data.errors[0].detail || 'Something went wrong'
      );
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
      toast.success('Time entry added');
    },
    onError: (error: ErrorResponse) => {
      toast.error(
        error.response.data.errors[0].detail || 'Something went wrong'
      );
    },
  });
};
