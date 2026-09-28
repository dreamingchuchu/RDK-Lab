import { getPlaceholderLabel, type PlaceholderKind } from '@/lib/utils/placeholders';

type PlaceholderProps = {
  kind: PlaceholderKind;
  label?: string;
  className?: string;
};

export function Placeholder({ kind, label, className = '' }: PlaceholderProps) {
  const text = label ?? getPlaceholderLabel(kind);
  return (
    <span
      className={`inline-flex items-center text-xs font-mono px-2 py-0.5 rounded border border-dashed border-border text-text-tertiary bg-surface-hover ${className}`}
    >
      {text}
    </span>
  );
}