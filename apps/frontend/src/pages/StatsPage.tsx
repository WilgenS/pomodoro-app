import { useStats } from '@/hooks/useStats';
import { Timer, CheckSquare, BarChart3, Loader2, TrendingUp, Calendar, ArrowUpRight, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useThemeStore } from '@/store/theme.store';

export default function StatsPage() {
  const { data: stats, isLoading, isError } = useStats();
  const { theme } = useThemeStore();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-slate-900 dark:text-white" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading your performance data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="max-w-md rounded-[2rem] bg-red-50 dark:bg-red-950/20 p-10 text-center border border-red-100 dark:border-red-900/30">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400">
            <Zap className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-red-900 dark:text-red-400">Sync Error</h2>
          <p className="mt-2 text-sm text-red-750 dark:text-red-400/80">We couldn't load your statistics. Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Focus Time',
      value: formatTime(stats?.totalFocusTime || 0),
      icon: Timer,
      color: 'text-slate-900 dark:text-slate-100',
      bgColor: 'bg-slate-100 dark:bg-slate-800',
      description: 'Total time spent in deep work',
    },
    {
      label: 'Sessions',
      value: stats?.completedSessionsCount || 0,
      icon: BarChart3,
      color: 'text-slate-900 dark:text-slate-100',
      bgColor: 'bg-slate-100 dark:bg-slate-800',
      description: 'Completed pomodoro cycles',
    },
    {
      label: 'Tasks',
      value: stats?.completedTasksCount || 0,
      icon: CheckSquare,
      color: 'text-slate-900 dark:text-slate-100',
      bgColor: 'bg-slate-100 dark:bg-slate-800',
      description: 'Goals achieved this period',
    },
  ];

  const chartData = [
    { name: 'Mon', value: 4 },
    { name: 'Tue', value: 7 },
    { name: 'Wed', value: 5 },
    { name: 'Thu', value: 9 },
    { name: 'Fri', value: 12 },
    { name: 'Sat', value: 3 },
    { name: 'Sun', value: 6 },
  ];

  const gridColor = theme === 'dark' ? '#1e293b' : '#f1f5f9';
  const tooltipBg = theme === 'dark' ? '#0f172a' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#1e293b' : '#f1f5f9';
  const activeBarColor = theme === 'dark' ? '#f1f5f9' : '#0f172a';
  const inactiveBarColor = theme === 'dark' ? '#1e293b' : '#f1f5f9';

  return (
    <div className="mx-auto max-w-7xl space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Your Progress</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Visualize your productivity and focus trends.</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.label} className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] dark:hover:shadow-none hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className={`rounded-2xl ${card.bgColor} ${card.color} p-4 shadow-sm`}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{card.label}</p>
              <p className="mt-1 text-4xl font-extrabold text-slate-900 dark:text-white">{card.value}</p>
              <p className="mt-4 text-xs font-medium text-slate-400 dark:text-slate-500">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="rounded-[3rem] border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 shadow-sm transition-colors duration-300">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Activity Overview</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Number of sessions per day this week</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-slate-50 dark:bg-slate-800 px-4 py-2">
            <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-350 dark:text-white">May 4 - May 10</span>
          </div>
        </div>

        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
              />
              <Tooltip
                cursor={{ fill: theme === 'dark' ? '#1e293b' : '#f8fafc', radius: 12 }}
                contentStyle={{
                  borderRadius: '20px',
                  border: `1px solid ${tooltipBorder}`,
                  backgroundColor: tooltipBg,
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)',
                  padding: '12px 16px'
                }}
                itemStyle={{ color: theme === 'dark' ? '#ffffff' : '#0f172a' }}
                labelStyle={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}
              />
              <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={48}>
                {chartData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 4 ? activeBarColor : inactiveBarColor}
                    className="transition-all duration-300 hover:fill-slate-900 dark:hover:fill-white"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm transition-colors duration-300">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Focus Distribution</h3>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-6">
            {[
              { label: 'Deep Work', value: '65%', color: 'bg-slate-900 dark:bg-slate-100' },
              { label: 'Short Breaks', value: '20%', color: 'bg-slate-400 dark:bg-slate-500' },
              { label: 'Long Breaks', value: '15%', color: 'bg-slate-200 dark:bg-slate-700' },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                  <span className="text-slate-900 dark:text-white">{item.value}</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-50 dark:bg-slate-850">
                  <div className={`h-3 rounded-full ${item.color}`} style={{ width: item.value }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm transition-colors duration-300">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Achievements</h3>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Consistency King', desc: '5 days streak reached', icon: '🔥', color: 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400' },
              { title: 'Early Bird', desc: 'Started session before 7 AM', icon: '🌅', color: 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' },
              { title: 'Focus Master', desc: 'Completed 10 sessions today', icon: '⭐', color: 'bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-450' },
            ].map((item) => (
              <div key={item.title} className="group flex items-center gap-5 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-slate-100 dark:hover:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl shadow-sm ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
