import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, MessagesSquare, ClipboardList, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const links = [
  { to: '/admin', end: true, icon: LayoutDashboard, label: 'Overview' },
  { to: '/admin/users', icon: Users, label: 'Manage Users' },
  { to: '/admin/posts', icon: MessagesSquare, label: 'Manage Posts' },
  { to: '/admin/complaints', icon: ClipboardList, label: 'Manage Complaints' },
  { to: '/admin/settings', icon: Settings, label: 'Site Settings' },
];

export default function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <Logo size={28} />
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Admin Panel</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {links.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                  isActive ? 'bg-brand-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon className="h-4 w-4" /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-3">
          <p className="truncate px-3 text-xs text-slate-400">Signed in as</p>
          <p className="truncate px-3 pb-2 text-sm font-semibold text-slate-800">{currentUser?.name}</p>
          <button
            onClick={() => navigate('/')}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" /> Back to site
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </aside>

      <main className="page-enter flex-1 overflow-x-hidden p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
