import { Link } from "react-router-dom";
import type { IPostListItemProps } from "../../interfaces/IPostList";
import { formatProfessorName } from "../../utils/author";
import { estimateReadingTime } from "../../utils/readingTime";

export default function PostListItem({ post }: IPostListItemProps) {
  return (
    <Link
      to={`/posts/${post._id}`}
      className="group flex gap-4 overflow-hidden rounded-[14px] bg-white text-left shadow-[0_4px_18px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
    >
      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt={post.title}
          loading="lazy"
          className="h-[140px] w-[140px] shrink-0 object-cover sm:w-[200px]"
        />
      ) : (
        <div className="flex h-[140px] w-[140px] shrink-0 items-center justify-center bg-[linear-gradient(135deg,#ccfbf1,#99f6e4,#e2e8f0)] sm:w-[200px]">
          <span className="text-xl font-bold tracking-[0.18em] text-slate-700">
            {post.discipline.label.slice(0, 3).toUpperCase()}
          </span>
        </div>
      )}

      <div className="flex min-w-0 flex-col justify-center gap-1 py-4 pr-4">
        <h3 className="text-lg font-bold text-slate-900">{post.title}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-slate-500">{post.summary}</p>
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-700">{formatProfessorName(post.author.name)}</span>
          {" | "}
          {post.series}
          {" | "}
          {estimateReadingTime(post.summary, post.content)} min
        </p>
      </div>
    </Link>
  );
}
