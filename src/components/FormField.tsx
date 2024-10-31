import { HTMLInputTypeAttribute } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface FormFieldProps {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError | undefined;
  isDisabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  isDisabled,
}) => {
  return (
    <div>
      <input
        disabled={isDisabled}
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber: type === 'number' })}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
};
