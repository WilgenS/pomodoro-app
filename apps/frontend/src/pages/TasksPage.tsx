import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskItem } from '../components/tasks/TaskItem';
import { Plus, Loader2, ClipboardList, Zap } from 'lucide-react';
import type { Task, TaskStatus, CreateTaskDto, UpdateTaskDto } from '../services/task.service';

export default function TasksPage() {
  const { tasks, isLoading, createTask, updateTask, deleteTask, isCreating } = useTasks();
  const [isAdding, setIsAdding] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = async (data: CreateTaskDto) => {
    await createTask(data);
    setIsAdding(false);
  };

  const handleUpdateStatus = async (id: string, status: TaskStatus) => {
    await updateTask({ id, dto: { status } });
  };

  const handleEditTask = async (data: UpdateTaskDto) => {
    if (editingTask) {
      await updateTask({ id: editingTask.id, dto: data });
      setEditingTask(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-slate-900" />
          <p className="text-sm font-medium text-slate-500">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10 pb-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Tasks</h1>
          <p className="mt-1 text-slate-500">Organize your work and track progress.</p>
        </div>
        {!isAdding && !editingTask && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-xl active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Add New Task
          </button>
        )}
      </div>

      {isAdding && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="rounded-[2.5rem] border border-slate-200/60 bg-white p-8 shadow-sm">
            <TaskForm
              onSubmit={handleCreateTask}
              isLoading={isCreating}
              onCancel={() => setIsAdding(false)}
            />
          </div>
        </div>
      )}

      {editingTask && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="rounded-[2.5rem] border border-slate-200/60 bg-white p-8 shadow-sm">
            <TaskForm
              onSubmit={handleEditTask}
              initialData={editingTask}
              onCancel={() => setEditingTask(null)}
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task: Task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={handleUpdateStatus}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />
          ))
        ) : (
          !isAdding && (
            <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50/50 py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-slate-300 shadow-sm">
                <ClipboardList className="h-10 w-10" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">Your task list is empty</h3>
              <p className="mt-2 text-sm text-slate-500">Ready to focus? Start by adding your first goal.</p>
              <button
                onClick={() => setIsAdding(true)}
                className="mt-8 rounded-2xl bg-white px-8 py-3 text-sm font-bold text-slate-900 shadow-sm border border-slate-200 transition-all hover:bg-slate-50 hover:shadow-md"
              >
                Create Task
              </button>
            </div>
          )
        )}
      </div>

      {/* Quick Stats Integration */}
      {tasks.length > 0 && (
        <div className="rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-bold opacity-70">Power Tip</p>
              <p className="text-sm">Break large tasks into smaller, manageable chunks for better focus.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
