import { Map } from 'lucide-react';
import { loadStages } from '@/lib/loaders/stages';
import { StageCard } from '@/components/roadmap/StageCard';

export const metadata = { title: 'Roadmap — RDK Lab' };

export default function RoadmapPage() {
  const stages = loadStages();

  return (
    <div className="max-w-content">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <Map className="w-3.5 h-3.5" />
          RESEARCH
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Roadmap</h1>
        <p className="text-sm text-text-secondary mt-1">
          研究阶段规划与进度追踪。支持动态调整，保留计划与实际对比。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stages.map((stage) => (
          <StageCard key={stage.id} stage={stage} />
        ))}
      </div>
    </div>
  );
}