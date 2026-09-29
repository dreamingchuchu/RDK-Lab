'use client';

import Link from 'next/link';
import type { Paper } from '@/types/paper';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ExampleBadge } from '@/components/common/ExampleBadge';
import { BookOpen, ChevronRight } from 'lucide-react';

type PaperListProps = {
  papers: Paper[];
  analyzedPaperIds: Set<string>;
};

export function PaperList({ papers, analyzedPaperIds }: PaperListProps) {
  if (papers.length === 0) {
    return <p className="text-sm text-text-tertiary py-8 text-center">无符合条件的论文</p>;
  }

  return (
    <ul className="space-y-2">
      {papers.map((paper) => {
        const isAnalyzed = analyzedPaperIds.has(paper.id);
        return (
          <li key={paper.id} className="surface p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-text mb-1">{paper.title}</h3>
                <p className="text-xs text-text-tertiary">
                  {paper.authors.join(', ')} · {paper.year}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {paper.isExample && <ExampleBadge />}
                <StatusBadge status={paper.status} />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-text-tertiary">
              {paper.model && <span className="tag">{paper.model}</span>}
              {paper.hardware && <span className="tag">{paper.hardware}</span>}
              {paper.topic && <span className="tag">{paper.topic}</span>}
              {paper.url && (
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline ml-auto"
                >
                  原文 ↗
                </a>
              )}
            </div>
            {paper.notes && (
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">{paper.notes}</p>
            )}
            <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
              <Link
                href={`/papers/${paper.id}`}
                className="flex items-center gap-1.5 text-xs text-accent hover:underline"
              >
                <BookOpen className="w-3.5 h-3.5" />
                深度分析
                <ChevronRight className="w-3 h-3" />
              </Link>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  isAnalyzed
                    ? 'bg-accent/10 text-accent'
                    : 'bg-surface-hover text-text-tertiary'
                }`}
              >
                {isAnalyzed ? '已分析' : '未分析'}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}