import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadResearchLogs, loadResearchLogById } from '@/lib/loaders/research-logs';
import { loadStages } from '@/lib/loaders/stages';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';
import { ExampleBanner } from '@/components/common/ExampleBanner';
import { formatDate } from '@/lib/utils/dates';

export const metadata = { title: 'Log Detail — RDK Lab' };

export function generateStaticParams() {
  const logs = loadResearchLogs();
  return logs.map((l) => ({ id: l.id }));
}

export default function LogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const log = loadResearchLogById(params.id);
  if (!log) notFound();

  const stages = loadStages();
  const stage = log.stage ? stages.find((s) => s.id === log.stage) : undefined;

  return (
    <article className="max-w-content">
      <header className="mb-8">
        <Link href="/research-logs" className="text-xs text-text-tertiary hover:text-accent mb-2 inline-block">
          ← 返回研究日志
        </Link>
        <p className="font-mono text-xs text-text-tertiary mb-1">{formatDate(log.date)}</p>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">{log.title}</h1>
        <p className="text-base text-text-secondary">{log.summary}</p>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {log.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
          {stage && (
            <Link href={`/roadmap/${stage.id}`} className="tag hover:text-accent">
              {stage.title}
            </Link>
          )}
        </div>
      </header>

      {log.isExample && <ExampleBanner />}

      <MarkdownRenderer content={log.content} />

      {(log.relatedExperiments.length > 0 || log.relatedPapers.length > 0 || log.relatedIssues.length > 0) && (
        <footer className="mt-8 pt-4 border-t border-border text-xs text-text-tertiary space-y-1">
          <p>关联条目：</p>
          {log.relatedExperiments.length > 0 && (
            <p>实验：{log.relatedExperiments.map((id) => (
              <Link key={id} href={`/experiments/${id}`} className="text-accent hover:underline ml-1">{id}</Link>
            ))}</p>
          )}
          {log.relatedPapers.length > 0 && (
            <p>论文：{log.relatedPapers.map((id) => (
              <Link key={id} href="/papers" className="text-accent hover:underline ml-1">{id}</Link>
            ))}</p>
          )}
          {log.relatedIssues.length > 0 && (
            <p>问题：{log.relatedIssues.map((id) => (
              <Link key={id} href={`/issues/${id}`} className="text-accent hover:underline ml-1">{id}</Link>
            ))}</p>
          )}
        </footer>
      )}

      {log.isExample && (
        <p className="text-xs font-mono text-text-tertiary border-t border-border pt-4 mt-4">
          ※ 示例数据
        </p>
      )}
    </article>
  );
}