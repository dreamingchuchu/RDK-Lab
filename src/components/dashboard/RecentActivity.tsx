import Link from 'next/link';
import type { ResearchLog } from '@/types/research-log';
import type { Experiment } from '@/types/experiment';
import type { Issue } from '@/types/issue';
import type { Decision } from '@/types/decision';
import type { Paper } from '@/types/paper';
import { formatDate } from '@/lib/utils/dates';

type ActivityItem = {
  type: 'log' | 'experiment' | 'issue' | 'decision' | 'paper';
  id: string;
  title: string;
  date: string;
  href: string;
};

const typeLabel: Record<ActivityItem['type'], string> = {
  log: 'LOG',
  experiment: 'EXP',
  issue: 'ISSUE',
  decision: 'DEC',
  paper: 'PAPER',
};

const typeColor: Record<ActivityItem['type'], string> = {
  log: 'text-status-active',
  experiment: 'text-status-completed',
  issue: 'text-status-blocked',
  decision: 'text-accent',
  paper: 'text-status-planned',
};

type RecentActivityProps = {
  logs: ResearchLog[];
  experiments: Experiment[];
  issues: Issue[];
  decisions: Decision[];
  papers: Paper[];
};

export function RecentActivity({
  logs,
  experiments,
  issues,
  decisions,
  papers,
}: RecentActivityProps) {
  const items: ActivityItem[] = [
    ...logs.map((l) => ({ type: 'log' as const, id: l.id, title: l.title, date: l.date, href: `/research-logs/${l.id}` })),
    ...experiments.map((e) => ({ type: 'experiment' as const, id: e.id, title: e.title, date: e.date, href: `/experiments/${e.id}` })),
    ...issues.map((i) => ({ type: 'issue' as const, id: i.id, title: i.title, date: i.date, href: `/issues/${i.id}` })),
    ...decisions.map((d) => ({ type: 'decision' as const, id: d.id, title: d.title, date: d.date, href: `/decisions/${d.id}` })),
  ];

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const recent = items.slice(0, 8);

  if (recent.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="section-title">Recent Activity</h2>
        <p className="text-sm text-text-tertiary">暂无活动记录</p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="section-title">Recent Activity</h2>
      <ul className="space-y-1">
        {recent.map((item) => (
          <li key={`${item.type}-${item.id}`}>
            <Link
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 -mx-3 rounded hover:bg-surface-hover transition-colors group"
            >
              <span className={`font-mono text-xs w-12 shrink-0 ${typeColor[item.type]}`}>
                {typeLabel[item.type]}
              </span>
              <span className="text-sm text-text-secondary group-hover:text-text truncate flex-1">
                {item.title}
              </span>
              <span className="font-mono text-xs text-text-tertiary shrink-0">
                {formatDate(item.date)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}