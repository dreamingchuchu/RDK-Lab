'use client';

import type { Paper } from '@/types/paper';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ExampleBadge } from '@/components/common/ExampleBadge';

type PaperListProps = {
  papers: Paper[];
};

export function PaperList({ papers }: PaperListProps) {
  if (papers.length === 0) {
    return <p className="text-sm text-text-tertiary py-8 text-center">无符合条件的论文</p>;
  }

  return (
    <ul className="space-y-2">
      {papers.map((paper) => (
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
        </li>
      ))}
    </ul>
  );
}