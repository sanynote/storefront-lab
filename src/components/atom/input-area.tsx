import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export const InputArea = ({ error, className = "", ...props }: Props) => {
  return (
    <textarea
      className={`w-full px-3 py-2 text-sm border rounded resize-y min-h-[120px] ${
        error ? "border-red-500" : "border-slate-300"
      } ${className}`}
      {...props}
    />
  );
};
