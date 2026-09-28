import type { ResearchLog } from '@/types/research-log';
import logsData from '../../../data/research/research-logs.json';
import { sortByDateDesc } from '@/lib/utils/dates';

type LogsFile = { logs: ResearchLog[] };

export function loadResearchLogs(): ResearchLog[] {
  try {
    const data = logsData as LogsFile;
    return sortByDateDesc(data.logs);
  } catch {
    return [];
  }
}

export function loadResearchLogById(id: string): ResearchLog | null {
  try {
    const data = logsData as LogsFile;
    return data.logs.find((l) => l.id === id) ?? null;
  } catch {
    return null;
  }
}