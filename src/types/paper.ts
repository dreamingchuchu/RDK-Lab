import type { PaperStatus } from './index';

export type Paper = {
  id: string;
  title: string;
  authors: string[];
  year: number;
  type?: string;
  university?: string;
  source?: string;
  url?: string;
  topic?: string;
  model?: string;
  hardware?: string;
  dataset?: string;
  methods?: string;
  results?: string;                  // 如实记录原文结论，禁止编造
  relevance?: string;
  status: PaperStatus;
  notes?: string;
  relatedDecisions: string[];
  isExample?: boolean;
};