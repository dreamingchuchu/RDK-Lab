export type ResearchLog = {
  id: string;
  date: string;
  title: string;
  summary: string;
  tags: string[];
  stage?: string;                    // 关联阶段 id
  relatedExperiments: string[];
  relatedPapers: string[];
  relatedIssues: string[];
  content: string;                   // Markdown 正文
  isExample?: boolean;
};