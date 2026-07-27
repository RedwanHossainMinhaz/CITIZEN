import { useState } from 'react';
import { Trash2, Search } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { ConfirmModal } from './ManageUsers';

export default function ManagePosts() {
  const { posts, deletePost } = useAppData();
  const [query, setQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = posts.filter(
    (p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.authorName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Posts</h1>
          <p className="mt-1 text-slate-500">Review and remove any discussion post on the platform.</p>
        </div>
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts or authors..."
            className="input w-72 pl-9"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {filtered.map((post) => (
          <div key={post.id} className="card flex items-start justify-between gap-4 p-5">
            <div className="min-w-0">
              <p className="text-xs text-slate-400">
                <span className="font-semibold text-brand-600">c/{post.category}</span> &middot; @{post.authorName}
              </p>
              <p className="mt-1 font-semibold text-slate-800">{post.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">{post.body}</p>
              <p className="mt-2 text-xs text-slate-400">{post.upvotes} upvotes &middot; {post.comments} comments</p>
            </div>
            <button
              onClick={() => setConfirmDelete(post)}
              className="btn-danger shrink-0"
              aria-label="Delete post"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        ))}
        {filtered.length === 0 && <div className="card p-8 text-center text-slate-400">No posts match your search.</div>}
      </div>

      {confirmDelete && (
        <ConfirmModal
          title="Delete this post?"
          message={`"${confirmDelete.title}" will be permanently removed from the Discussion feed.`}
          confirmLabel="Delete post"
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => {
            deletePost(confirmDelete.id);
            setConfirmDelete(null);
          }}
        />
      )}
    </div>
  );
}
