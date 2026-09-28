import type { MaterialCategory } from './index';

export type Material = {
  id: string;
  category: MaterialCategory;
  title: string;
  url?: string;
  description?: string;
  metadata?: Record<string, string>;
};