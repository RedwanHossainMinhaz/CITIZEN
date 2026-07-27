import { useState } from 'react';
import { Trash2, Search } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { ConfirmModal } from './ManageUsers';

const STATUSES = ['Drafting', 'Assigned', 'In Progress', 'Resolved', 'Rejected'];

const statusTone = {
  Drafting: 'bg-slate-100 text-slate-600',
  Assigned: 'bg-amber-50 text-amber-600',
  'In Progress': 'bg-brand-50 text-brand-600',
  Resolved: 'bg-emerald-50 text-emerald-600',
  Rejected: 'bg-red-50 text-red-600',
};

export default function ManageComplaints() {
  const { complaints, updateComplaint, deleteComplaint } = useAppData();
  const [query, setQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = complaints.filter(
    (c) => c.details.toLowerCase().includes(query.toLowerCase()) || c.userName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Complaints</h1>
          <p className="mt-1 text-slate-500">Update statuses or remove complaints.</p>
        </div>
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search complaints or citizens..."
            className="input w-72 pl-9"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {filtered.map((c) => (
          <div key={c.id} className="card flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-start">
            <div className="min-w-0">
              <p className="text-xs text-slate-400">
                #{c.id} &middot; {c.category} &middot; by {c.userName}
              </p>
              <p className="mt-1 text-sm text-slate-700">{c.details}</p>
              <p className="mt-1 text-xs text-slate-400">{new Date(c.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <select
                value={c.status}
                onChange={(e) => updateComplaint(c.id, { status: e.target.value })}
                className={`rounded-lg border-0 px-3 py-1.5 text-sm font-medium ${statusTone[c.status]}`}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button onClick={() => setConfirmDelete(c)} className="btn-danger" aria-label="Delete complaint">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="card p-8 text-center text-slate-400">No complaints match your search.</div>}
      </div>

      {confirmDelete && (
        <ConfirmModal
          title="Delete this complaint?"
          message={`Complaint #${confirmDelete.id} will be permanently removed.`}
          confirmLabel="Delete complaint"
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => {
            deleteComplaint(confirmDelete.id);
            setConfirmDelete(null);
          }}
        />
      )}
    </div>
  );
}
