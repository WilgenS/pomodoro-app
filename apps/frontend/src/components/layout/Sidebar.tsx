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
    <aside className="hidden w-72 flex-col border-r border-slate-200/60 bg-white/50 backdrop-blur-xl md:flex">
      <div className="flex h-20 items-center gap-3 px-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
          <Timer className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">Pomodoro</span>
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
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-200'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                )
              }
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                "group-[.bg-slate-900]:text-white"
              )} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="rounded-2xl bg-slate-50 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Pro Tip</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Take a 5-minute break every 25 minutes to stay productive.
          </p>
        </div>
      </div>
    </aside>
  );
}
