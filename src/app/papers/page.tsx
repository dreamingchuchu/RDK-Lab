import { FileText } from 'lucide-react';
import { loadPapers } from '@/lib/loaders/papers';
import { loadPaperAnalyses } from '@/lib/loaders/paper-analyses';
import { PaperFilters } from '@/components/research/PaperFilters';

export const metadata = { title: 'Papers — RDK Lab' };

export default function PapersPage() {
  const papers = loadPapers();
  const analyzedPaperIds = new Set(loadPaperAnalyses().map((a) => a.paperId));

  return (
    <div className="max-w-content">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <FileText className="w-3.5 h-3.5" />
          RESEARCH
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Papers</h1>
        <p className="text-sm text-text-secondary mt-1">
          论文阅读管理，支持按年份、模型、硬件、状态筛选。点击「深度分析」查看 21 章节阅读笔记。
        </p>
      </header>

      <PaperFilters papers={papers} analyzedPaperIds={analyzedPaperIds} />
    </div>
  );
}