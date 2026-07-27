import { Users, MessagesSquare, ClipboardList, ShieldBan } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

export default function AdminDashboard() {
  const { users, posts, complaints } = useAppData();
  const bannedCount = users.filter((u) => u.banned).length;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Admin Overview</h1>
      <p className="mt-1 text-slate-500">Full control over accounts, posts and complaints.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={<Users className="h-5 w-5" />} label="Total Users" value={users.length} />
        <Metric icon={<ShieldBan className="h-5 w-5" />} label="Banned Users" value={bannedCount} tone="red" />
        <Metric icon={<MessagesSquare className="h-5 w-5" />} label="Discussion Posts" value={posts.length} />
        <Metric icon={<ClipboardList className="h-5 w-5" />} label="Complaints" value={complaints.length} />
      </div>

      <div className="mt-8 card p-5">
        <h3 className="mb-4 font-bold text-slate-900">Quick guide</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li><strong>Manage Users</strong> — edit any user's name, ID, ward and trust score, ban or unban, or permanently delete an account.</li>
          <li><strong>Manage Posts</strong> — review and delete any discussion post.</li>
          <li><strong>Manage Complaints</strong> — update status or delete any submitted complaint.</li>
          <li><strong>Site Settings</strong> — change the logo, hero image, stats and text shown across the site.</li>
        </ul>
      </div>
    </div>
  );
}

function Metric({ icon, label, value, tone = 'brand' }) {
  const toneClasses = tone === 'red' ? 'bg-red-50 text-red-600' : 'bg-brand-50 text-brand-600';
  return (
    <div className="card animate-slideUp p-5">
      <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneClasses}`}>{icon}</span>
      <p className="mt-4 text-3xl font-extrabold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}
