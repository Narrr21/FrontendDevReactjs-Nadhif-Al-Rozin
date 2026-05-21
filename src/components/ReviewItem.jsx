export default function ReviewItem({ review }) {
  return (
    <article className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <img
        src={review.avatar}
        alt={review.name}
        className="h-14 w-14 rounded-full object-cover ring-2 ring-slate-100"
        loading="lazy"
      />

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h4 className="text-base font-semibold text-slate-900">
            {review.name}
          </h4>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            {review.rating.toFixed(1)} / 5
          </span>
        </div>

        <p className="text-gray-600">{review.text}</p>
      </div>
    </article>
  );
}
