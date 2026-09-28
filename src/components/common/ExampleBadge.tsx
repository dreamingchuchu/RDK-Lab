import { FlaskConical } from 'lucide-react';

type ExampleBadgeProps = {
  className?: string;
};

export function ExampleBadge({ className = '' }: ExampleBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-mono font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-400 ${className}`}
    >
      <FlaskConical className="w-3 h-3" />
      EXAMPLE
    </span>
  );
}