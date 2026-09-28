import type { DecisionStatus } from './index';

export type Decision = {
  id: string;                        // 建议格式 DEC-NNN
  date: string;
  title: string;
  context: string;
  decision: string;
  alternatives: string[];            // 备选方案（应用方向以候选列表呈现）
  reasons: string;
  evidence?: string;
  confidence?: string;
  revisitCondition: string;
  status: DecisionStatus;
  isExample?: boolean;
};