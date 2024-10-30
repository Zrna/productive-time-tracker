import { TimeEntries } from '../interfaces/time-entries';
import { backend } from '../services/backend';

export const getTimeEntries = async (params?: string) => {
  return await backend.get<TimeEntries>(
    `/time_entries${params ? `?${params}` : ''}`
  );
};
