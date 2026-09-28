import type { ThesisChapter } from '@/types/thesis-chapter';
import chaptersData from '../../../data/thesis/thesis-chapters.json';

type ChaptersFile = { chapters: ThesisChapter[] };

export function loadThesisChapters(): ThesisChapter[] {
  try {
    const data = chaptersData as ChaptersFile;
    return [...data.chapters].sort((a, b) => a.order.localeCompare(b.order));
  } catch {
    return [];
  }
}