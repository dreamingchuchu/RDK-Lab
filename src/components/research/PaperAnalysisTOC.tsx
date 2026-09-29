'use client';

import { PAPER_ANALYSIS_CHAPTERS } from '@/types/paper-analysis';

type PaperAnalysisTOCProps = {
  filledChapters: Set<number>;
};

export function PaperAnalysisTOC({ filledChapters }: PaperAnalysisTOCProps) {
  return (
    <nav className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-3">
        章节目录
      </p>
      <ul className="space-y-0.5">
        {PAPER_ANALYSIS_CHAPTERS.map((ch) => {
          const isFilled = filledChapters.has(ch.order);
          return (
            <li key={ch.order}>
              <a
                href={`#chapter-${ch.order}`}
                className="group flex items-center gap-2 py-1 px-2 rounded text-xs hover:bg-surface-hover transition-colors"
              >
                <span className="font-mono text-text-tertiary w-6 text-right">
                  {String(ch.order).padStart(2, '0')}
                </span>
                <span className={`flex-1 ${isFilled ? 'text-text' : 'text-text-tertiary'}`}>
                  {ch.title}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isFilled ? 'bg-accent' : 'bg-border'}`}
                  title={isFilled ? '已填写' : '待补充'}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}