import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  loading?: boolean;
}

function AuthButton({ id, label, loading, ...props }: ButtonProps) {
  return (
    <button
      id={id}
      className="btn w-full mt-4 bg-customcyan text-white disabled:bg-gray-300 disabled:text-gray-500 border-0"
      disabled={loading}
      {...props}
    >
      {label}
    </button>
  );
}

export default AuthButton;
