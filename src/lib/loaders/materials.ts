import type { Material } from '@/types/material';
import materialsData from '../../../data/thesis/materials.json';

type MaterialsFile = { materials: Material[] };

export function loadMaterials(): Material[] {
  try {
    const data = materialsData as MaterialsFile;
    return data.materials;
  } catch {
    return [];
  }
}