import { FlaskConical } from 'lucide-react';
import { loadExperiments } from '@/lib/loaders/experiments';
import { ExperimentList } from '@/components/engineering/ExperimentList';

export const metadata = { title: 'Experiments — RDK Lab' };

export default function ExperimentsPage() {
  const experiments = loadExperiments();

  return (
    <div className="max-w-content">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <FlaskConical className="w-3.5 h-3.5" />
          ENGINEERING
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Experiments</h1>
        <p className="text-sm text-text-secondary mt-1">
          实验记录与结果。未测量指标显示为“未测量”，绝不编造数据。
        </p>
      </header>

      <ExperimentList experiments={experiments} />
    </div>
  );
}