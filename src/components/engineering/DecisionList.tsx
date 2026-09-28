import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Decision } from '@/types/decision';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ExampleBadge } from '@/components/common/ExampleBadge';
import { formatDate } from '@/lib/utils/dates';

export function DecisionList({ decisions }: { decisions: Decision[] }) {
  if (decisions.length === 0) {
    return <p className="text-sm text-text-tertiary py-8 text-center">暂无决策记录</p>;
  }

  return (
    <ul className="space-y-2">
      {decisions.map((dec) => (
        <li key={dec.id}>
          <Link
            href={`/decisions/${dec.id}`}
            className="block surface p-4 hover:bg-surface-hover transition-colors group"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-accent">{dec.id}</span>
                  <h3 className="text-sm font-medium text-text truncate">{dec.title}</h3>
                </div>
                <p className="text-xs text-text-tertiary font-mono">{formatDate(dec.date)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {dec.isExample && <ExampleBadge />}
                <StatusBadge status={dec.status} />
                <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-colors" />
              </div>
            </div>
            <p className="text-xs text-text-secondary line-clamp-2">{dec.decision}</p>
            {dec.alternatives.length > 1 && (
              <p className="text-xs text-text-tertiary mt-1">
                {dec.alternatives.length} 个候选方案
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}