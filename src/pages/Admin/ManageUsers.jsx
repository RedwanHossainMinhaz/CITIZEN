import { useState } from 'react';
import { Search, Pencil, Ban, ShieldCheck, Trash2, X } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';

export default function ManageUsers() {
  const { users, updateUser, deleteUser, setUserBanned } = useAppData();
  const { currentUser } = useAuth();
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()) ||
      (u.id || '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Users</h1>
          <p className="mt-1 text-slate-500">Edit accounts, ban bad actors, or remove accounts entirely.</p>
        </div>
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email or ID..."
            className="input w-72 pl-9"
          />
        </label>
      </div>

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Account ID</th>
              <th className="px-5 py-3">Ward</th>
              <th className="px-5 py-3">Trust Score</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((u) => (
              <tr key={u.id} className="transition-colors hover:bg-slate-50">
                <td className="px-5 py-3">
                  <p className="font-semibold text-slate-800">{u.name}</p>
                  <p className="text-xs text-slate-400">{u.email}</p>
                </td>
                <td className="px-5 py-3 font-mono text-xs text-slate-500">{u.id}</td>
                <td className="px-5 py-3 text-slate-600">{u.ward || '—'}</td>
                <td className="px-5 py-3 font-semibold text-brand-600">{u.trustScore}/100</td>
                <td className="px-5 py-3">
                  <span className={`tag ${u.role === 'admin' ? 'bg-slate-900 text-white' : ''}`}>{u.role}</span>
                </td>
                <td className="px-5 py-3">
                  {u.banned ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                      <Ban className="h-3 w-3" /> Banned
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                      <ShieldCheck className="h-3 w-3" /> Active
                    </span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditing(u)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Edit user">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setUserBanned(u.id, !u.banned)}
                      disabled={u.id === currentUser.id}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                      aria-label={u.banned ? 'Unban user' : 'Ban user'}
                      title={u.id === currentUser.id ? "You can't ban your own account" : ''}
                    >
                      {u.banned ? <ShieldCheck className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(u)}
                      disabled={u.id === currentUser.id}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:opacity-30"
                      aria-label="Delete user"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-slate-400">No users match your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditUserModal
          user={editing}
          onClose={() => setEditing(null)}
          onSave={(patch) => {
            updateUser(editing.id, patch);
            setEditing(null);
          }}
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          title="Delete this account?"
          message={`This permanently deletes ${confirmDelete.name}'s account and their posts/complaints. This cannot be undone.`}
          confirmLabel="Delete account"
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => {
            deleteUser(confirmDelete.id);
            setConfirmDelete(null);
          }}
        />
      )}
    </div>
  );
}

function EditUserModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    name: user.name,
    id: user.id,
    ward: user.ward || '',
    nid: user.nid || '',
    trustScore: user.trustScore,
    role: user.role,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 animate-fadeIn" onClick={onClose}>
      <div className="card w-full max-w-md animate-popIn p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Edit user</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <LabeledInput label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <LabeledInput
            label="Account ID"
            value={form.id}
            onChange={(v) => setForm({ ...form, id: v })}
            hint="Changing this changes how the account is referenced internally."
          />
          <LabeledInput label="Ward / Area" value={form.ward} onChange={(v) => setForm({ ...form, ward: v })} />
          <LabeledInput label="National ID" value={form.nid} onChange={(v) => setForm({ ...form, nid: v })} />
          <LabeledInput
            label="Trust score (0-100)"
            type="number"
            value={form.trustScore}
            onChange={(v) => setForm({ ...form, trustScore: Math.max(0, Math.min(100, Number(v))) })}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="input"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button
            onClick={() => {
              const { id, ...patch } = form;
              onSave({ ...patch, id });
            }}
            className="btn-primary"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function LabeledInput({ label, value, onChange, type = 'text', hint }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input" />
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export function ConfirmModal({ title, message, confirmLabel, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 animate-fadeIn" onClick={onCancel}>
      <div className="card w-full max-w-sm animate-popIn p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-500">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
          <button onClick={onConfirm} className="btn-danger">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
