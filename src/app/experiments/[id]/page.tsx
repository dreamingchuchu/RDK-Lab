import { notFound } from 'next/navigation';
import { loadExperiments, loadExperimentById } from '@/lib/loaders/experiments';
import { ExperimentDetail } from '@/components/engineering/ExperimentDetail';

export const metadata = { title: 'Experiment Detail — RDK Lab' };

export function generateStaticParams() {
  const experiments = loadExperiments();
  return experiments.map((e) => ({ id: e.id }));
}

export default function ExperimentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const experiment = loadExperimentById(params.id);
  if (!experiment) notFound();

  return <ExperimentDetail experiment={experiment} />;
}