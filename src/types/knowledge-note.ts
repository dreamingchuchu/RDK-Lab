import type { KnowledgeCategory } from './index';

export type KnowledgeNote = {
  id: string;
  category: KnowledgeCategory;
  subcategory?: string;        // 如 RDK X3、YOLO、INT8 等
  title: string;
  what: string;
  why: string;
  how: string;
  example?: string;
  inThisProject?: string;
  myUnderstanding?: string;
  relatedPapers: string[];
  relatedExperiments: string[];
  isExample?: boolean;
};