import { Link } from 'react-router-dom';
import { ArrowRight, MessagesSquare, BadgeCheck, Users2, CheckCircle2, Building2 } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

export default function Landing() {
  const { settings } = useAppData();
  const { stats } = settings;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <section className="card animate-slideUp overflow-hidden bg-gradient-to-br from-white to-brand-50/40 p-8 sm:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">Civic Engagement Platform</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              {settings.tagline}
            </h1>
            <p className="mt-4 max-w-lg text-slate-600">{settings.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/complaints" className="btn-primary">
                Submit Feedback <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/discussion" className="btn-secondary">
                Explore Discussions
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="card flex flex-col justify-between p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <MessagesSquare className="h-5 w-5" />
              </span>
              <div className="mt-6">
                <p className="font-bold text-slate-900">Active Debates</p>
                <p className="mt-1 text-sm text-slate-500">Join ongoing civic conversations</p>
              </div>
            </div>
            <div className="card flex flex-col justify-center bg-brand-50/60 p-5">
              <p className="text-3xl font-extrabold text-brand-600">{stats.registeredCitizens.toLocaleString()}+</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Feedback Received</p>
            </div>
            <div className="card col-span-2 flex items-center gap-3 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <p className="font-bold text-slate-900">Verified Action</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-3">
        <StatCard icon={<Users2 className="h-5 w-5" />} label="Registered Citizens" value={stats.registeredCitizens.toLocaleString()} sub="+12% this month" />
        <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Issues Resolved" value={stats.issuesResolved.toLocaleString()} sub="+5% this month" />
        <StatCard icon={<Building2 className="h-5 w-5" />} label="Partner Agencies" value={stats.partnerAgencies} sub="Across 8 divisions" />
      </section>
    </div>
  );
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="card animate-slideUp p-6">
      <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        {icon}
      </span>
      <p className="font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-slate-900">{value}</p>
      <p className="mt-1 text-sm font-semibold text-emerald-600">{sub}</p>
    </div>
  );
}
