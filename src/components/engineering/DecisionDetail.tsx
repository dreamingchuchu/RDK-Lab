import Link from 'next/link';
import type { Decision } from '@/types/decision';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Placeholder } from '@/components/common/Placeholder';
import { ExampleBanner } from '@/components/common/ExampleBanner';
import { formatDate } from '@/lib/utils/dates';
import { PLACEHOLDERS } from '@/lib/utils/placeholders';

export function DecisionDetail({ decision }: { decision: Decision }) {
  return (
    <article className="max-w-content">
      <header className="mb-8">
        <Link href="/decisions" className="text-xs text-text-tertiary hover:text-accent mb-2 inline-block">
          ← 返回决策列表
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-sm text-accent">{decision.id}</span>
          <StatusBadge status={decision.status} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">{decision.title}</h1>
        <p className="font-mono text-xs text-text-tertiary">{formatDate(decision.date)}</p>
      </header>

      {decision.isExample && <ExampleBanner />}

      <section className="mb-8">
        <h2 className="section-title">Context</h2>
        <p className="text-base text-text-secondary leading-relaxed">{decision.context}</p>
      </section>

      <section className="mb-8">
        <h2 className="section-title">Decision</h2>
        <p className="text-base text-text-secondary leading-relaxed">{decision.decision}</p>
      </section>

      <section className="mb-8">
        <h2 className="section-title">Alternatives</h2>
        {decision.alternatives.length > 0 ? (
          <ul className="space-y-2">
            {decision.alternatives.map((alt, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-text-secondary">
                <span className="text-text-tertiary shrink-0 font-mono">{idx + 1}.</span>
                <span className="leading-relaxed">{alt}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Placeholder kind="pending" label="未记录备选方案" />
        )}
      </section>

      <section className="mb-8">
        <h2 className="section-title">Reasons</h2>
        <p className="text-sm text-text-secondary leading-relaxed">{decision.reasons}</p>
      </section>

      {decision.evidence && (
        <section className="mb-8">
          <h2 className="section-title">Evidence</h2>
          <p className="text-sm text-text-secondary leading-relaxed">{decision.evidence}</p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="section-title">Confidence</h2>
        <p className="text-sm text-text-secondary">
          {decision.confidence ?? PLACEHOLDERS.tbd}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="section-title">Revisit Condition</h2>
        <p className="text-sm text-text-secondary leading-relaxed">{decision.revisitCondition}</p>
      </section>

      {decision.isExample && (
        <p className="text-xs font-mono text-text-tertiary border-t border-border pt-4">
          ※ 示例数据 — 应用方向以候选呈现，不写死任一场景为最终确定
        </p>
      )}
    </article>
  );
}