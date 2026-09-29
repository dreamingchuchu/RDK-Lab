import type { PaperAnalysis } from '@/types/paper-analysis';
import paperAnalysesData from '../../../data/research/paper-analyses.json';

type PaperAnalysesFile = { paperAnalyses: PaperAnalysis[] };

export function loadPaperAnalyses(): PaperAnalysis[] {
  try {
    const data = paperAnalysesData as PaperAnalysesFile;
    return data.paperAnalyses;
  } catch {
    return [];
  }
}

export function loadPaperAnalysisById(id: string): PaperAnalysis | null {
  return loadPaperAnalyses().find((a) => a.id === id) ?? null;
}

export function loadPaperAnalysisByPaperId(paperId: string): PaperAnalysis | null {
  return loadPaperAnalyses().find((a) => a.paperId === paperId) ?? null;
}