import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p className="font-mono text-6xl font-semibold text-text-tertiary mb-4">404</p>
      <h1 className="text-xl font-medium mb-2">页面未找到</h1>
      <p className="text-sm text-text-secondary mb-6 max-w-md">
        您访问的页面不存在或已被移动。请检查 URL 或返回仪表盘。
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent border border-border rounded hover:bg-surface-hover transition-colors"
      >
        <Home className="w-4 h-4" />
        返回仪表盘
      </Link>
    </div>
  );
}