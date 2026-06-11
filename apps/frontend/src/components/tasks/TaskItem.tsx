import type { Task, TaskStatus } from '../../services/task.service';
import { Trash2, Edit2, CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onUpdate, onEdit, onDelete }: TaskItemProps) {
  const isCompleted = task.status === 'COMPLETED';

  return (
    <div className={cn(
      "group flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 transition-all hover:shadow-md",
      isCompleted && "bg-gray-50 dark:bg-slate-850/50 opacity-75"
    )}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onUpdate(task.id, isCompleted ? 'TODO' : 'COMPLETED')}
          className="text-gray-400 hover:text-blue-600 transition-colors"
        >
          {isCompleted ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          ) : (
            <Circle className="h-6 w-6" />
          )}
        </button>
        
        <div>
          <h3 className={cn("font-medium text-gray-900 dark:text-slate-100", isCompleted && "line-through text-gray-500 dark:text-slate-400")}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{task.description}</p>
          )}
          <div className="mt-1 flex items-center gap-3 text-xs text-gray-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {task.completedPomodoros}/{task.estimatedPomodoros} poms
            </span>
            <span>•</span>
            <span className={cn(
              "rounded-full px-2 py-0.5 font-medium",
              task.status === 'IN_PROGRESS' 
                ? "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-450" 
                : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-350"
            )}>
              {task.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="rounded-md p-2 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-600 dark:hover:text-slate-300"
        >
          <Edit2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-md p-2 text-gray-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
