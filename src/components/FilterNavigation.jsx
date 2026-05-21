export default function FilterNavigation({
  filterOpenNow,
  setFilterOpenNow,
  filterPrice,
  setFilterPrice,
  filterCategory,
  setFilterCategory,
  categories,
  onClearAll,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5">
        <span className="flex items-center text-sm font-semibold text-slate-600 lg:min-w-24 lg:justify-center">
          Filter By:
        </span>
        <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-700 lg:min-w-32">
          <input
            type="checkbox"
            checked={filterOpenNow}
            onChange={(event) => setFilterOpenNow(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          Open Now
        </label>

        <label className="inline-flex flex-col text-sm font-medium text-slate-700 lg:w-auto">
          <select
            value={filterPrice === "all" ? "" : filterPrice}
            onChange={(event) => setFilterPrice(event.target.value)}
            className="w-auto min-w-20 border-0 border-b border-slate-300 bg-transparent px-0 py-2 pr-6 text-slate-800 outline-none ring-0 transition focus:border-slate-500 focus:ring-0"
          >
            <option value="" disabled hidden>
              Price
            </option>
            <option value="all">All</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </label>

        <label className="inline-flex flex-col text-sm font-medium text-slate-700 lg:w-auto">
          <select
            value={filterCategory === "all" ? "" : filterCategory}
            onChange={(event) => setFilterCategory(event.target.value)}
            className="w-auto min-w-32 border-0 border-b border-slate-300 bg-transparent px-0 py-2 pr-6 text-slate-800 outline-none ring-0 transition focus:border-slate-500 focus:ring-0"
          >
            <option value="" disabled hidden>
              Categories
            </option>
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <div className="hidden lg:block lg:ml-auto" />

        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600 lg:self-stretch"
        >
          CLEAR ALL
        </button>
      </div>
    </div>
  );
}
