import type { Decision } from '@/types/decision';
import decisionsData from '../../../data/engineering/decisions.json';

type DecisionsFile = { decisions: Decision[] };

export function loadDecisions(): Decision[] {
  try {
    const data = decisionsData as DecisionsFile;
    return data.decisions;
  } catch {
    return [];
  }
}

export function loadDecisionById(id: string): Decision | null {
  try {
    const data = decisionsData as DecisionsFile;
    return data.decisions.find((d) => d.id === id) ?? null;
  } catch {
    return null;
  }
}