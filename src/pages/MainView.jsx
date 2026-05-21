import { useEffect, useMemo, useState } from "react";
import FilterNavigation from "../components/FilterNavigation";
import RestaurantCard from "../components/RestaurantCard";
import { fetchRestaurants } from "../data/restaurantsApi";

export default function MainView() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterOpenNow, setFilterOpenNow] = useState(false);
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [visibleItemsCount, setVisibleItemsCount] = useState(8);

  useEffect(() => {
    let isMounted = true;

    const loadRestaurants = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchRestaurants(filterCategory);

        if (isMounted) {
          setRestaurants(data);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message || "Unable to load restaurants.");
          setRestaurants([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRestaurants();

    return () => {
      isMounted = false;
    };
  }, [filterCategory]);

  useEffect(() => {
    setVisibleItemsCount(8);
  }, [filterOpenNow, filterPrice, filterCategory]);

  const categories = useMemo(() => {
    const categorySet = new Set();

    restaurants.forEach((restaurant) => {
      restaurant.categories?.forEach((category) => categorySet.add(category));
    });

    return Array.from(categorySet).sort((left, right) =>
      left.localeCompare(right),
    );
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesOpenNow = !filterOpenNow || restaurant.isOpen === true;
      const matchesPrice =
        filterPrice === "all" || restaurant.priceRange === filterPrice;
      const matchesCategory =
        filterCategory === "all" ||
        restaurant.categories?.includes(filterCategory);

      return matchesOpenNow && matchesPrice && matchesCategory;
    });
  }, [restaurants, filterOpenNow, filterPrice, filterCategory]);

  const visibleRestaurants = filteredRestaurants.slice(0, visibleItemsCount);
  const canLoadMore = filteredRestaurants.length > visibleItemsCount;

  const handleClearAll = () => {
    setFilterOpenNow(false);
    setFilterPrice("all");
    setFilterCategory("all");
    setVisibleItemsCount(8);
  };

  return (
    <main className="flex flex-1 flex-col gap-8 py-2">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl tracking-tight text-slate-950 sm:text-4xl">
            Restaurants
          </h1>
          <p className="max-w-2xl text-slate-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur at dolores amet aliquid, rerum iusto explicabo quis,
            magnam veritatis iure alias! Ex quod nihil dolor tempore quis minima
            quae est.
          </p>
        </div>

        <FilterNavigation
          filterOpenNow={filterOpenNow}
          setFilterOpenNow={setFilterOpenNow}
          filterPrice={filterPrice}
          setFilterPrice={setFilterPrice}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={categories}
          onClearAll={handleClearAll}
        />
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              All Restaurants
            </h2>
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-8 text-slate-700 shadow-sm">
            {error}
          </div>
        ) : isLoading ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-slate-600 shadow-sm">
            Loading restaurants from API...
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-10 text-center shadow-sm">
            <p className="text-lg font-medium text-slate-900">
              No restaurants match your criteria.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Try clearing one or more filters to see more results.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visibleRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>

            {canLoadMore ? (
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={() => setVisibleItemsCount((current) => current + 4)}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  LOAD MORE
                </button>
              </div>
            ) : null}
          </>
        )}
      </section>
    </main>
  );
}
