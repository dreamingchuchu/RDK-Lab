'use client';

import { useState } from 'react';
import type { KnowledgeNote } from '@/types/knowledge-note';
import { KnowledgeNoteDetail } from './KnowledgeNoteDetail';
import { EmptyState } from '@/components/common/EmptyState';

export function KnowledgeTree({ notes }: { notes: KnowledgeNote[] }) {
  const [selected, setSelected] = useState<KnowledgeNote | null>(notes[0] ?? null);

  const categories = Array.from(new Set(notes.map((n) => n.category)));

  if (notes.length === 0) {
    return <EmptyState message="暂无知识笔记" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <h2 className="section-title">Categories</h2>
        {categories.map((cat) => {
          const catNotes = notes.filter((n) => n.category === cat);
          return (
            <div key={cat} className="mb-4">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-1.5">
                {cat}
              </p>
              <ul className="space-y-0.5">
                {catNotes.map((note) => (
                  <li key={note.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(note)}
                      className={`
                        w-full text-left px-2 py-1.5 text-sm rounded transition-colors
                        ${selected?.id === note.id
                          ? 'bg-accent-soft text-text font-medium'
                          : 'text-text-secondary hover:text-text hover:bg-surface-hover'}
                      `}
                    >
                      {note.subcategory ? `${note.subcategory} — ` : ''}
                      {note.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="md:col-span-2">
        {selected ? (
          <KnowledgeNoteDetail note={selected} />
        ) : (
          <EmptyState message="选择左侧笔记查看详情" />
        )}
      </div>
    </div>
  );
}