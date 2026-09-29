import { notFound } from 'next/navigation';
import { loadPapers, loadPaperById } from '@/lib/loaders/papers';
import { loadPaperAnalysisByPaperId } from '@/lib/loaders/paper-analyses';
import { PaperAnalysisDetail } from '@/components/research/PaperAnalysisDetail';
import { PaperAnalysisTemplate } from '@/components/research/PaperAnalysisTemplate';
import { FileText } from 'lucide-react';

export const metadata = { title: 'Paper Analysis — RDK Lab' };

export function generateStaticParams() {
  const papers = loadPapers();
  return papers.map((p) => ({ id: p.id }));
}

export default function PaperAnalysisPage({
  params,
}: {
  params: { id: string };
}) {
  const paper = loadPaperById(params.id);
  if (!paper) notFound();

  const analysis = loadPaperAnalysisByPaperId(params.id);

  if (analysis) {
    return <PaperAnalysisDetail analysis={analysis} paper={paper} />;
  }

  return <PaperAnalysisTemplate paper={paper} />;
}