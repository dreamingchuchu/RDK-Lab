import type { Paper } from '@/types/paper';
import { PAPER_ANALYSIS_CHAPTERS, READING_PRINCIPLE } from '@/types/paper-analysis';
import { Placeholder } from '@/components/common/Placeholder';
import { FileText } from 'lucide-react';

type PaperAnalysisTemplateProps = {
  paper: Paper;
};

export function PaperAnalysisTemplate({ paper }: PaperAnalysisTemplateProps) {
  return (
    <div className="max-w-content">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <FileText className="w-3.5 h-3.5" />
          RESEARCH / PAPER ANALYSIS
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{paper.title}</h1>
        <p className="text-sm text-text-secondary mt-1">
          {paper.authors.join(', ')} · {paper.year}
        </p>
      </header>

      <div className="surface p-4 mb-8 border-l-2 border-amber-500">
        <p className="text-sm text-text">
          此论文尚无深度分析记录。以下是 21 章节空模板，可按阅读进度渐进式填写。
        </p>
        <p className="text-xs text-text-tertiary mt-1">
          在 <code className="font-mono">data/research/paper-analyses.json</code> 中添加一条 paperId 为 <code className="font-mono">{paper.id}</code> 的记录即可。
        </p>
      </div>

      <div className="surface p-3 mb-8 border-l-2 border-accent">
        <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-1">阅读原则</p>
        <p className="text-sm text-text leading-relaxed">{READING_PRINCIPLE}</p>
      </div>

      <div className="space-y-12">
        {PAPER_ANALYSIS_CHAPTERS.map((ch) => (
          <section key={ch.order} id={`chapter-${ch.order}`} className="scroll-mt-8">
            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-border">
              <span className="text-xs font-mono text-text-tertiary">
                {String(ch.order).padStart(2, '0')}
              </span>
              <h2 className="text-lg font-semibold tracking-tight">{ch.title}</h2>
            </div>
            <Placeholder kind="pending" label="待补充" />
          </section>
        ))}
      </div>
    </div>
  );
}