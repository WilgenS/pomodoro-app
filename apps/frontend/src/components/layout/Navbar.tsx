import { LogOut, User as UserIcon, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { AuthService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      logout();
      navigate('/login');
    }
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200/60 bg-white/50 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4 md:hidden">
        <button className="rounded-xl bg-slate-50 p-2 text-slate-600 transition-colors hover:bg-slate-100">
          <Menu className="h-6 w-6" />
        </button>
        <span className="text-xl font-bold tracking-tight text-slate-900">Pomodoro</span>
      </div>

      <div className="ml-auto flex items-center gap-6">
        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-slate-900">{user?.name}</span>
          </div>

          <div className="group relative">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} referrerPolicy="no-referrer" className="h-10 w-10 rounded-2xl border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-105" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <UserIcon className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="group flex items-center justify-center rounded-2xl bg-red-50 p-2.5 text-red-600 transition-all duration-300 hover:bg-red-600 hover:text-white active:scale-95"
          title="Logout"
        >
          <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>
      </div>
    </header>
  );
}
