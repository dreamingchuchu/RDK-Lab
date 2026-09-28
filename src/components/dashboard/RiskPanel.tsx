import type { Stage } from '@/types/stage';
import { EmptyState } from '@/components/common/EmptyState';

export function RiskPanel({ stages }: { stages: Stage[] }) {
  const activeStage = stages.find((s) => s.status === 'active');
  const risks = activeStage?.risks ?? [];

  if (risks.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="section-title">Risks</h2>
        <EmptyState message="当前阶段无记录风险" />
      </section>
    );
  }

  const impactColor: Record<string, string> = {
    low: 'text-status-completed',
    medium: 'text-status-active',
    high: 'text-status-blocked',
  };

  return (
    <section className="mb-8">
      <h2 className="section-title">Risks</h2>
      <ul className="space-y-3">
        {risks.map((risk, idx) => (
          <li key={idx} className="surface p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-sm text-text">{risk.description}</p>
              <span className={`text-xs font-mono shrink-0 ${impactColor[risk.impact]}`}>
                {risk.impact.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-text-secondary">
              <span className="text-text-tertiary">缓解：</span>
              {risk.mitigation}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}