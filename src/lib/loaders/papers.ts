import type { Paper } from '@/types/paper';
import papersData from '../../../data/research/papers.json';

type PapersFile = { papers: Paper[] };

export function loadPapers(): Paper[] {
  try {
    const data = papersData as PapersFile;
    return data.papers;
  } catch {
    return [];
  }
}