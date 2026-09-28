import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Experiment } from '@/types/experiment';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ExampleBadge } from '@/components/common/ExampleBadge';
import { formatDate } from '@/lib/utils/dates';

export function ExperimentList({ experiments }: { experiments: Experiment[] }) {
  if (experiments.length === 0) {
    return <p className="text-sm text-text-tertiary py-8 text-center">暂无实验记录</p>;
  }

  return (
    <ul className="space-y-2">
      {experiments.map((exp) => (
        <li key={exp.id}>
          <Link
            href={`/experiments/${exp.id}`}
            className="block surface p-4 hover:bg-surface-hover transition-colors group"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-text-tertiary">{exp.id}</span>
                  <h3 className="text-sm font-medium text-text truncate">{exp.title}</h3>
                </div>
                <p className="text-xs text-text-tertiary font-mono">{formatDate(exp.date)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {exp.isExample && <ExampleBadge />}
                <StatusBadge status={exp.status} />
                <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-colors" />
              </div>
            </div>
            <p className="text-xs text-text-secondary line-clamp-2">{exp.objective}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}