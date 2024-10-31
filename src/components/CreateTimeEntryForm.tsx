import { useForm } from 'react-hook-form';
import { FormField } from './FormField';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTimeEntry } from '../interfaces/time-entries';
import { useCreateTimeEntry } from '../hooks/api/time-entries';
import { useEffect } from 'react';
import { formatDate } from '../utils/date';
import { Button } from './Button';

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
    <div className='flex flex-col gap-6 w-1/3 bg-white border border-gray-200 rounded p-2'>
      <h4 className='text-xl font-semibold'>Add New Time Entry</h4>
      <form
        className='flex flex-col gap-4'
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
          helperText='Acquiring new clients service ID is hardcoded'
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
        <Button
          type='submit'
          isDisabled={isSubmitting || !isValid}
          text={isSubmitting ? 'Saving...' : 'Save'}
        />
      </form>
    </div>
  );
};
