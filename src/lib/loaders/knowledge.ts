import type { KnowledgeNote } from '@/types/knowledge-note';
import knowledgeData from '../../../data/research/knowledge-notes.json';

type KnowledgeFile = { notes: KnowledgeNote[] };

export function loadKnowledgeNotes(): KnowledgeNote[] {
  try {
    const data = knowledgeData as KnowledgeFile;
    return data.notes;
  } catch {
    return [];
  }
}