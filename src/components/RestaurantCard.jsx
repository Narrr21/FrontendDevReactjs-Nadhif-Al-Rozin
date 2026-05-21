import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

function StatusBadge({ isOpen }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${isOpen ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-500"}`}
      />
      {isOpen ? "OPEN NOW" : "CLOSED"}
    </span>
  );
}

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  const image =
    restaurant.photos?.[0] ||
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80";
  const primaryCategory = restaurant.categories?.[0] || "Uncategorized";

  return (
    <article className="flex h-full flex-col overflow-hidden bg-white transition duration-200 hover:-translate-y-1">
      <div className="aspect-4/3 overflow-hidden bg-slate-200">
        <img
          src={image}
          alt={restaurant.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-0 py-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-xl font-medium leading-tight text-slate-900">
              {restaurant.name}
            </h3>
          </div>

          <StarRating
            rating={restaurant.rating}
            activeClassName="text-blue-900"
          />
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="min-w-0 flex items-center gap-2 text-sm uppercase tracking-wide text-slate-500">
              <span className="truncate">{primaryCategory}</span>
              <span>•</span>
              <span className="shrink-0">{restaurant.priceRange}</span>
            </div>
            <StatusBadge isOpen={restaurant.isOpen} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          className="mt-4 inline-flex w-full items-center justify-center rounded-sm bg-blue-900 px-4 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-blue-800"
        >
          LEARN MORE
        </button>
      </div>
    </article>
  );
}
