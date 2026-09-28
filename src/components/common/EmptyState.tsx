import Link from 'next/link';
import { FileX } from 'lucide-react';

type EmptyStateProps = {
  message: string;
  description?: string;
  action?: { label: string; href: string };
};

export function EmptyState({ message, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <FileX className="w-8 h-8 mb-3 text-text-tertiary" aria-hidden="true" />
      <p className="text-sm font-medium text-text-secondary">{message}</p>
      {description && (
        <p className="mt-1 text-xs text-text-tertiary max-w-sm">{description}</p>
      )}
      {action && (
        <Link
          href={action.href}
          className="mt-4 text-xs font-medium text-accent hover:underline"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}