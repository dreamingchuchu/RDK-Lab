// 日期工具函数

export function formatDate(isoDate: string): string {
  if (!isoDate) return '—';
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = formatDate(startDate).replace(/\./g, '.');
  const end = formatDate(endDate).replace(/\./g, '.');
  return `${start} — ${end}`;
}

export function daysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  const diff = end.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function daysSince(startDate: string): number {
  return daysBetween(startDate, new Date().toISOString().slice(0, 10));
}

export function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export function isOverdue(targetDate: string): boolean {
  const target = new Date(targetDate);
  const now = new Date();
  return target.getTime() < now.getTime();
}