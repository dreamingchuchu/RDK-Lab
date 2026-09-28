import { GraduationCap } from 'lucide-react';
import { loadThesisChapters } from '@/lib/loaders/thesis';
import { ThesisProgress } from '@/components/thesis/ThesisProgress';

export const metadata = { title: 'Thesis Progress — RDK Lab' };

export default function ThesisProgressPage() {
  const chapters = loadThesisChapters();

  return (
    <div className="max-w-wide">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <GraduationCap className="w-3.5 h-3.5" />
          THESIS
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Thesis Progress</h1>
        <p className="text-sm text-text-secondary mt-1">
          毕业论文进度追踪。进度同时反映撰写完成度与证据齐备度。
        </p>
      </header>

      <ThesisProgress chapters={chapters} />
    </div>
  );
}