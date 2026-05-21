function StarIcon({ filled, activeClassName }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-4 w-4 ${filled ? activeClassName : "text-slate-300"}`}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.155c.969 0 1.371 1.24.588 1.81l-3.362 2.442a1 1 0 0 0-.364 1.118l1.285 3.95c.3.921-.755 1.688-1.538 1.118l-3.363-2.442a1 1 0 0 0-1.175 0l-3.363 2.442c-.783.57-1.838-.197-1.538-1.118l1.285-3.95a1 1 0 0 0-.364-1.118L2.074 9.377c-.783-.57-.38-1.81.588-1.81h4.155a1 1 0 0 0 .95-.69l1.286-3.95Z" />
    </svg>
  );
}

export default function StarRating({
  rating = 0,
  className = "",
  activeClassName = "text-slate-900",
}) {
  const roundedRating = Math.max(
    0,
    Math.min(5, Math.round(Number(rating) || 0)),
  );

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon
          key={index}
          filled={index < roundedRating}
          activeClassName={activeClassName}
        />
      ))}
      <span className="ml-1 text-sm font-semibold text-slate-700">
        {Number(rating || 0).toFixed(1)}
      </span>
    </div>
  );
}
