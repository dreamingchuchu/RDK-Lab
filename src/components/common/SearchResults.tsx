import Link from 'next/link';
import type { SearchResult, SearchResultType } from '@/types';
import { EmptyState } from './EmptyState';

const typeLabels: Record<SearchResultType, string> = {
  log: 'Research Logs',
  paper: 'Papers',
  paper_analysis: 'Paper Analyses',
  knowledge: 'Knowledge',
  experiment: 'Experiments',
  issue: 'Issues',
  decision: 'Decisions',
};

export function SearchResults({ results }: { results: SearchResult[] }) {
  if (results.length === 0) {
    return <EmptyState message="无匹配结果" description="尝试使用其他关键词" />;
  }

  const groups: Record<SearchResultType, SearchResult[]> = {
    log: [],
    paper: [],
    paper_analysis: [],
    knowledge: [],
    experiment: [],
    issue: [],
    decision: [],
  };
  for (const r of results) {
    groups[r.type].push(r);
  }

  const orderedTypes: SearchResultType[] = ['log', 'paper', 'paper_analysis', 'knowledge', 'experiment', 'issue', 'decision'];

  return (
    <div className="space-y-6">
      {orderedTypes.map((type) => {
        const items = groups[type];
        if (items.length === 0) return null;
        return (
          <section key={type}>
            <h2 className="section-title">
              {typeLabels[type]} ({items.length})
            </h2>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={`${item.type}-${item.id}`}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 -mx-3 rounded hover:bg-surface-hover transition-colors"
                  >
                    <p className="text-sm font-medium text-text">{item.title}</p>
                    {item.snippet && (
                      <p className="text-xs text-text-tertiary mt-0.5 line-clamp-1">{item.snippet}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}