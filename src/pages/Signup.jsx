import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', ward: '', nid: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = signup(form);
      setLoading(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      navigate('/dashboard', { replace: true });
    }, 300);
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-140px)] max-w-md flex-col justify-center px-4 py-10 sm:px-6">
      <div className="card animate-slideUp p-8">
        <Link to="/" className="mb-6 flex justify-center">
          <Logo size={40} />
        </Link>
        <h1 className="text-center text-2xl font-extrabold text-slate-900">Create your account</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Join and start shaping your community</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Field label="Full name" value={form.name} onChange={(v) => update('name', v)} required />
          <Field label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} required />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Ward / Area" value={form.ward} onChange={(v) => update('ward', v)} placeholder="Ward 14, DNCC" />
            <Field label="National ID (optional)" value={form.nid} onChange={(v) => update('nid', v)} placeholder="1990********45" />
          </div>
          <Field label="Password" type="password" value={form.password} onChange={(v) => update('password', v)} required />
          <Field label="Confirm password" type="password" value={form.confirm} onChange={(v) => update('confirm', v)} required />

          {error && <p className="animate-fadeIn rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary mt-1 w-full">
            <UserPlus className="h-4 w-4" /> {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, type = 'text', value, onChange, required, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    </div>
  );
}
