// 公共类型与状态枚举 — 数据契约的唯一真相来源
// 对应 spec.md 第 6 章领域对象定义与 design.md 2.3.2 节

// === 状态枚举 ===
export type StageStatus = 'planned' | 'active' | 'blocked' | 'completed' | 'cancelled';
export type TaskStatus = 'planned' | 'active' | 'blocked' | 'completed' | 'cancelled';
export type ExperimentStatus = 'planned' | 'running' | 'completed' | 'failed' | 'abandoned';
export type IssueStatus = 'open' | 'investigating' | 'blocked' | 'resolved' | 'closed';
export type PaperStatus = 'unread' | 'reading' | 'read' | 'important';
export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type MaterialCategory =
  | 'dataset'
  | 'paper'
  | 'documentation'
  | 'repository'
  | 'image'
  | 'experiment_file'
  | 'thesis_material';
export type KnowledgeCategory = 'RDK' | 'Object Detection' | 'Deployment';
export type DecisionStatus = 'proposed' | 'accepted' | 'superseded' | 'rejected';
export type ChapterStatus = 'not-started' | 'in-progress' | 'drafted' | 'revised' | 'finalized';

// === Plan/Actual/Adjustment 三元组（spec.md 8.2） ===
// 不静默覆盖历史计划：plannedDate 保留原始计划，actualDate 记录实际，reason 记录调整原因
export type PlanAdjustment = {
  plannedDate: string;      // 原始计划日期（永不覆盖）
  actualDate: string | null; // 实际日期，未发生则为 null
  deviation: string | null;  // 偏差描述
  reason: string | null;     // 调整原因
};

// === 未测量占位符策略（spec.md 4.2.3） ===
// 所有实验指标类型为 number | null，null 表示"未测量"
// UI 层遇 null 渲染 <Placeholder kind="unmeasured" />
export type MetricValue = number | null;

export type ExperimentMetrics = {
  fps: MetricValue;
  latency: MetricValue;
  map: MetricValue;
  precision: MetricValue;
  recall: MetricValue;
  cpuUsage: MetricValue;
  memory: MetricValue;
  bpuUsage: MetricValue;
  modelSize: MetricValue;
};

// 指标键名（用于图表渲染）
export type MetricKey = keyof ExperimentMetrics;

// === 风险 ===
export type Risk = {
  description: string;
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
};

// === 证据项（spec.md 5.11.1 第 4 条） ===
export type EvidenceItem = {
  description: string;
  completed: boolean;
  relatedExperimentId?: string;
};

// === 里程碑 ===
export type Milestone = {
  id: string;
  order: number;
  title: string;
  description?: string;
  targetDate: string;
  status: 'planned' | 'reached' | 'missed' | 'at-risk';
  relatedStageId?: string;
  isExample?: boolean;
};

// 统一导出领域对象类型
export type { Stage } from './stage';
export type { Task } from './task';
export type { ResearchLog } from './research-log';
export type { Paper } from './paper';
export type { KnowledgeNote } from './knowledge-note';
export type { Experiment } from './experiment';
export type { Issue } from './issue';
export type { Decision } from './decision';
export type { ThesisChapter } from './thesis-chapter';
export type { Material } from './material';
export type { NavigationConfig, NavigationGroup, NavigationItem } from './navigation';
export type { PaperAnalysis, ChecklistItem, ReadingFinalStatus } from './paper-analysis';

// === 搜索结果类型 ===
export type SearchResultType =
  | 'log'
  | 'paper'
  | 'paper_analysis'
  | 'knowledge'
  | 'experiment'
  | 'issue'
  | 'decision';

export type SearchResult = {
  type: SearchResultType;
  id: string;
  title: string;
  snippet: string;
  href: string;
};

// === 命令面板动作类型 ===
export type CommandAction = {
  id: string;
  label: string;
  group: 'navigation' | 'create' | 'search';
  keywords?: string[];
  shortcut?: string;
  perform: () => void;
  icon?: string;
  disabled?: boolean;
};