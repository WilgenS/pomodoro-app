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
      "group flex items-center justify-between rounded-lg border bg-white p-4 transition-all hover:shadow-md",
      isCompleted && "bg-gray-50 opacity-75"
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
          <h3 className={cn("font-medium text-gray-900", isCompleted && "line-through text-gray-500")}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-500 line-clamp-1">{task.description}</p>
          )}
          <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {task.completedPomodoros}/{task.estimatedPomodoros} poms
            </span>
            <span>•</span>
            <span className={cn(
              "rounded-full px-2 py-0.5 font-medium",
              task.status === 'IN_PROGRESS' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
            )}>
              {task.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <Edit2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-md p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
