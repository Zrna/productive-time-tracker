import { useForm } from 'react-hook-form';
import { FormField } from './FormField';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTimeEntry } from '../interfaces/time-entries';
import { useCreateTimeEntry } from '../hooks/api/time-entries';
import { useEffect } from 'react';
import { formatDate } from '../utils/date';

const CreateTimeEntrySchema = z.object({
  serviceId: z.string(),
  time: z.number().int().nonnegative('Time must be a positive number').min(1),
  note: z.string().optional(),
});

type CreateTimeEntryFormData = Omit<CreateTimeEntry, 'personId' | 'date'>;

interface CreateTimeEntryFormProps {
  personId: string;
}

export const CreateTimeEntryForm: React.FC<CreateTimeEntryFormProps> = ({
  personId,
}) => {
  const { mutateAsync: createTimeEntry, isSuccess: isTimeEntryCreated } =
    useCreateTimeEntry();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateTimeEntryFormData>({
    resolver: zodResolver(CreateTimeEntrySchema),
    values: {
      serviceId: process.env.REACT_APP_SERVICE_ID as string,
      time: 0,
      note: '',
    },
  });

  useEffect(() => {
    if (isTimeEntryCreated) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeEntryCreated]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '33%',
        backgroundColor: '#fff',
        border: '1px solid #dfe5f5',
        borderRadius: '4px',
        padding: '8px',
      }}
    >
      <h4>Add New Time Entry</h4>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        onSubmit={handleSubmit(data =>
          createTimeEntry({
            ...data,
            personId,
            date: formatDate(new Date()),
          })
        )}
      >
        <FormField
          type='text'
          name='serviceId'
          register={register}
          isDisabled
        />
        <FormField
          type='number'
          name='time'
          placeholder='Time'
          register={register}
          error={errors.time}
        />
        <FormField
          type='text'
          name='note'
          placeholder='Enter a note'
          register={register}
          error={errors.note}
        />
        <button type='submit' disabled={isSubmitting || !isValid}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};
