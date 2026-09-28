import Link from 'next/link';
import type { Issue } from '@/types/issue';
import { StatusBadge, SeverityBadge } from '@/components/common/StatusBadge';
import { Placeholder } from '@/components/common/Placeholder';
import { ExampleBanner } from '@/components/common/ExampleBanner';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';
import { formatDate } from '@/lib/utils/dates';

export function IssueDetail({ issue }: { issue: Issue }) {
  const fields: Array<{ label: string; value?: string }> = [
    { label: 'Environment', value: issue.environment },
    { label: 'Symptom', value: issue.symptom },
    { label: 'Error Message', value: issue.errorMessage },
    { label: 'Attempts', value: issue.attempts },
    { label: 'Hypothesis', value: issue.hypothesis },
    { label: 'Root Cause', value: issue.rootCause },
    { label: 'Solution', value: issue.solution },
    { label: 'Lesson', value: issue.lesson },
  ];

  return (
    <article className="max-w-content">
      <header className="mb-8">
        <Link href="/issues" className="text-xs text-text-tertiary hover:text-accent mb-2 inline-block">
          ← 返回问题列表
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs text-text-tertiary">{issue.id}</span>
          <StatusBadge status={issue.status} />
          <SeverityBadge severity={issue.severity} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">{issue.title}</h1>
        <p className="font-mono text-xs text-text-tertiary">{formatDate(issue.date)}</p>
      </header>

      {issue.isExample && <ExampleBanner />}

      <section className="mb-8">
        <h2 className="section-title">Full Chain</h2>
        <dl className="space-y-5">
          {fields.map((f) => (
            <div key={f.label}>
              <dt className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-1.5">
                {f.label}
              </dt>
              <dd className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {f.value ? (
                  f.value.includes('\n') || f.value.includes('```') ? (
                    <MarkdownRenderer content={f.value} />
                  ) : (
                    f.value
                  )
                ) : (
                  <Placeholder kind="pending" label={issue.status === 'open' || issue.status === 'investigating' ? '待解决' : undefined} />
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {issue.relatedExperiments.length > 0 && (
        <section className="mb-8">
          <h2 className="section-title">Related Experiments</h2>
          <div className="text-sm">
            {issue.relatedExperiments.map((id) => (
              <Link key={id} href={`/experiments/${id}`} className="text-accent hover:underline mr-3">
                {id}
              </Link>
            ))}
          </div>
        </section>
      )}

      {issue.isExample && (
        <p className="text-xs font-mono text-text-tertiary border-t border-border pt-4">
          ※ 示例数据
        </p>
      )}
    </article>
  );
}