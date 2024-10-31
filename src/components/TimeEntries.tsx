import { Services } from '../interfaces/services';
import { TimeEntries as TimeEntriesIf } from '../interfaces/time-entries';
import { formatTimeDuration } from '../utils/time';

interface TimeEntriesProps {
  services: Services | undefined;
  timeEntries: TimeEntriesIf | undefined;
  timeEntryDeletingId: string;
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export const TimeEntries: React.FC<TimeEntriesProps> = ({
  services,
  timeEntries,
  timeEntryDeletingId,
  isLoading,
  onDelete,
}) => {
  if (isLoading) {
    return <p className='w-2/3 text-center'>Loading...</p>;
  }

  if (!timeEntries || timeEntries?.data.length === 0) {
    return <p className='w-2/3 text-center'>No time entries</p>;
  }

  return (
    <div className='w-2/3 h-[85dvh] overflow-auto flex flex-col gap-4'>
      {timeEntries?.data.map(entry => {
        const serviceName = services?.data.find(
          service => service.id === entry.relationships.service.data.id
        )?.attributes.name;

        return (
          <div className='relative' key={entry.id}>
            {timeEntryDeletingId === entry.id && (
              <p className='absolute left-2/4 top-2/4'>Deleting...</p>
            )}
            <div
              className={`flex flex-col bg-white border border-blue-200 rounded p-4 gap-3 ${
                timeEntryDeletingId === entry.id ? 'opacity-50' : ''
              }`}
            >
              <p className='text-lg font-bold'>{serviceName}</p>
              <div className='flex flex-col gap-1'>
                <p>Date: {entry.attributes.date}</p>
                <p>Time: {formatTimeDuration(entry.attributes.time)}</p>
                <p>
                  Note:{' '}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: entry.attributes.note,
                    }}
                  />
                </p>
              </div>
              <p
                className='cursor-pointer text-red-600 w-fit'
                onClick={() => onDelete(entry.id)}
              >
                Delete
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
