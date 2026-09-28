import type { Experiment } from '@/types/experiment';
import experimentsData from '../../../data/engineering/experiments.json';

type ExperimentsFile = { experiments: Experiment[] };

export function loadExperiments(): Experiment[] {
  try {
    const data = experimentsData as ExperimentsFile;
    return data.experiments;
  } catch {
    return [];
  }
}

export function loadExperimentById(id: string): Experiment | null {
  try {
    const data = experimentsData as ExperimentsFile;
    return data.experiments.find((e) => e.id === id) ?? null;
  } catch {
    return null;
  }
}