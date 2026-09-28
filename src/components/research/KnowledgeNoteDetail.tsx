import Link from 'next/link';
import type { KnowledgeNote } from '@/types/knowledge-note';
import { Placeholder } from '@/components/common/Placeholder';
import { PLACEHOLDERS, formatOptionalString } from '@/lib/utils/placeholders';

export function KnowledgeNoteDetail({ note }: { note: KnowledgeNote }) {
  const dimensions: Array<{ key: string; label: string; value?: string }> = [
    { key: 'what', label: 'What', value: note.what },
    { key: 'why', label: 'Why', value: note.why },
    { key: 'how', label: 'How', value: note.how },
    { key: 'example', label: 'Example', value: note.example },
    { key: 'inThisProject', label: 'In this project', value: note.inThisProject },
    { key: 'myUnderstanding', label: 'My understanding', value: note.myUnderstanding },
  ];

  return (
    <article className="surface p-6">
      <header className="mb-6">
        <p className="font-mono text-xs text-text-tertiary mb-1">
          {note.category}{note.subcategory ? ` / ${note.subcategory}` : ''}
        </p>
        <h2 className="text-lg font-medium text-text">{note.title}</h2>
      </header>

      <dl className="space-y-5">
        {dimensions.map((dim) => (
          <div key={dim.key}>
            <dt className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-1.5">
              {dim.label}
            </dt>
            <dd className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
              {dim.value ? dim.value : <Placeholder kind="pending" />}
            </dd>
          </div>
        ))}

        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-1.5">
            Related papers
          </dt>
          <dd>
            {note.relatedPapers.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {note.relatedPapers.map((id) => (
                  <Link key={id} href="/papers" className="tag hover:text-accent">
                    {id}
                  </Link>
                ))}
              </div>
            ) : (
              <span className="text-xs text-text-tertiary">无</span>
            )}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-1.5">
            Related experiments
          </dt>
          <dd>
            {note.relatedExperiments.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {note.relatedExperiments.map((id) => (
                  <Link key={id} href={`/experiments/${id}`} className="tag hover:text-accent">
                    {id}
                  </Link>
                ))}
              </div>
            ) : (
              <span className="text-xs text-text-tertiary">无</span>
            )}
          </dd>
        </div>
      </dl>

      {note.isExample && (
        <p className="text-xs font-mono text-text-tertiary border-t border-border pt-3 mt-5">
          ※ 示例数据
        </p>
      )}
    </article>
  );
}