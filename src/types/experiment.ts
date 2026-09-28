import type { ExperimentStatus, ExperimentMetrics } from './index';

export type Experiment = {
  id: string;
  title: string;
  date: string;
  status: ExperimentStatus;
  objective: string;
  hypothesis?: string;
  hardware?: string;
  softwareEnvironment?: string;
  model?: string;
  dataset?: string;
  configuration?: string;
  variables?: string;
  metrics: ExperimentMetrics;        // 未测量字段为 null
  results?: string;                  // 禁止编造
  conclusion?: string;               // 禁止编造
  reproducibility?: string;
  relatedIssues: string[];
  relatedDecisions: string[];
  isExample?: boolean;
};