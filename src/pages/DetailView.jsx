import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewItem from "../components/ReviewItem";
import StarRating from "../components/StarRating";
import { fetchRestaurantById } from "../data/restaurantsApi";

export default function DetailView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadRestaurant = async () => {
      setIsLoading(true);
      setError("");

      try {
        if (isMounted) {
          setRestaurant(await fetchRestaurantById(id));
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message || "Unable to load restaurant details.");
          setRestaurant(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRestaurant();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <main className="flex flex-1 items-center justify-center py-12 text-slate-600">
        Loading restaurant details...
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-1 flex-col gap-5 py-2">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-fit rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to List
        </button>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
          {error}
        </div>
      </main>
    );
  }

  if (!restaurant) {
    return (
      <main className="flex flex-1 flex-col gap-5 py-2">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-fit rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to List
        </button>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
          Restaurant not found.
        </div>
      </main>
    );
  }

  const image =
    restaurant.photos?.[0] ||
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80";

  return (
    <main className="flex flex-1 flex-col gap-8 py-2">
      <div className="flex items-start justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex w-fit items-center justify-center rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to List
        </button>
      </div>

      <section className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {restaurant.name}
          </h1>
          <StarRating rating={restaurant.rating} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)] lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img
              src={image}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="h-fit self-start space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {restaurant.categories?.[0] || "Uncategorized"}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {restaurant.priceRange}
              </span>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${restaurant.isOpen ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${restaurant.isOpen ? "bg-emerald-500" : "bg-red-500"}`}
                />
                {restaurant.isOpen ? "OPEN NOW" : "CLOSED"}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="aspect-video w-full">
                <iframe
                  title={`${restaurant.name} map`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.name)}&output=embed`}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-slate-200" />

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Reviews
        </h2>

        <div className="space-y-4">
          {restaurant.reviews?.length ? (
            restaurant.reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
              No reviews available for this restaurant.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
