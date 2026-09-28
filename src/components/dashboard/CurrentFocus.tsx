import type { Stage } from '@/types/stage';
import { EmptyState } from '@/components/common/EmptyState';
import { PLACEHOLDERS } from '@/lib/utils/placeholders';

export function CurrentFocus({ stages }: { stages: Stage[] }) {
  const activeStage = stages.find((s) => s.status === 'active');
  const focusTask = activeStage?.tasks.find((t) => t.status === 'active');

  if (!focusTask) {
    return (
      <section className="mb-8">
        <h2 className="section-title">Current Focus</h2>
        <EmptyState message="暂无进行中任务" />
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="section-title">Current Focus</h2>
      <div className="surface p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-medium text-text">{focusTask.title}</h3>
          <span className="status-badge text-status-active border-status-active/30">
            进行中
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-text-tertiary mb-0.5">优先级</p>
            <p className="text-text-secondary">{focusTask.priority ?? PLACEHOLDERS.tbd}</p>
          </div>
          <div>
            <p className="text-text-tertiary mb-0.5">预计耗时</p>
            <p className="text-text-secondary">{focusTask.estimatedTime ?? PLACEHOLDERS.tbd}</p>
          </div>
          <div className="col-span-2">
            <p className="text-text-tertiary mb-0.5">所属阶段</p>
            <p className="text-text-secondary">
              {activeStage ? `${activeStage.id.toUpperCase()} · ${activeStage.title}` : PLACEHOLDERS.invalidRef}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}