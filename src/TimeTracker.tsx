import { useOrganizationMemberships } from './hooks/api/organization';
import { useTimeEntries } from './hooks/api/time-entries';

function TimeTracker() {
  const { data: orgMemberships, isLoading: isLoadingOrgMemberships } =
    useOrganizationMemberships('include=person');

  const personId = orgMemberships?.included?.find(
    category => category.type === 'people'
  )?.id;

  const { data: timeEntries, isLoading: isLoadingTimeEntries } = useTimeEntries(
    {
      params: `filter[after]=2024-10-29&filter[before]=2024-10-31&filter[person_id]=${personId}`,
      enabled: !!personId,
    }
  );

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
              <div
                key={entry.id}
                style={{
                  border: '2px solid black',
                  padding: '8px',
                  margin: '8px',
                }}
              >
                <p>Date: {entry.attributes.date}</p>
                <p>Time: {entry.attributes.time}</p>
                <p>
                  Note:{' '}
                  <span
                    dangerouslySetInnerHTML={{ __html: entry.attributes.note }}
                  />
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TimeTracker;