import { BookOpen } from 'lucide-react';
import { loadKnowledgeNotes } from '@/lib/loaders/knowledge';
import { KnowledgeTree } from '@/components/research/KnowledgeTree';

export const metadata = { title: 'Knowledge — RDK Lab' };

export default function KnowledgePage() {
  const notes = loadKnowledgeNotes();

  return (
    <div className="max-w-wide">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          RESEARCH
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Knowledge Base</h1>
        <p className="text-sm text-text-secondary mt-1">
          技术知识笔记，按 RDK / Object Detection / Deployment 三大分类组织。
        </p>
      </header>

      <KnowledgeTree notes={notes} />
    </div>
  );
}