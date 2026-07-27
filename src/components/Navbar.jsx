import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bell, UserCircle, Search, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors duration-150 ${
    isActive ? 'text-brand-600 border-b-2 border-brand-500' : 'text-slate-600 hover:text-slate-900'
  } pb-1`;

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">
        <Link to="/" className="shrink-0 transition-transform duration-150 hover:scale-[1.02]">
          <Logo size={28} />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/discussion" className={navLinkClass}>Discussion</NavLink>
          <NavLink to="/support" className={navLinkClass}>Support Hub</NavLink>
          <NavLink to="/complaints" className={navLinkClass}>Complaints</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <label className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search discussions..."
              className="w-56 rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm transition-all duration-150 focus:w-64 focus:border-brand-500"
            />
          </label>

          <button
            className="rounded-full p-2 text-slate-500 transition-colors duration-150 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center rounded-full p-1 text-slate-500 transition-colors duration-150 hover:bg-slate-100"
              aria-label="Account menu"
            >
              <UserCircle className="h-7 w-7" />
            </button>

            {menuOpen && (
              <div
                className="animate-popIn absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg"
                onMouseLeave={() => setMenuOpen(false)}
              >
                {currentUser ? (
                  <>
                    <div className="border-b border-slate-100 px-3 py-2 text-sm">
                      <p className="font-semibold text-slate-800">{currentUser.name}</p>
                      <p className="truncate text-xs text-slate-400">{currentUser.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                    {currentUser.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setMenuOpen(false)}
                      >
                        <ShieldCheck className="h-4 w-4" /> Admin panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                        navigate('/');
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-1 p-1">
                    <Link
                      to="/login"
                      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:bg-brand-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <Link to={currentUser ? '/complaints' : '/login'} className="btn-primary hidden sm:inline-flex">
            Create Post
          </Link>
        </div>
      </div>
    </header>
  );
}
