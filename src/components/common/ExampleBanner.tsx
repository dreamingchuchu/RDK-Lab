import { AlertTriangle } from 'lucide-react';

export function ExampleBanner() {
  return (
    <div className="mb-6 px-4 py-3 rounded border border-amber-500/40 bg-amber-500/10">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-amber-700 dark:text-amber-300">
            示例数据（Demo Data）
          </p>
          <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-0.5">
            此条目为系统预置示例，非真实研究记录。请在实际使用中替换为您的真实数据。
          </p>
        </div>
      </div>
    </div>
  );
}