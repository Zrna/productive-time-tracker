import { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  isDisabled: boolean;
  text: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  isDisabled,
  text,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className='bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed'
      onClick={onClick}
    >
      {text}
    </button>
  );
};
