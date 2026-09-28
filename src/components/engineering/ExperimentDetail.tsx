import Link from 'next/link';
import type { Experiment } from '@/types/experiment';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Placeholder } from '@/components/common/Placeholder';
import { ExampleBanner } from '@/components/common/ExampleBanner';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';
import { MetricChart } from '@/components/charts/MetricChart';
import { formatDate } from '@/lib/utils/dates';
import { PLACEHOLDERS } from '@/lib/utils/placeholders';

export function ExperimentDetail({ experiment }: { experiment: Experiment }) {
  const fields: Array<{ label: string; value?: string }> = [
    { label: 'Hypothesis', value: experiment.hypothesis },
    { label: 'Hardware', value: experiment.hardware },
    { label: 'Software', value: experiment.softwareEnvironment },
    { label: 'Model', value: experiment.model },
    { label: 'Dataset', value: experiment.dataset },
    { label: 'Configuration', value: experiment.configuration },
    { label: 'Variables', value: experiment.variables },
  ];

  return (
    <article className="max-w-content">
      <header className="mb-8">
        <Link href="/experiments" className="text-xs text-text-tertiary hover:text-accent mb-2 inline-block">
          ← 返回实验列表
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs text-text-tertiary">{experiment.id}</span>
          <StatusBadge status={experiment.status} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">{experiment.title}</h1>
        <p className="font-mono text-xs text-text-tertiary">{formatDate(experiment.date)}</p>
      </header>

      {experiment.isExample && <ExampleBanner />}

      <section className="mb-8">
        <h2 className="section-title">Objective</h2>
        <p className="text-base text-text-secondary leading-relaxed">{experiment.objective}</p>
      </section>

      <section className="mb-8">
        <h2 className="section-title">Environment & Configuration</h2>
        <dl className="space-y-2 text-sm">
          {fields.map((f) => (
            <div key={f.label} className="flex gap-3">
              <dt className="w-32 text-text-tertiary shrink-0 text-xs">{f.label}</dt>
              <dd className="text-text-secondary flex-1">
                {f.value ? f.value : <Placeholder kind="pending" />}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-8">
        <h2 className="section-title">Metrics</h2>
        <MetricChart metrics={experiment.metrics} />
      </section>

      <section className="mb-8">
        <h2 className="section-title">Results</h2>
        {experiment.results ? (
          <MarkdownRenderer content={experiment.results} />
        ) : (
          <Placeholder kind="pending" label="结果待补充" />
        )}
      </section>

      <section className="mb-8">
        <h2 className="section-title">Conclusion</h2>
        {experiment.conclusion ? (
          <p className="text-sm text-text-secondary leading-relaxed">{experiment.conclusion}</p>
        ) : (
          <Placeholder kind="pending" label="结论待定" />
        )}
      </section>

      <section className="mb-8">
        <h2 className="section-title">Reproducibility</h2>
        {experiment.reproducibility ? (
          <MarkdownRenderer content={experiment.reproducibility} />
        ) : (
          <Placeholder kind="pending" />
        )}
      </section>

      {(experiment.relatedIssues.length > 0 || experiment.relatedDecisions.length > 0) && (
        <section className="mb-8">
          <h2 className="section-title">Related</h2>
          <div className="text-sm space-y-1">
            {experiment.relatedIssues.length > 0 && (
              <p className="text-text-secondary">
                Issues: {experiment.relatedIssues.map((id) => (
                  <Link key={id} href={`/issues/${id}`} className="text-accent hover:underline ml-1">{id}</Link>
                ))}
              </p>
            )}
            {experiment.relatedDecisions.length > 0 && (
              <p className="text-text-secondary">
                Decisions: {experiment.relatedDecisions.map((id) => (
                  <Link key={id} href={`/decisions/${id}`} className="text-accent hover:underline ml-1">{id}</Link>
                ))}
              </p>
            )}
          </div>
        </section>
      )}

      {experiment.isExample && (
        <p className="text-xs font-mono text-text-tertiary border-t border-border pt-4">
          ※ 示例数据 — 指标中 null 表示“未测量”，绝不编造数值
        </p>
      )}
    </article>
  );
}