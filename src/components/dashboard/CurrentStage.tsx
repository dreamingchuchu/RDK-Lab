import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Stage } from '@/types/stage';
import { formatDate } from '@/lib/utils/dates';
import { EmptyState } from '@/components/common/EmptyState';

export function CurrentStage({ stages }: { stages: Stage[] }) {
  const activeStage = stages.find((s) => s.status === 'active');

  if (!activeStage) {
    return (
      <section className="mb-8">
        <h2 className="section-title">Current Stage</h2>
        <EmptyState message="暂无进行中阶段" description="所有阶段均处于规划或已完成状态" />
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="section-title">Current Stage</h2>
      <Link
        href={`/roadmap/${activeStage.id}`}
        className="block surface p-5 hover:bg-surface-hover transition-colors group"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-mono text-xs text-text-tertiary mb-1">
              {activeStage.id.toUpperCase()}
            </p>
            <h3 className="text-lg font-medium text-text">{activeStage.title}</h3>
          </div>
          <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-colors" />
        </div>
        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
          {activeStage.description}
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex gap-3">
            <span className="text-text-tertiary w-20 shrink-0">目标</span>
            <span className="text-text-secondary">{activeStage.objective}</span>
          </div>
          <div className="flex gap-3">
            <span className="text-text-tertiary w-20 shrink-0">开始日期</span>
            <span className="font-mono text-text-secondary">{formatDate(activeStage.startDate)}</span>
          </div>
          <div className="flex gap-3">
            <span className="text-text-tertiary w-20 shrink-0">预计完成</span>
            <span className="font-mono text-text-secondary">{formatDate(activeStage.targetDate)}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-text-tertiary">进度</span>
            <span className="font-mono text-text-secondary">{activeStage.progress}%</span>
          </div>
          <div className="h-1 bg-surface-hover rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full"
              style={{ width: `${activeStage.progress}%` }}
            />
          </div>
        </div>
      </Link>
    </section>
  );
}