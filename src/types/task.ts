import type { TaskStatus, PlanAdjustment } from './index';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  priority?: string;
  estimatedTime?: string;
  relatedStage: string;
  planAdjustment: PlanAdjustment;
  isExample?: boolean;
};