import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = ({ error, ...props }: Props) => {
  return (
    <input
      className={`w-full px-3 py-2 text-sm border rounded appearance-none ${
        error ? "border-red-500" : "border-slate-300"
      }`}
      {...props}
    />
  );
};
