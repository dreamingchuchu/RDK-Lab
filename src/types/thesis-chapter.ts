import type { ChapterStatus, EvidenceItem } from './index';

export type ThesisChapter = {
  id: string;
  order: string;                     // "01"–"07"
  title: string;
  progress: number;                  // 0–100，含撰写+证据齐备度
  status: ChapterStatus;
  tasks: string[];
  requiredEvidence: EvidenceItem[];
  relatedExperiments: string[];
  notes?: string;
};