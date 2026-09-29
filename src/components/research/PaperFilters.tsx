'use client';

import { useMemo, useState } from 'react';
import type { Paper } from '@/types/paper';
import { PaperList } from './PaperList';

export function PaperFilters({ papers, analyzedPaperIds }: { papers: Paper[]; analyzedPaperIds: Set<string> }) {
  const [yearFilter, setYearFilter] = useState<string>('');
  const [modelFilter, setModelFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const years = useMemo(() => {
    return Array.from(new Set(papers.map((p) => String(p.year)))).sort();
  }, [papers]);

  const models = useMemo(() => {
    return Array.from(new Set(papers.map((p) => p.model).filter(Boolean))) as string[];
  }, [papers]);

  const statuses = ['unread', 'reading', 'read', 'important'];

  const filtered = useMemo(() => {
    return papers.filter((p) => {
      if (yearFilter && String(p.year) !== yearFilter) return false;
      if (modelFilter && p.model !== modelFilter) return false;
      if (statusFilter && p.status !== statusFilter) return false;
      return true;
    });
  }, [papers, yearFilter, modelFilter, statusFilter]);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6 text-xs">
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="bg-surface border border-border rounded px-2 py-1 text-text-secondary"
          aria-label="按年份筛选"
        >
          <option value="">全部年份</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          value={modelFilter}
          onChange={(e) => setModelFilter(e.target.value)}
          className="bg-surface border border-border rounded px-2 py-1 text-text-secondary"
          aria-label="按模型筛选"
        >
          <option value="">全部模型</option>
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-surface border border-border rounded px-2 py-1 text-text-secondary"
          aria-label="按状态筛选"
        >
          <option value="">全部状态</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span className="text-text-tertiary self-center">
          共 {filtered.length} 篇
        </span>
      </div>
      <PaperList papers={filtered} analyzedPaperIds={analyzedPaperIds} />
    </div>
  );
}