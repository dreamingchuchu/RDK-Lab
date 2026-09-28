import type { Issue } from '@/types/issue';
import issuesData from '../../../data/engineering/issues.json';

type IssuesFile = { issues: Issue[] };

export function loadIssues(): Issue[] {
  try {
    const data = issuesData as IssuesFile;
    return data.issues;
  } catch {
    return [];
  }
}

export function loadIssueById(id: string): Issue | null {
  try {
    const data = issuesData as IssuesFile;
    return data.issues.find((i) => i.id === id) ?? null;
  } catch {
    return null;
  }
}