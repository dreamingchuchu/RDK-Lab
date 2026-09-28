import Link from 'next/link';
import type { ThesisChapter } from '@/types/thesis-chapter';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Placeholder } from '@/components/common/Placeholder';
import { PLACEHOLDERS } from '@/lib/utils/placeholders';

export function ChapterCard({ chapter }: { chapter: ThesisChapter }) {
  const completedEvidence = chapter.requiredEvidence.filter((e) => e.completed).length;
  const totalEvidence = chapter.requiredEvidence.length;

  return (
    <div className="surface p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-text-tertiary">{chapter.order}</span>
          <h3 className="text-base font-medium text-text">{chapter.title}</h3>
        </div>
        <StatusBadge status={chapter.status} />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-text-tertiary">进度</span>
          <span className="font-mono text-text-secondary">{chapter.progress}%</span>
        </div>
        <div className="h-1 bg-surface-hover rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full" style={{ width: `${chapter.progress}%` }} />
        </div>
      </div>

      {chapter.tasks.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-2">Tasks</p>
          <ul className="space-y-1">
            {chapter.tasks.map((task, idx) => (
              <li key={idx} className="text-xs text-text-secondary flex gap-2">
                <span className="text-text-tertiary shrink-0">○</span>
                {task}
              </li>
            ))}
          </ul>
        </div>
      )}

      {chapter.requiredEvidence.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-2">
            Required Evidence ({completedEvidence}/{totalEvidence})
          </p>
          <ul className="space-y-1">
            {chapter.requiredEvidence.map((ev, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2">
                <span className={ev.completed ? 'text-status-completed' : 'text-text-tertiary'}>
                  {ev.completed ? '✓' : '○'}
                </span>
                <span className={ev.completed ? 'text-text-secondary line-through' : 'text-text'}>
                  {ev.description}
                </span>
                {ev.relatedExperimentId && (
                  <Link
                    href={`/experiments/${ev.relatedExperimentId}`}
                    className="text-accent hover:underline ml-1"
                  >
                    {ev.relatedExperimentId}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {chapter.relatedExperiments.length > 0 && (
        <div className="mb-2">
          <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-1">
            Related Experiments
          </p>
          <div className="flex flex-wrap gap-2">
            {chapter.relatedExperiments.map((id) => (
              <Link key={id} href={`/experiments/${id}`} className="tag hover:text-accent">
                {id}
              </Link>
            ))}
          </div>
        </div>
      )}

      {chapter.notes && (
        <p className="text-xs text-text-tertiary italic mt-3">{chapter.notes}</p>
      )}
    </div>
  );
}