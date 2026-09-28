import { notFound } from 'next/navigation';
import { loadDecisions, loadDecisionById } from '@/lib/loaders/decisions';
import { DecisionDetail } from '@/components/engineering/DecisionDetail';

export const metadata = { title: 'Decision Detail — RDK Lab' };

export function generateStaticParams() {
  const decisions = loadDecisions();
  return decisions.map((d) => ({ id: d.id }));
}

export default function DecisionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const decision = loadDecisionById(params.id);
  if (!decision) notFound();

  return <DecisionDetail decision={decision} />;
}