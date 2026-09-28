import type { Task } from '@/types/task';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PlanAdjustmentView } from './PlanAdjustmentView';

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return <p className="text-sm text-text-tertiary">暂无任务</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li key={task.id} className="surface p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-start gap-2">
              <span className="font-mono text-xs text-text-tertiary mt-0.5">
                {task.id.replace('task-', '#')}
              </span>
              <p className="text-sm text-text">{task.title}</p>
            </div>
            <StatusBadge status={task.status} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div>
              <span className="text-text-tertiary">优先级：</span>
              <span className="text-text-secondary">{task.priority ?? '—'}</span>
            </div>
            <div>
              <span className="text-text-tertiary">预计：</span>
              <span className="text-text-secondary">{task.estimatedTime ?? '—'}</span>
            </div>
          </div>
          <PlanAdjustmentView data={task.planAdjustment} />
        </li>
      ))}
    </ul>
  );
}