import { Link } from 'react-router-dom';
import { LayoutDashboard, MessagesSquare, History, Settings, PlusCircle, CheckCircle2, Wrench } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import TrendChart from '../components/TrendChart';

const trend = [
  { label: 'Jan', value: 20 },
  { label: 'Feb', value: 32 },
  { label: 'Mar', value: 38 },
  { label: 'Apr', value: 55 },
  { label: 'May', value: 48 },
];

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { complaints, posts } = useAppData();

  const myComplaints = complaints.filter((c) => c.userId === currentUser.id);
  const resolvedCount = myComplaints.filter((c) => c.status === 'Resolved').length;
  const myPosts = posts.filter((p) => p.authorId === currentUser.id);

  const activity = [...myComplaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6">
      <aside className="hidden w-56 shrink-0 flex-col gap-1 lg:flex">
        <SideLink to="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" active />
        <SideLink to="/discussion" icon={<MessagesSquare className="h-4 w-4" />} label="My Posts" />
        <SideLink to="/complaints" icon={<History className="h-4 w-4" />} label="Activities" />
        <SideLink to="/dashboard" icon={<Settings className="h-4 w-4" />} label="Settings" />
        <Link to="/complaints" className="btn-primary mt-4 justify-center">
          <PlusCircle className="h-4 w-4" /> New Complaint
        </Link>
      </aside>

      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-extrabold text-slate-900">Welcome back, {currentUser.name.split(' ')[0]}</h1>
        <p className="mt-1 text-slate-500">Here is an overview of your civic engagement.</p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="card animate-slideUp flex items-center gap-4 p-5">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-brand-100 font-bold text-brand-600">
                  {currentUser.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate font-bold text-slate-900">{currentUser.name}</p>
                <span className="tag whitespace-nowrap">Verified</span>
              </div>
              <p className="text-xs text-slate-400">NID: {currentUser.nid || 'Not provided'}</p>
              <p className="mt-1 text-xs text-slate-500">
                Trust Score <span className="font-bold text-brand-600">{currentUser.trustScore}/100</span>
              </p>
              <p className="text-xs text-slate-500">Ward <span className="font-semibold">{currentUser.ward || '—'}</span></p>
            </div>
          </div>

          <div className="card animate-slideUp p-5">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Resolved Issues
            </p>
            <p className="mt-3 text-4xl font-extrabold text-slate-900">{resolvedCount}</p>
            <p className="text-sm text-slate-400">out of {myComplaints.length} submitted</p>
          </div>

          <div className="card animate-slideUp p-5">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
              <MessagesSquare className="h-4 w-4 text-brand-500" /> Active Discussions
            </p>
            <p className="mt-3 text-4xl font-extrabold text-slate-900">{myPosts.length}</p>
            <p className="text-sm text-slate-400">posts you've started</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="card animate-slideUp p-5">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-bold text-slate-900">Engagement Trends</h4>
              <select className="input w-auto py-1.5 text-xs">
                <option>Last 6 Months</option>
              </select>
            </div>
            <TrendChart data={trend} />
          </div>

          <div className="card animate-slideUp p-5">
            <h4 className="mb-3 font-bold text-slate-900">Recent Activity</h4>
            {activity.length === 0 && <p className="text-sm text-slate-400">No activity yet — submit your first complaint.</p>}
            <ul className="flex flex-col gap-4">
              {activity.map((item) => (
                <li key={item.id} className="flex gap-3 border-l-2 border-brand-200 pl-3">
                  <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  <div>
                    <p className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
                    <p className="text-sm font-semibold text-slate-800">Complaint {item.status.toLowerCase()}</p>
                    <p className="line-clamp-2 text-xs text-slate-500">#{item.id} — {item.details}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideLink({ to, icon, label, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
        active ? 'bg-brand-500 text-white' : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {icon} {label}
    </Link>
  );
}
