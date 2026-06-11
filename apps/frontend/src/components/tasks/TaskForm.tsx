import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  estimatedPomodoros: z.number().min(1, 'Estimated pomodoros must be at least 1'),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => Promise<void>;
  isLoading?: boolean;
  initialData?: Partial<TaskFormData>;
  onCancel?: () => void;
}

export function TaskForm({ onSubmit, isLoading, initialData, onCancel }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      estimatedPomodoros: initialData?.estimatedPomodoros || 1,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-colors duration-300">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Title</label>
        <input
          {...register('title')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-750 bg-white dark:bg-slate-850 px-3 py-2 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          placeholder="What needs to be done?"
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Description (Optional)</label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-750 bg-white dark:bg-slate-850 px-3 py-2 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          placeholder="Add some details..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Estimated Pomodoros</label>
        <input
          type="number"
          {...register('estimatedPomodoros', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-750 bg-white dark:bg-slate-850 px-3 py-2 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        />
        {errors.estimatedPomodoros && <p className="mt-1 text-xs text-red-500">{errors.estimatedPomodoros.message}</p>}
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 dark:border-slate-750 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
