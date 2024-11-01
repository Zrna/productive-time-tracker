import { CreateTimeEntry, TimeEntries } from "../interfaces/time-entries";
import { backend } from "../services/backend";

export const getTimeEntries = async (params?: string) => {
  return await backend.get<TimeEntries>(`/time_entries${params ? `?${params}` : ""}`);
};

export const deleteTimeEntry = async (id: string) => {
  return await backend.delete(`/time_entries/${id}`);
};

export const createTimeEntry = async (data: CreateTimeEntry) => {
  const { note, date, time, personId, serviceId } = data;

  return await backend.post("/time_entries", {
    data: {
      type: "time_entries",
      attributes: {
        note,
        date,
        time,
      },
      relationships: {
        person: {
          data: {
            type: "people",
            id: personId,
          },
        },
        service: {
          data: {
            type: "services",
            id: serviceId,
          },
        },
      },
    },
  });
};
