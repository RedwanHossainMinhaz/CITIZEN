import { useEffect, useState } from 'react';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { LayoutDashboard, MessagesSquare, History, Settings, PlusCircle, CheckCircle2, Wrench, PencilLine } from 'lucide-react';
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
  const { complaints, posts, updateUser } = useAppData();
  const [searchParams] = useSearchParams();
  const [settings, setSettings] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    ward: currentUser?.ward || '',
    nid: currentUser?.nid || '',
  });
  const [savedMessage, setSavedMessage] = useState('');

  const view = searchParams.get('view') ?? 'overview';
  const myComplaints = complaints.filter((c) => c.userId === currentUser?.id);
  const resolvedCount = myComplaints.filter((c) => c.status === 'Resolved').length;
  const myPosts = posts.filter((p) => p.authorId === currentUser?.id);

  const activity = [...myComplaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  useEffect(() => {
    setSettings({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      ward: currentUser?.ward || '',
      nid: currentUser?.nid || '',
    });
  }, [currentUser]);

  function handleSettingsSave(event) {
    event.preventDefault();
    if (!currentUser) return;

    updateUser(currentUser.id, {
      name: settings.name.trim(),
      email: settings.email.trim().toLowerCase(),
      ward: settings.ward.trim(),
      nid: settings.nid.trim(),
    });
    setSavedMessage('Your profile settings were updated.');
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6">
      <aside className="hidden w-56 shrink-0 flex-col gap-1 lg:flex">
        <SideLink to="/dashboard?view=overview" icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" />
        <SideLink to="/dashboard?view=posts" icon={<MessagesSquare className="h-4 w-4" />} label="My Posts" />
        <SideLink to="/dashboard?view=activities" icon={<History className="h-4 w-4" />} label="Activities" />
        <SideLink to="/dashboard?view=settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
        <Link to="/complaints" className="btn-primary mt-4 justify-center">
          <PlusCircle className="h-4 w-4" /> New Complaint
        </Link>
      </aside>

      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-extrabold text-slate-900">Welcome back, {currentUser.name.split(' ')[0]}</h1>
        <p className="mt-1 text-slate-500">Here is an overview of your civic engagement.</p>

        {view === 'posts' ? (
          <div className="mt-6 card animate-slideUp p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">My Posts</h3>
                <p className="text-sm text-slate-500">Posts you've started in the discussion hub.</p>
              </div>
              <Link to="/discussion" className="btn-secondary text-sm">
                Visit Discussion
              </Link>
            </div>

            {myPosts.length === 0 ? (
              <p className="text-sm text-slate-500">You have not created any posts yet.</p>
            ) : (
              <ul className="space-y-3">
                {myPosts.map((post) => (
                  <li key={post.id} className="rounded-lg border border-slate-200 p-3">
                    <p className="font-semibold text-slate-800">{post.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{post.content}</p>
                    <p className="mt-2 text-xs text-slate-400">{new Date(post.createdAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : view === 'activities' ? (
          <div className="mt-6 card animate-slideUp p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">My Activities</h3>
                <p className="text-sm text-slate-500">Your recent complaint submissions and updates.</p>
              </div>
              <Link to="/complaints" className="btn-secondary text-sm">
                Open Complaints
              </Link>
            </div>

            {myComplaints.length === 0 ? (
              <p className="text-sm text-slate-500">You have not submitted any complaints yet.</p>
            ) : (
              <ul className="space-y-3">
                {myComplaints.map((item) => (
                  <li key={item.id} className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-slate-800">#{item.id}</p>
                      <span className="tag">{item.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{item.details}</p>
                    <p className="mt-2 text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : view === 'settings' ? (
          <div className="mt-6 card animate-slideUp p-5">
            <div className="mb-4 flex items-center gap-2">
              <PencilLine className="h-5 w-5 text-brand-500" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Account Settings</h3>
                <p className="text-sm text-slate-500">Update the details shown on your civic profile.</p>
              </div>
            </div>

            <form onSubmit={handleSettingsSave} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Full name
                  <input
                    className="input"
                    value={settings.name}
                    onChange={(event) => setSettings((prev) => ({ ...prev, name: event.target.value }))}
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Email
                  <input
                    className="input"
                    type="email"
                    value={settings.email}
                    onChange={(event) => setSettings((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Ward
                  <input
                    className="input"
                    value={settings.ward}
                    onChange={(event) => setSettings((prev) => ({ ...prev, ward: event.target.value }))}
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  NID
                  <input
                    className="input"
                    value={settings.nid}
                    onChange={(event) => setSettings((prev) => ({ ...prev, nid: event.target.value }))}
                  />
                </label>
              </div>

              {savedMessage && <p className="text-sm text-emerald-600">{savedMessage}</p>}
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

function SideLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
        isActive ? 'bg-brand-500 text-white' : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {icon} {label}
    </NavLink>
  );
}
