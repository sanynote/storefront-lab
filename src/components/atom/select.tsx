type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
};

export const Select = ({ options, value, onChange }: Props) => {
  return (
    <div className="relative w-full">
      <select
        className="w-full appearance-none border border-slate-300 rounded px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">선택하세요</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* 🔽 커스텀 화살표 아이콘 */}
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M5.25 7.75L10 12.5l4.75-4.75"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};
