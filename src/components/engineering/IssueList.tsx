import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Issue } from '@/types/issue';
import { StatusBadge, SeverityBadge } from '@/components/common/StatusBadge';
import { formatDate } from '@/lib/utils/dates';

export function IssueList({ issues }: { issues: Issue[] }) {
  if (issues.length === 0) {
    return <p className="text-sm text-text-tertiary py-8 text-center">暂无问题记录</p>;
  }

  return (
    <ul className="space-y-2">
      {issues.map((issue) => (
        <li key={issue.id}>
          <Link
            href={`/issues/${issue.id}`}
            className="block surface p-4 hover:bg-surface-hover transition-colors group"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-text-tertiary">{issue.id}</span>
                  <h3 className="text-sm font-medium text-text truncate">{issue.title}</h3>
                </div>
                <p className="text-xs text-text-tertiary font-mono">{formatDate(issue.date)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <SeverityBadge severity={issue.severity} />
                <StatusBadge status={issue.status} />
                <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-colors" />
              </div>
            </div>
            {issue.symptom && (
              <p className="text-xs text-text-secondary line-clamp-1">{issue.symptom}</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}