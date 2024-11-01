import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateTimeEntry } from "../hooks/api/time-entries";
import { CreateTimeEntry } from "../interfaces/time-entries";
import { Services } from "../interfaces/services";
import { formatDate } from "../utils/date";
import { formatTimeDuration } from "../utils/time";

import { Button } from "./Button";
import { FormField } from "./FormField";

const CreateTimeEntrySchema = z.object({
  serviceId: z.string(),
  time: z.number().int().nonnegative("Time must be a positive number").min(1),
  note: z.string().optional(),
});

type CreateTimeEntryFormData = Omit<CreateTimeEntry, "personId" | "date">;

interface CreateTimeEntryFormProps {
  personId: string;
  service: Services["data"][0] | undefined;
}

export const CreateTimeEntryForm: React.FC<CreateTimeEntryFormProps> = ({ personId, service }) => {
  const { mutateAsync: createTimeEntry, isSuccess: isTimeEntryCreated } = useCreateTimeEntry();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateTimeEntryFormData>({
    resolver: zodResolver(CreateTimeEntrySchema),
  });

  const enteredTime = watch("time");

  useEffect(() => {
    if (service) {
      setValue("serviceId", service.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  useEffect(() => {
    if (isTimeEntryCreated) {
      reset();

      if (service) {
        setValue("serviceId", service.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeEntryCreated]);

  return (
    <div className="flex flex-col gap-6 w-1/3 bg-white border border-gray-200 rounded p-2">
      <h4 className="text-xl font-semibold">Add New Time Entry</h4>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((data) =>
          createTimeEntry({
            ...data,
            personId,
            date: formatDate(new Date()),
          }),
        )}
      >
        <FormField
          type="text"
          name="serviceId"
          register={register}
          isDisabled
          helperText={service ? `The "${service.attributes.name}" service is hardcoded` : ""}
        />
        <div className="flex gap-2 items-center">
          <FormField type="number" name="time" placeholder="Time" register={register} error={errors.time} />
          {!isNaN(enteredTime) && <p className="text-gray-500">{formatTimeDuration(Number(enteredTime))}</p>}
        </div>
        <FormField type="text" name="note" placeholder="Enter a note" register={register} error={errors.note} />
        <Button type="submit" isDisabled={isSubmitting || !isValid} text={isSubmitting ? "Saving..." : "Save"} />
      </form>
    </div>
  );
};
