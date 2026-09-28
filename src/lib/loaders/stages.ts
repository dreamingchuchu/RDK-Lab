import type { Stage } from '@/types/stage';
import type { Milestone } from '@/types';
import stagesData from '../../../data/roadmap/stages.json';
import milestonesData from '../../../data/roadmap/milestones.json';
import { sortByOrder } from '@/lib/utils/dates';

type StagesFile = { stages: Stage[] };
type MilestonesFile = { milestones: Milestone[] };

export function loadStages(): Stage[] {
  try {
    const data = stagesData as StagesFile;
    return sortByOrder(data.stages);
  } catch {
    return [];
  }
}

export function loadStageById(id: string): Stage | null {
  try {
    const data = stagesData as StagesFile;
    return data.stages.find((s) => s.id === id) ?? null;
  } catch {
    return null;
  }
}

export function loadMilestones(): Milestone[] {
  try {
    const data = milestonesData as MilestonesFile;
    return sortByOrder(data.milestones);
  } catch {
    return [];
  }
}