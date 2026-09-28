import { StatCard } from './StatCard';
import { daysSince } from '@/lib/utils/dates';

type StatisticsProps = {
  logCount: number;
  paperCount: number;
  experimentCount: number;
  issueCount: number;
  decisionCount: number;
  knowledgeCount: number;
  chapterCount: number;
  projectStartDate: string;
};

export function Statistics({
  logCount,
  paperCount,
  experimentCount,
  issueCount,
  decisionCount,
  knowledgeCount,
  chapterCount,
  projectStartDate,
}: StatisticsProps) {
  const days = daysSince(projectStartDate);

  return (
    <section className="mb-8">
      <h2 className="section-title">Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Research Logs" value={logCount} />
        <StatCard label="Papers" value={paperCount} />
        <StatCard label="Experiments" value={experimentCount} />
        <StatCard label="Issues" value={issueCount} />
        <StatCard label="Decisions" value={decisionCount} />
        <StatCard label="Knowledge" value={knowledgeCount} />
        <StatCard label="Thesis Chapters" value={chapterCount} unit="/ 7" />
        <StatCard label="Days Since Start" value={days} unit="天" />
      </div>
    </section>
  );
}