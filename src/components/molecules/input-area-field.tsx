import { InputArea } from "../atom/input-area";
import { Label } from "../atom/label";

type Props = {
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
};

export const InputAreaField = ({
  label,
  required,
  error,
  helperText,
  ...props
}: Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div className="flex flex-col gap-2.5">
      {label && <Label required={required} label={label} />}
      <InputArea error={error} {...props} />
      {error && helperText && (
        <p className="text-xs text-red-500">{helperText}</p>
      )}
    </div>
  );
};
