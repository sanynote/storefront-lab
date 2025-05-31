import type { InputHTMLAttributes } from "react";

type Props = {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputField = ({
  label,
  required,
  helperText,
  error,
  ...props
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
          {required && <span className="text-red-500">*</span>}
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 text-sm border rounded ${
          error ? "border-red-500" : "border-slate-300"
        }`}
        {...props}
      />
      {error && helperText && (
        <p className="text-xs text-red-500">{helperText}</p>
      )}
    </div>
  );
};
