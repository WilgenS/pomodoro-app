import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
