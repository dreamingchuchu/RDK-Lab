import { ProjectHeader } from '@/components/dashboard/ProjectHeader';
import { CurrentStage } from '@/components/dashboard/CurrentStage';
import { CurrentFocus } from '@/components/dashboard/CurrentFocus';
import { MilestoneTimeline } from '@/components/dashboard/MilestoneTimeline';
import { Statistics } from '@/components/dashboard/Statistics';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { RiskPanel } from '@/components/dashboard/RiskPanel';
import { loadStages, loadMilestones } from '@/lib/loaders/stages';
import { loadResearchLogs } from '@/lib/loaders/research-logs';
import { loadPapers } from '@/lib/loaders/papers';
import { loadKnowledgeNotes } from '@/lib/loaders/knowledge';
import { loadExperiments } from '@/lib/loaders/experiments';
import { loadIssues } from '@/lib/loaders/issues';
import { loadDecisions } from '@/lib/loaders/decisions';
import { loadThesisChapters } from '@/lib/loaders/thesis';

export default function DashboardPage() {
  const stages = loadStages();
  const milestones = loadMilestones();
  const logs = loadResearchLogs();
  const papers = loadPapers();
  const knowledge = loadKnowledgeNotes();
  const experiments = loadExperiments();
  const issues = loadIssues();
  const decisions = loadDecisions();
  const chapters = loadThesisChapters();

  return (
    <div>
      <ProjectHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CurrentStage stages={stages} />
          <CurrentFocus stages={stages} />
          <RecentActivity
            logs={logs}
            experiments={experiments}
            issues={issues}
            decisions={decisions}
            papers={papers}
          />
        </div>

        <div className="lg:col-span-1">
          <MilestoneTimeline milestones={milestones} />
          <RiskPanel stages={stages} />
        </div>
      </div>

      <Statistics
        logCount={logs.length}
        paperCount={papers.length}
        experimentCount={experiments.length}
        issueCount={issues.length}
        decisionCount={decisions.length}
        knowledgeCount={knowledge.length}
        chapterCount={chapters.length}
        projectStartDate="2026-09-15"
      />
    </div>
  );
}