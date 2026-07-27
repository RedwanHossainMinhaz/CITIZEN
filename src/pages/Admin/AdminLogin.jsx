import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

export default function AdminLogin() {
  const { loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = loginAsAdmin(email, password);
      setLoading(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      navigate('/admin', { replace: true });
    }, 300);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="card animate-slideUp w-full max-w-md p-8">
        <Link to="/" className="mb-6 flex justify-center">
          <Logo size={40} />
        </Link>
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h1 className="text-center text-2xl font-extrabold text-slate-900">Administrator Access</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Restricted area — authorized staff only</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Admin email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
          </div>

          {error && <p className="animate-fadeIn rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary mt-1 w-full bg-slate-900 hover:bg-slate-800">
            {loading ? 'Verifying...' : 'Enter admin panel'}
          </button>
        </form>

        <p className="mt-5 rounded-lg bg-slate-50 p-3 text-center text-xs text-slate-500">
          Demo admin: <span className="font-mono">admin@citizen.bd</span> / <span className="font-mono">admin123</span>
        </p>
      </div>
    </div>
  );
}
