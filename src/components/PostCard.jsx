import { useState } from 'react';
import { ChevronUp, ChevronDown, MessageSquare, Share2 } from 'lucide-react';

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3600000);
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export default function PostCard({ post, onVote }) {
  const [voteDelta, setVoteDelta] = useState(0);

  function vote(dir) {
    setVoteDelta((prev) => (prev === dir ? 0 : dir));
    onVote?.(dir);
  }

  const total = post.upvotes + voteDelta;

  return (
    <article className="card animate-slideUp flex gap-4 p-5">
      <div className="flex flex-col items-center gap-1 pt-1">
        <button
          onClick={() => vote(1)}
          aria-label="Upvote"
          className={`rounded p-1 transition-colors duration-150 hover:bg-slate-100 ${
            voteDelta === 1 ? 'text-brand-600' : 'text-slate-400'
          }`}
        >
          <ChevronUp className="h-5 w-5" />
        </button>
        <span className="text-sm font-bold text-slate-700">
          {total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total}
        </span>
        <button
          onClick={() => vote(-1)}
          aria-label="Downvote"
          className={`rounded p-1 transition-colors duration-150 hover:bg-slate-100 ${
            voteDelta === -1 ? 'text-red-500' : 'text-slate-400'
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-brand-600">c/{post.category}</span>
          {' \u2022 '}Posted by @{post.authorName} {' \u2022 '} {timeAgo(post.createdAt)}
        </p>
        <h3 className="mt-1 text-lg font-bold text-slate-900">{post.title}</h3>
        <p className="mt-1.5 line-clamp-3 text-sm text-slate-600">{post.body}</p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" /> {post.comments} Comments
            </span>
            <span className="flex items-center gap-1 transition-colors hover:text-brand-600">
              <Share2 className="h-4 w-4" /> Share
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
