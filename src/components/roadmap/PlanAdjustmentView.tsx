import { formatDate } from '@/lib/utils/dates';
import { PLACEHOLDERS } from '@/lib/utils/placeholders';
import type { PlanAdjustment } from '@/types';

export function PlanAdjustmentView({ data }: { data: PlanAdjustment }) {
  const hasDeviation = data.actualDate !== null && data.deviation !== null;

  return (
    <div className="text-xs space-y-1.5">
      <div className="flex gap-3">
        <span className="text-text-tertiary w-20 shrink-0">计划日期</span>
        <span className="font-mono text-text-secondary">{formatDate(data.plannedDate)}</span>
      </div>
      <div className="flex gap-3">
        <span className="text-text-tertiary w-20 shrink-0">实际日期</span>
        {data.actualDate ? (
          <span className="font-mono text-text-secondary">{formatDate(data.actualDate)}</span>
        ) : (
          <span className="font-mono text-text-tertiary">{PLACEHOLDERS.tbd}</span>
        )}
      </div>
      {hasDeviation && (
        <>
          <div className="flex gap-3">
            <span className="text-text-tertiary w-20 shrink-0">偏差</span>
            <span className="text-status-blocked">{data.deviation}</span>
          </div>
          {data.reason && (
            <div className="flex gap-3">
              <span className="text-text-tertiary w-20 shrink-0">调整原因</span>
              <span className="text-text-secondary">{data.reason}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}