import type { ThesisChapter } from '@/types/thesis-chapter';
import { ChapterCard } from './ChapterCard';

export function ThesisProgress({ chapters }: { chapters: ThesisChapter[] }) {
  const totalProgress = chapters.length > 0
    ? Math.round(chapters.reduce((sum, c) => sum + c.progress, 0) / chapters.length)
    : 0;

  return (
    <div>
      <div className="surface p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-text">总体进度</p>
          <span className="font-mono text-sm text-text-secondary">{totalProgress}%</span>
        </div>
        <div className="h-1.5 bg-surface-hover rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full" style={{ width: `${totalProgress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </div>
  );
}