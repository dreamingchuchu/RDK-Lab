import type {
  StageStatus,
  TaskStatus,
  ExperimentStatus,
  IssueStatus,
  PaperStatus,
  Severity,
} from '@/types';

const config: Record<string, { label: string; color: string }> = {
  planned: { label: '已规划', color: 'text-status-planned' },
  active: { label: '进行中', color: 'text-status-active' },
  blocked: { label: '阻塞', color: 'text-status-blocked' },
  completed: { label: '已完成', color: 'text-status-completed' },
  cancelled: { label: '已取消', color: 'text-status-cancelled' },
  running: { label: '运行中', color: 'text-status-active' },
  failed: { label: '失败', color: 'text-status-blocked' },
  abandoned: { label: '已放弃', color: 'text-status-cancelled' },
  open: { label: '待处理', color: 'text-status-active' },
  investigating: { label: '调查中', color: 'text-status-active' },
  resolved: { label: '已解决', color: 'text-status-completed' },
  closed: { label: '已关闭', color: 'text-status-cancelled' },
  unread: { label: '未读', color: 'text-status-planned' },
  reading: { label: '阅读中', color: 'text-status-active' },
  read: { label: '已读', color: 'text-status-completed' },
  important: { label: '重要', color: 'text-status-blocked' },
  proposed: { label: '提议中', color: 'text-status-active' },
  accepted: { label: '已接受', color: 'text-status-completed' },
  superseded: { label: '已取代', color: 'text-status-cancelled' },
  rejected: { label: '已拒绝', color: 'text-status-cancelled' },
  'not-started': { label: '未开始', color: 'text-status-planned' },
  'in-progress': { label: '进行中', color: 'text-status-active' },
  drafted: { label: '已起草', color: 'text-status-completed' },
  revised: { label: '已修订', color: 'text-status-completed' },
  finalized: { label: '已定稿', color: 'text-status-completed' },
};

const severityConfig: Record<Severity, { label: string; color: string }> = {
  low: { label: 'LOW', color: 'text-status-completed' },
  medium: { label: 'MEDIUM', color: 'text-status-active' },
  high: { label: 'HIGH', color: 'text-status-blocked' },
  critical: { label: 'CRITICAL', color: 'text-status-blocked' },
};

type StatusBadgeProps = {
  status: StageStatus | TaskStatus | ExperimentStatus | IssueStatus | PaperStatus | string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status] ?? { label: status, color: 'text-text-tertiary' };
  return (
    <span className={`status-badge ${c.color}`}>
      {c.label}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  const c = severityConfig[severity];
  return (
    <span className={`status-badge font-mono ${c.color}`}>
      {c.label}
    </span>
  );
}