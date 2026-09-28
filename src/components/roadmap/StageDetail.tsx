import Link from 'next/link';
import type { Stage } from '@/types/stage';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Placeholder } from '@/components/common/Placeholder';
import { ExampleBanner } from '@/components/common/ExampleBanner';
import { TaskList } from './TaskList';
import { PlanAdjustmentView } from './PlanAdjustmentView';
import { formatDate } from '@/lib/utils/dates';
import { PLACEHOLDERS } from '@/lib/utils/placeholders';

type StageDetailProps = {
  stage: Stage;
  experimentIds: string[];
  decisionIds: string[];
  logStageMap: Record<string, string>;
};

export function StageDetail({ stage, experimentIds, decisionIds }: StageDetailProps) {
  return (
    <article className="max-w-content">
      <header className="mb-8">
        <Link href="/roadmap" className="text-xs text-text-tertiary hover:text-accent mb-2 inline-block">
          ← 返回路线图
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs text-text-tertiary">
            {stage.id.toUpperCase()}
          </span>
          <StatusBadge status={stage.status} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">{stage.title}</h1>
        <p className="text-base text-text-secondary">{stage.description}</p>
        <div className="flex items-center gap-4 mt-3 text-xs font-mono text-text-tertiary">
          <span>{formatDate(stage.startDate)} → {formatDate(stage.targetDate)}</span>
          <span>进度 {stage.progress}%</span>
        </div>
      </header>

      {stage.isExample && <ExampleBanner />}

      <section className="mb-8">
        <h2 className="section-title">Objective</h2>
        <p className="text-base text-text-secondary leading-relaxed">{stage.objective}</p>
      </section>

      <section className="mb-8">
        <h2 className="section-title">Tasks</h2>
        <TaskList tasks={stage.tasks} />
      </section>

      <section className="mb-8">
        <h2 className="section-title">Exit Criteria</h2>
        {stage.exitCriteria.length > 0 ? (
          <ul className="space-y-2">
            {stage.exitCriteria.map((c, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-text-secondary">
                <span className="text-text-tertiary shrink-0">○</span>
                {c}
              </li>
            ))}
          </ul>
        ) : (
          <Placeholder kind="pending" />
        )}
      </section>

      <section className="mb-8">
        <h2 className="section-title">Risks</h2>
        {stage.risks.length > 0 ? (
          <ul className="space-y-3">
            {stage.risks.map((risk, idx) => (
              <li key={idx} className="surface p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm text-text">{risk.description}</p>
                  <span className="text-xs font-mono text-text-tertiary shrink-0">
                    {risk.impact.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  <span className="text-text-tertiary">缓解：</span>{risk.mitigation}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <Placeholder kind="pending" label="无记录风险" />
        )}
      </section>

      <section className="mb-8">
        <h2 className="section-title">Fallback</h2>
        {stage.fallback ? (
          <p className="text-sm text-text-secondary leading-relaxed">{stage.fallback}</p>
        ) : (
          <Placeholder kind="pending" />
        )}
      </section>

      <section className="mb-8">
        <h2 className="section-title">Evidence</h2>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-xs text-text-tertiary mb-1">关联实验</p>
            {stage.relatedExperiments.length > 0 ? (
              <ul className="space-y-1">
                {stage.relatedExperiments.map((id) => {
                  const valid = experimentIds.includes(id);
                  return (
                    <li key={id}>
                      {valid ? (
                        <Link href={`/experiments/${id}`} className="text-accent hover:underline">
                          {id}
                        </Link>
                      ) : (
                        <Placeholder kind="pending" label={PLACEHOLDERS.invalidRef} />
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <span className="text-text-tertiary">无</span>
            )}
          </div>
          <div>
            <p className="text-xs text-text-tertiary mb-1">关联决策</p>
            {stage.relatedDecisions.length > 0 ? (
              <ul className="space-y-1">
                {stage.relatedDecisions.map((id) => {
                  const valid = decisionIds.includes(id);
                  return (
                    <li key={id}>
                      {valid ? (
                        <Link href={`/decisions/${id}`} className="text-accent hover:underline">
                          {id}
                        </Link>
                      ) : (
                        <Placeholder kind="pending" label={PLACEHOLDERS.invalidRef} />
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <span className="text-text-tertiary">无</span>
            )}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="section-title">Plan vs Actual</h2>
        <div className="surface p-4">
          <PlanAdjustmentView data={stage.planAdjustment} />
        </div>
      </section>

      {stage.notes && (
        <section className="mb-8">
          <h2 className="section-title">Notes</h2>
          <p className="text-sm text-text-secondary leading-relaxed">{stage.notes}</p>
        </section>
      )}

      {stage.isExample && (
        <p className="text-xs font-mono text-text-tertiary border-t border-border pt-4">
          ※ 示例数据（isExample: true）
        </p>
      )}
    </article>
  );
}