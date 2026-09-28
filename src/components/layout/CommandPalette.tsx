'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, ArrowLeft, CornerDownLeft } from 'lucide-react';
import type { CommandAction } from '@/types';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const router = useRouter();

  const actions: CommandAction[] = [
    { id: 'go-dashboard', label: 'Go to Dashboard', group: 'navigation', keywords: ['home', 'overview'], perform: () => router.push('/') },
    { id: 'go-roadmap', label: 'Go to Roadmap', group: 'navigation', keywords: ['stage', 'plan'], perform: () => router.push('/roadmap') },
    { id: 'go-logs', label: 'Go to Research Log', group: 'navigation', keywords: ['log', 'timeline'], perform: () => router.push('/research-logs') },
    { id: 'go-papers', label: 'Go to Papers', group: 'navigation', keywords: ['paper', 'literature'], perform: () => router.push('/papers') },
    { id: 'go-knowledge', label: 'Go to Knowledge', group: 'navigation', keywords: ['knowledge', 'note'], perform: () => router.push('/knowledge') },
    { id: 'go-experiments', label: 'Go to Experiments', group: 'navigation', keywords: ['experiment', 'test'], perform: () => router.push('/experiments') },
    { id: 'go-issues', label: 'Go to Issues', group: 'navigation', keywords: ['issue', 'bug'], perform: () => router.push('/issues') },
    { id: 'go-decisions', label: 'Go to Decisions', group: 'navigation', keywords: ['decision', 'adr'], perform: () => router.push('/decisions') },
    { id: 'go-thesis', label: 'Go to Thesis Progress', group: 'navigation', keywords: ['thesis', 'chapter'], perform: () => router.push('/thesis-progress') },
    { id: 'go-materials', label: 'Go to Materials', group: 'navigation', keywords: ['material', 'resource'], perform: () => router.push('/materials') },
    { id: 'go-about', label: 'Go to About', group: 'navigation', keywords: ['about', 'info'], perform: () => router.push('/about') },
    { id: 'new-log', label: 'New Research Log', group: 'create', keywords: ['new', 'add', 'log'], perform: () => router.push('/research-logs/new') },
    { id: 'new-experiment', label: 'New Experiment', group: 'create', keywords: ['new', 'add', 'experiment'], perform: () => router.push('/experiments'), disabled: true },
    { id: 'new-issue', label: 'New Issue', group: 'create', keywords: ['new', 'add', 'issue'], perform: () => router.push('/issues'), disabled: true },
    { id: 'new-decision', label: 'New Decision', group: 'create', keywords: ['new', 'add', 'decision'], perform: () => router.push('/decisions'), disabled: true },
  ];

  const filtered = actions.filter((a) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      a.label.toLowerCase().includes(q) ||
      a.keywords?.some((k) => k.includes(q))
    );
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setOpen((v) => !v);
      return;
    }
    if (!open) return;
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const action = filtered[highlighted];
      if (action && !action.disabled) {
        action.perform();
        setOpen(false);
        setQuery('');
      }
    }
  }, [open, filtered, highlighted]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  if (!open) return null;

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      onClick={() => { setOpen(false); setQuery(''); }}
    >
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
      <div
        className="relative w-full max-w-lg surface shadow-lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="命令面板"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Search className="w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入命令或搜索…"
            className="flex-1 bg-transparent text-sm text-text placeholder:text-text-tertiary outline-none"
            autoFocus
            aria-label="命令输入"
          />
          <kbd className="text-xs font-mono text-text-tertiary px-1.5 py-0.5 border border-border rounded">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 && query && (
            <button
              type="button"
              onClick={handleSearch}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover"
            >
              <Search className="w-4 h-4" />
              搜索 “{query}”
            </button>
          )}
          {filtered.map((action, idx) => (
            <button
              key={action.id}
              type="button"
              onClick={() => {
                if (action.disabled) return;
                action.perform();
                setOpen(false);
                setQuery('');
              }}
              disabled={action.disabled}
              className={`
                w-full flex items-center justify-between gap-2 px-4 py-2 text-sm
                ${action.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                ${idx === highlighted ? 'bg-surface-hover text-text' : 'text-text-secondary hover:bg-surface-hover'}
              `}
            >
              <span className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-text-tertiary w-16">{action.group}</span>
                {action.label}
              </span>
              {idx === highlighted && !action.disabled && (
                <CornerDownLeft className="w-3 h-3 text-text-tertiary" />
              )}
              {action.disabled && <span className="text-xs text-text-tertiary">暂不可用</span>}
            </button>
          ))}
          {query && (
            <button
              type="button"
              onClick={handleSearch}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-accent hover:bg-surface-hover border-t border-border mt-1 pt-3"
            >
              <Search className="w-4 h-4" />
              全局搜索 “{query}”
              <ArrowRight className="w-3 h-3 ml-auto" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}