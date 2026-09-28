import type {
  StageStatus,
  TaskStatus,
  PlanAdjustment,
  Risk,
} from './index';

export type Stage = {
  id: string;
  order: number;
  title: string;
  description: string;
  objective: string;
  status: StageStatus;
  startDate: string;          // ISO 日期
  targetDate: string;         // ISO 日期，晚于 startDate
  progress: number;           // 0–100
  tasks: Task[];
  exitCriteria: string[];
  risks: Risk[];
  fallback: string;
  notes: string;
  relatedExperiments: string[]; // 实验 id 列表
  relatedDecisions: string[];   // 决策 id 列表
  planAdjustment: PlanAdjustment;
  isExample?: boolean;           // 示例数据标记（spec.md 7.2）
};

// Task 内联于 Stage，也单独导出供独立引用
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