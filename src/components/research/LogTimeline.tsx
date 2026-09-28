import type { ResearchLog } from '@/types/research-log';
import { LogCard } from './LogCard';
import { EmptyState } from '@/components/common/EmptyState';

export function LogTimeline({ logs }: { logs: ResearchLog[] }) {
  if (logs.length === 0) {
    return <EmptyState message="暂无研究日志" action={{ label: '查看新建模板', href: '/research-logs/new' }} />;
  }

  return (
    <div className="relative">
      <div className="absolute left-2 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
      <ol className="space-y-4">
        {logs.map((log) => (
          <li key={log.id} className="relative pl-6">
            <span className="absolute left-1 top-4 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-bg" />
            <LogCard log={log} />
          </li>
        ))}
      </ol>
    </div>
  );
}