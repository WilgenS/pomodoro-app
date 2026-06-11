import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useTimer } from '../hooks/useTimer';
import { Play, Square, RotateCcw, CheckCircle2, Timer as TimerIcon, AlertCircle, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Task } from '../services/task.service';

export default function TimerPage() {
  const { tasks } = useTasks();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const { 
    timeLeft, 
    isActive, 
    toggleTimer, 
    resetTimer, 
    completeSession,
    isStarting,
    isCompleting 
  } = useTimer(selectedTaskId);

  const selectedTask = tasks.find((t: Task) => t.id === selectedTaskId);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="mx-auto max-w-4xl space-y-12 pb-20">
      {/* Header */}
      <div className="text-center animate-in fade-in duration-500">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Sparkles className="h-3 w-3 text-slate-400 dark:text-slate-500" />
          Focus Session
        </div>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">Get in the Zone</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Your productivity is a muscle. Train it with focus.</p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Timer Section */}
        <div className="relative flex flex-col items-center justify-center space-y-10 rounded-[3.5rem] border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-16 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300">
          <div className="relative h-72 w-72 flex items-center justify-center">
            {/* Progress Ring */}
            <svg className="absolute h-full w-full -rotate-90 transform">
              <circle
                cx="144"
                cy="144"
                r="130"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-50 dark:text-slate-850"
              />
              <circle
                cx="144"
                cy="144"
                r="130"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={816.8}
                strokeDashoffset={816.8 * (1 - progress / 100)}
                className={cn(
                  "transition-all duration-1000 ease-linear",
                  isActive ? "text-slate-900 dark:text-white" : "text-slate-200 dark:text-slate-700"
                )}
              />
            </svg>
            
            <div className="text-center">
              <span className="text-7xl font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-white">
                {formatTime(timeLeft)}
              </span>
              <div className="mt-3 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                <TimerIcon className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Focus Mode</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={resetTimer}
              disabled={isStarting || isCompleting}
              className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 shadow-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 active:scale-95 disabled:opacity-50"
              title="Reset Timer"
            >
              <RotateCcw className="h-6 w-6" />
            </button>

            <button
              onClick={toggleTimer}
              disabled={!selectedTaskId || isStarting || isCompleting}
              className={cn(
                "group flex h-20 w-20 items-center justify-center rounded-[2rem] shadow-2xl transition-all duration-300 active:scale-90 disabled:opacity-50 disabled:grayscale",
                isActive 
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 shadow-slate-200 dark:shadow-none" 
                  : "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white shadow-slate-300 dark:shadow-none"
              )}
            >
              {isActive 
                ? <Square className="h-8 w-8 fill-current" /> 
                : <Play className="h-8 w-8 fill-current ml-1" />
              }
            </button>
            
            <button
              onClick={completeSession}
              disabled={!isActive || isCompleting}
              className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 shadow-sm transition-all hover:bg-green-50 dark:hover:bg-green-950/30 hover:text-green-600 dark:hover:text-green-400 active:scale-95 disabled:opacity-50"
              title="Quick Complete"
            >
              <CheckCircle2 className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Task Selection & Info Section */}
        <div className="flex flex-col gap-8">
          <div className="rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 shadow-sm transition-colors duration-300">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Task Selection</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">What are we focusing on right now?</p>
            
            <div className="mt-8 space-y-4">
              <select
                value={selectedTaskId || ''}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                disabled={isActive}
                className="block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 p-4 text-sm font-bold text-slate-900 dark:text-white shadow-sm transition-all focus:border-slate-900 dark:focus:border-slate-100 focus:ring-slate-900 outline-none border hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <option value="" disabled className="dark:bg-slate-900">Select a mission...</option>
                {tasks.map((task: Task) => (
                  <option key={task.id} value={task.id} className="dark:bg-slate-900">
                    {task.title}
                  </option>
                ))}
              </select>

              {!selectedTaskId && !isActive && (
                <div className="flex items-center gap-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-xs font-bold text-amber-700 dark:text-amber-500 border border-amber-100 dark:border-amber-900/30">
                  <AlertCircle className="h-4 w-4" />
                  Select a task to start the session
                </div>
              )}

              {selectedTask && (
                <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Current Goal</p>
                      <h4 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{selectedTask.title}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Progress</p>
                      <p className="mt-1 font-bold text-slate-900 dark:text-white">{selectedTask.completedPomodoros}/{selectedTask.estimatedPomodoros}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-slate-900 dark:bg-slate-950 p-10 text-white border dark:border-slate-800 shadow-xl transition-colors duration-300">
            <h3 className="text-xl font-bold">Focus Strategy</h3>
            <p className="mt-4 text-sm leading-relaxed opacity-70">
              The Pomodoro Technique is simple: 25 minutes of work followed by 5 minutes of rest. After 4 sessions, take a longer 20-30 minute break.
            </p>
            <div className="mt-8 flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={cn(
                  "h-2 flex-1 rounded-full",
                  i <= (selectedTask?.completedPomodoros || 0) % 4 ? "bg-white" : "bg-white/10 dark:bg-white/5"
                )} />
              ))}
            </div>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest opacity-50">Session progress (4 to goal)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
