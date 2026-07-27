import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    }, 300);
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-140px)] max-w-md flex-col justify-center px-4 py-10 sm:px-6">
      <div className="card animate-slideUp p-8">
        <Link to="/" className="mb-6 flex justify-center">
          <Logo size={40} />
        </Link>
        <h1 className="text-center text-2xl font-extrabold text-slate-900">Welcome back</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Log in to your citizen account</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="animate-fadeIn rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary mt-1 w-full">
            <LogIn className="h-4 w-4" /> {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="mt-5 rounded-lg bg-slate-50 p-3 text-center text-xs text-slate-500">
          Demo user: <span className="font-mono">demo@citizen.bd</span> / <span className="font-mono">demo1234</span>
        </p>

        <p className="mt-5 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-brand-600 hover:underline">Sign up</Link>
        </p>
        <p className="mt-2 text-center text-xs text-slate-400">
          <Link to="/admin/login" className="hover:underline">Administrator login</Link>
        </p>
      </div>
    </div>
  );
}
