import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLElement> {
  id: string;
}

const Input: FC<Props> = ({ id, ...props }) => {
  return (
    <input
      id={id}
      className="bg-slate-200 rounded-lg text-emerald-600 p-2 border focus:outline-none focus:border-emerald-600 focus:ring-emerald-700"
      {...props}
    />
  );
};

export default Input;
