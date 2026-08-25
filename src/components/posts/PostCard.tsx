import { Link } from "react-router-dom";
import type { IPostCardProps } from "../../interfaces/IPostList";
import { formatProfessorName } from "../../utils/author";
import { estimateReadingTime } from "../../utils/readingTime";

export default function PostCard({ post }: IPostCardProps) {
  return (
    <Link
      to={`/posts/${post._id}`}
      className="group overflow-hidden rounded-[14px] bg-white text-left shadow-[0_4px_18px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
    >
      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt={post.title}
          loading="lazy"
          className="h-[180px] w-full object-cover transition duration-300 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-[180px] items-center justify-center bg-[linear-gradient(135deg,#ccfbf1,#99f6e4,#e2e8f0)] px-6">
          <span className="text-center text-3xl font-bold tracking-[0.18em] text-slate-700">
            {post.discipline.label.slice(0, 3).toUpperCase()}
          </span>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-900">{post.title}</h3>
        <p className="mt-2 text-sm text-slate-500">
          <span className="font-semibold text-slate-700">{formatProfessorName(post.author.name)}</span>
          {" | "}
          {post.series}
        </p>
        <p className="mt-1 text-sm text-slate-500">{estimateReadingTime(post.summary, post.content)} min</p>
      </div>
    </Link>
  );
}
