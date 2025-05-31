type Props = {
  label?: string;
  required?: boolean;
};

export const Label = ({ label, required }: Props) => {
  if (!label) return null;

  return (
    <div className="text-sm font-medium text-slate-700 flex items-center gap-1">
      {required && <span className="text-red-500">*</span>}
      {label}
    </div>
  );
};
