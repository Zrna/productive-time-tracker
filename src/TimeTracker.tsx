import { useState } from 'react';
import { useOrganizationMemberships } from './hooks/api/organization';
import { useDeleteTimeEntry, useTimeEntries } from './hooks/api/time-entries';
import { getTomorrowDate, getYesterdayDate } from './utils/date';

function TimeTracker() {
  const { data: orgMemberships, isLoading: isLoadingOrgMemberships } =
    useOrganizationMemberships('include=person');

  const personId = orgMemberships?.included?.find(
    category => category.type === 'people'
  )?.id;

  const yesterday = getYesterdayDate(new Date());
  const tomorrow = getTomorrowDate(new Date());

  const { data: timeEntries, isLoading: isLoadingTimeEntries } = useTimeEntries(
    {
      params: `filter[after]=${yesterday}&filter[before]=${tomorrow}&filter[person_id]=${personId}`,
      enabled: !!personId,
    }
  );
  const { mutateAsync: deleteTimeEntry, isPending: isDeletingTimeEntry } =
    useDeleteTimeEntry();

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
      <h1>Productive Time Tracker</h1>
      {isLoadingOrgMemberships || isLoadingTimeEntries ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          {!timeEntries || timeEntries?.data.length === 0 ? (
            <p>No time entries</p>
          ) : (
            timeEntries?.data.map(entry => (
              <div key={entry.id} style={{ position: 'relative' }}>
                {isDeletingTimeEntry && timeEntryDeletingId === entry.id && (
                  <p style={{ position: 'absolute', left: '50%' }}>
                    Deleting...
                  </p>
                )}
                <div
                  style={{
                    border: '2px solid black',
                    padding: '8px',
                    margin: '8px',
                    opacity:
                      isDeletingTimeEntry && timeEntryDeletingId === entry.id
                        ? 0.5
                        : 1,
                  }}
                >
                  <p>Date: {entry.attributes.date}</p>
                  <p>Time: {entry.attributes.time}</p>
                  <p>
                    Note:{' '}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: entry.attributes.note,
                      }}
                    />
                  </p>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={isDeletingTimeEntry}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TimeTracker;
