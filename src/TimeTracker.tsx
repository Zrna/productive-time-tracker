import { useState } from 'react';
import { useOrganizationMemberships } from './hooks/api/organization';
import { useDeleteTimeEntry, useTimeEntries } from './hooks/api/time-entries';
import { formatDate } from './utils/date';
import { CreateTimeEntryForm, Navbar, TimeEntries } from './components';

function TimeTracker() {
  const { data: orgMemberships, isLoading: isLoadingOrgMemberships } =
    useOrganizationMemberships('include=person');

  const personId = orgMemberships?.included?.find(
    category => category.type === 'people'
  )?.id;

  const today = formatDate(new Date());

  const { data: timeEntries, isLoading: isLoadingTimeEntries } = useTimeEntries(
    {
      params: `filter[after]=${today}&filter[before]=${today}&filter[person_id]=${personId}`,
      enabled: !!personId,
    }
  );

  const { mutateAsync: deleteTimeEntry } = useDeleteTimeEntry();

  const [timeEntryDeletingId, setTimeEntryDeletingId] = useState('');

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this entry?'
    );

    if (!isConfirmed) {
      return;
    }

    setTimeEntryDeletingId(id);
    await deleteTimeEntry(id);
    setTimeEntryDeletingId('');
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center gap-16 w-full p-16 h-[90dvh]'>
        <CreateTimeEntryForm personId={personId} />
        <TimeEntries
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
