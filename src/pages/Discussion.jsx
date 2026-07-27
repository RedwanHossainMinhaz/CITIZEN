import { useMemo, useState } from 'react';
import { TrendingUp, ShieldCheck, ChevronDown, Sparkles, Clock } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';

const TABS = [
  { id: 'hot', label: 'Hot', icon: TrendingUp },
  { id: 'new', label: 'New', icon: Clock },
  { id: 'top', label: 'Top', icon: Sparkles },
];

export default function Discussion() {
  const { posts, settings, updatePost } = useAppData();
  const { currentUser } = useAuth();
  const [tab, setTab] = useState('hot');
  const [ward, setWard] = useState('Dhaka North');

  const visiblePosts = useMemo(() => {
    const sorted = [...posts];
    if (tab === 'new') sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (tab === 'top') sorted.sort((a, b) => b.upvotes - a.upvotes);
    else sorted.sort((a, b) => b.upvotes + b.comments - (a.upvotes + a.comments));
    return sorted;
  }, [posts, tab]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ${
                    tab === id ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </div>

            <div className="relative">
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="input appearance-none pr-8 text-sm font-medium"
              >
                <option>Dhaka North</option>
                <option>Dhaka South</option>
                <option>Chattogram</option>
                <option>Sylhet</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {!currentUser && (
            <div className="mb-4 rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-700">
              <a href="/login" className="font-semibold underline">Log in</a> to upvote, comment and start new discussions.
            </div>
          )}

          <div className="flex flex-col gap-4">
            {visiblePosts.length === 0 && (
              <div className="card p-8 text-center text-slate-500">No discussions yet. Be the first to post.</div>
            )}
            {visiblePosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onVote={(dir) => updatePost(post.id, { upvotes: post.upvotes + dir })}
              />
            ))}
          </div>

          {visiblePosts.length > 0 && (
            <div className="mt-6 flex justify-center">
              <button className="btn-secondary">Load More Discussions</button>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-5">
          <div className="card animate-slideUp p-5">
            <h4 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
              <TrendingUp className="h-5 w-5 text-brand-500" /> Trending Topics
            </h4>
            <ul className="flex flex-col divide-y divide-slate-100">
              {settings.trendingTopics.map((topic) => (
                <li key={topic.id} className="py-2.5 first:pt-0 last:pb-0">
                  <p className="text-xs font-semibold text-slate-400">
                    {topic.rank} &middot; {topic.category}
                  </p>
                  <p className="text-sm font-semibold text-slate-800 transition-colors hover:text-brand-600">
                    {topic.title}
                  </p>
                  <p className="text-xs text-slate-400">{topic.posts} posts</p>
                </li>
              ))}
            </ul>
            <button className="mt-3 text-sm font-semibold text-brand-600 hover:underline">View All Topics</button>
          </div>

          <div className="card animate-slideUp bg-brand-50/60 p-5">
            <h4 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="h-5 w-5 text-brand-500" /> Community Rules
            </h4>
            <ol className="flex flex-col gap-2 text-sm text-slate-600">
              {settings.communityRules.map((rule, i) => (
                <li key={i}>{i + 1}. {rule}</li>
              ))}
            </ol>
            <button className="mt-3 text-sm font-semibold text-brand-600 hover:underline">Read full guidelines</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
