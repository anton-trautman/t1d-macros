export function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">
        {label}
      </label>
      <input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 dark:border-slate-600
                   bg-white dark:bg-slate-800
                   px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500
                   text-slate-900 dark:text-slate-100"
      />
    </div>
  );
}
