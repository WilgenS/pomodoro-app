import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Timer } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
  { icon: Timer, label: 'Timer', href: '/timer' },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 flex-col border-r border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl md:flex transition-colors duration-300">
      <div className="flex h-20 items-center gap-3 px-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg">
          <Timer className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Pomodoro</span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md shadow-slate-200 dark:shadow-none'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                )
              }
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                "group-[.bg-slate-900]:text-white dark:group-[.bg-slate-100]:text-slate-900"
              )} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-6 transition-colors">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Pro Tip</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Take a 5-minute break every 25 minutes to stay productive.
          </p>
        </div>
      </div>
    </aside>
  );
}
