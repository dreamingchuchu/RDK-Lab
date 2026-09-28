'use client';

import { Placeholder } from '@/components/common/Placeholder';
import type { MetricValue, MetricKey } from '@/types';

type MetricChartProps = {
  metrics: Record<MetricKey, MetricValue>;
};

const metricLabels: Record<MetricKey, string> = {
  fps: 'FPS',
  latency: 'Latency (ms)',
  map: 'mAP',
  precision: 'Precision',
  recall: 'Recall',
  cpuUsage: 'CPU Usage (%)',
  memory: 'Memory (MB)',
  bpuUsage: 'BPU Usage (%)',
  modelSize: 'Model Size (MB)',
};

const metricUnits: Record<MetricKey, string> = {
  fps: 'fps',
  latency: 'ms',
  map: '',
  precision: '',
  recall: '',
  cpuUsage: '%',
  memory: 'MB',
  bpuUsage: '%',
  modelSize: 'MB',
};

export function MetricChart({ metrics }: MetricChartProps) {
  const entries = Object.entries(metrics) as Array<[MetricKey, MetricValue]>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {entries.map(([key, value]) => (
        <div key={key} className="surface p-3">
          <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-1.5">
            {metricLabels[key]}
          </p>
          {value === null ? (
            <Placeholder kind="unmeasured" />
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold font-mono text-text">{value}</span>
              {metricUnits[key] && (
                <span className="text-xs text-text-tertiary">{metricUnits[key]}</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}