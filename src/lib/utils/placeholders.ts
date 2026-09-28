// 占位符常量与判断函数 — "未测量"语义的一等公民
// 对应 spec.md 4.2.3 未测量数据诚实性约束

export const PLACEHOLDERS = {
  unmeasured: '未测量',
  tbd: '待定',
  pending: '待补充',
  invalidRef: '引用失效',
  empty: '—',
  notRecorded: '未记录',
  toBeDetermined: 'To be determined',
  notMeasured: 'Not measured',
} as const;

export type PlaceholderKind = 'unmeasured' | 'tbd' | 'pending';

export function getPlaceholderLabel(kind: PlaceholderKind): string {
  switch (kind) {
    case 'unmeasured':
      return PLACEHOLDERS.unmeasured;
    case 'tbd':
      return PLACEHOLDERS.tbd;
    case 'pending':
      return PLACEHOLDERS.pending;
    default:
      return PLACEHOLDERS.empty;
  }
}

export function isNullMetric(value: number | null): value is null {
  return value === null;
}

export function formatMetric(value: number | null, unit?: string): string {
  if (value === null) return PLACEHOLDERS.unmeasured;
  return unit ? `${value} ${unit}` : String(value);
}

export function formatOptionalString(value: string | undefined | null, fallback = PLACEHOLDERS.pending): string {
  if (value === undefined || value === null || value.trim() === '') return fallback;
  return value;
}

export function formatOptionalArray(items: string[] | undefined, fallback = PLACEHOLDERS.pending): string {
  if (!items || items.length === 0) return fallback;
  return items.join(', ');
}