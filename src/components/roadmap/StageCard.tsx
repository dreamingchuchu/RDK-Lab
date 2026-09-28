import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Stage } from '@/types/stage';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatDate } from '@/lib/utils/dates';

export function StageCard({ stage }: { stage: Stage }) {
  const completedTasks = stage.tasks.filter((t) => t.status === 'completed').length;

  return (
    <Link
      href={`/roadmap/${stage.id}`}
      className="block surface p-5 hover:bg-surface-hover transition-colors group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-text-tertiary">
              {String(stage.order).padStart(2, '0')}
            </span>
            <h3 className="text-base font-medium text-text truncate">{stage.title}</h3>
          </div>
          <StatusBadge status={stage.status} />
        </div>
        <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-colors shrink-0" />
      </div>

      <p className="text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed">
        {stage.description}
      </p>

      <div className="flex items-center justify-between text-xs text-text-tertiary mb-2">
        <span className="font-mono">
          {formatDate(stage.startDate)} → {formatDate(stage.targetDate)}
        </span>
        <span>{completedTasks}/{stage.tasks.length} tasks</span>
      </div>

      <div className="h-1 bg-surface-hover rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full"
          style={{ width: `${stage.progress}%` }}
        />
      </div>
    </Link>
  );
}