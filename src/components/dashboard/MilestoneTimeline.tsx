import type { Milestone } from '@/types';
import { formatDate } from '@/lib/utils/dates';

const statusColor: Record<Milestone['status'], string> = {
  planned: 'bg-status-planned',
  reached: 'bg-status-completed',
  missed: 'bg-status-blocked',
  'at-risk': 'bg-status-blocked',
};

const statusLabel: Record<Milestone['status'], string> = {
  planned: '已规划',
  reached: '已达成',
  missed: '未达成',
  'at-risk': '有风险',
};

export function MilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  if (milestones.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="section-title">Milestone Timeline</h2>
      <ol className="relative">
        {milestones.map((ms, idx) => (
          <li key={ms.id} className="flex gap-3 pb-4 last:pb-0">
            <div className="flex flex-col items-center shrink-0">
              <span
                className={`w-2.5 h-2.5 rounded-full ${statusColor[ms.status]} ring-4 ring-bg`}
              />
              {idx < milestones.length - 1 && (
                <span className="w-px flex-1 bg-border mt-1" />
              )}
            </div>
            <div className="flex-1 min-w-0 pb-2">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium text-text truncate">
                  <span className="font-mono text-text-tertiary mr-2">
                    {String(ms.order).padStart(2, '0')}
                  </span>
                  {ms.title}
                </p>
                <span className="text-xs font-mono text-text-tertiary shrink-0">
                  {formatDate(ms.targetDate)}
                </span>
              </div>
              {ms.description && (
                <p className="text-xs text-text-tertiary mt-0.5">{ms.description}</p>
              )}
              <span className={`inline-block mt-1 text-xs text-text-tertiary`}>
                {statusLabel[ms.status]}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}