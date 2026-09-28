import { CircleAlert } from 'lucide-react';
import { loadIssues } from '@/lib/loaders/issues';
import { IssueList } from '@/components/engineering/IssueList';

export const metadata = { title: 'Issues — RDK Lab' };

export default function IssuesPage() {
  const issues = loadIssues();

  return (
    <div className="max-w-content">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <CircleAlert className="w-3.5 h-3.5" />
          ENGINEERING
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Issues</h1>
        <p className="text-sm text-text-secondary mt-1">
          问题追踪，记录从症状到根因到解决方案的全链路。
        </p>
      </header>

      <IssueList issues={issues} />
    </div>
  );
}