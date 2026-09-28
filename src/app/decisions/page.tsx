import { GitBranch } from 'lucide-react';
import { loadDecisions } from '@/lib/loaders/decisions';
import { DecisionList } from '@/components/engineering/DecisionList';

export const metadata = { title: 'Decisions — RDK Lab' };

export default function DecisionsPage() {
  const decisions = loadDecisions();

  return (
    <div className="max-w-content">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <GitBranch className="w-3.5 h-3.5" />
          ENGINEERING
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Decisions</h1>
        <p className="text-sm text-text-secondary mt-1">
          技术路线决策日志。应用方向以候选列表呈现，支持后续变更。
        </p>
      </header>

      <DecisionList decisions={decisions} />
    </div>
  );
}