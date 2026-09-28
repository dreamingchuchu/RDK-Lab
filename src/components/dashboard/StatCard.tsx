type StatCardProps = {
  label: string;
  value: number | string;
  unit?: string;
  hint?: string;
};

export function StatCard({ label, value, unit, hint }: StatCardProps) {
  return (
    <div className="surface px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-1">
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-semibold font-mono text-text">{value}</span>
        {unit && <span className="text-xs text-text-tertiary">{unit}</span>}
      </div>
      {hint && <p className="text-xs text-text-tertiary mt-0.5">{hint}</p>}
    </div>
  );
}