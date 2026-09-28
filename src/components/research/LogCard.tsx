import Link from 'next/link';
import type { ResearchLog } from '@/types/research-log';
import { formatDate } from '@/lib/utils/dates';

export function LogCard({ log }: { log: ResearchLog }) {
  return (
    <Link
      href={`/research-logs/${log.id}`}
      className="block surface p-4 hover:bg-surface-hover transition-colors group"
    >
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-mono text-xs text-text-tertiary shrink-0">
          {formatDate(log.date)}
        </span>
        <h3 className="text-sm font-medium text-text group-hover:text-accent transition-colors truncate">
          {log.title}
        </h3>
      </div>
      <p className="text-xs text-text-secondary line-clamp-2 mb-2 leading-relaxed">
        {log.summary}
      </p>
      {log.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {log.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </Link>
  );
}