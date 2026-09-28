import type { IssueStatus, Severity } from './index';

export type Issue = {
  id: string;
  title: string;
  date: string;
  status: IssueStatus;
  severity: Severity;
  stage?: string;
  environment?: string;
  symptom?: string;
  errorMessage?: string;
  attempts?: string;
  hypothesis?: string;
  rootCause?: string;
  solution?: string;
  lesson?: string;
  relatedExperiments: string[];
  isExample?: boolean;
};