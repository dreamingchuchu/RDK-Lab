import { NotebookPen } from 'lucide-react';
import { loadResearchLogs } from '@/lib/loaders/research-logs';
import { loadStages } from '@/lib/loaders/stages';
import { LogTimeline } from '@/components/research/LogTimeline';

export const metadata = { title: 'Research Log — RDK Lab' };

export default function ResearchLogsPage() {
  const logs = loadResearchLogs();
  const stages = loadStages();

  return (
    <div className="max-w-content">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <NotebookPen className="w-3.5 h-3.5" />
          RESEARCH
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Research Log</h1>
        <p className="text-sm text-text-secondary mt-1">
          按时间线记录每日研究进展，支持 Markdown 富文本。
        </p>
      </header>

      <LogTimeline logs={logs} />
    </div>
  );
}