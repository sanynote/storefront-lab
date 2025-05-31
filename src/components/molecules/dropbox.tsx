import { Label } from "../atom/label";
import { Select } from "../atom/select";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  value?: string;
  options: Option[];
  onChange: (value: string) => void;
};

export const Dropbox = ({
  label,
  required,
  error,
  helperText,
  value,
  options,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-2.5">
      {label && <Label required={required} label={label} />}
      <Select options={options} value={value} onChange={onChange} />
      {helperText && (
        <p
          className={`text-xs mt-1 ${
            error ? "text-red-500" : "text-slate-500"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
