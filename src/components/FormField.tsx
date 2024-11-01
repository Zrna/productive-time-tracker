import { HTMLInputTypeAttribute } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError | undefined;
  isDisabled?: boolean;
  helperText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  isDisabled,
  helperText,
}) => {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <input
        className="border border-gray-200 rounded p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isDisabled}
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber: type === "number" })}
      />
      {helperText && <span className="text-sm text-gray-600 pl-1">{helperText}</span>}
      {error && <span className="text-sm text-red-600 pl-1">{error.message}</span>}
    </div>
  );
};
