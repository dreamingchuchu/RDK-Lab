import { notFound } from 'next/navigation';
import { loadStages, loadStageById } from '@/lib/loaders/stages';
import { loadExperiments } from '@/lib/loaders/experiments';
import { loadDecisions } from '@/lib/loaders/decisions';
import { StageDetail } from '@/components/roadmap/StageDetail';

export const metadata = { title: 'Stage Detail — RDK Lab' };

export function generateStaticParams() {
  const stages = loadStages();
  return stages.map((s) => ({ stageId: s.id }));
}

export default function StageDetailPage({
  params,
}: {
  params: { stageId: string };
}) {
  const stage = loadStageById(params.stageId);
  if (!stage) notFound();

  const experiments = loadExperiments();
  const decisions = loadDecisions();

  return (
    <StageDetail
      stage={stage}
      experimentIds={experiments.map((e) => e.id)}
      decisionIds={decisions.map((d) => d.id)}
      logStageMap={{}}
    />
  );
}