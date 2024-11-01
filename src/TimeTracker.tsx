import { useState } from "react";

import { CreateTimeEntryForm, Navbar, TimeEntries } from "./components";
import { useOrganizationMemberships } from "./hooks/api/organization";
import { useServices } from "./hooks/api/services";
import { useDeleteTimeEntry, useTimeEntries } from "./hooks/api/time-entries";
import { formatDate } from "./utils/date";

function TimeTracker() {
  const { data: orgMemberships, isLoading: isLoadingOrgMemberships } = useOrganizationMemberships("include=person");

  const personId = orgMemberships?.included?.find((category) => category.type === "people")?.id;
  const today = formatDate(new Date());

  const { data: timeEntries, isLoading: isLoadingTimeEntries } = useTimeEntries({
    params: `filter[after]=${today}&filter[before]=${today}&filter[person_id]=${personId}&include=service`,
    enabled: !!personId,
  });
  const { data: services } = useServices();
  const { mutateAsync: deleteTimeEntry } = useDeleteTimeEntry();

  const [timeEntryDeletingId, setTimeEntryDeletingId] = useState("");

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this entry?");

    if (!isConfirmed) {
      return;
    }

    setTimeEntryDeletingId(id);
    await deleteTimeEntry(id).finally(() => setTimeEntryDeletingId(""));
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center gap-16 w-full p-16 h-[90dvh]">
        <CreateTimeEntryForm personId={personId} service={services?.data[0]} />
        <TimeEntries
          services={services}
          timeEntries={timeEntries}
          onDelete={handleDelete}
          timeEntryDeletingId={timeEntryDeletingId}
          isLoading={isLoadingOrgMemberships || isLoadingTimeEntries}
        />
      </div>
    </div>
  );
}

export default TimeTracker;
