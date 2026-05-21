import { createRestaurants } from "../mocks/restaurantData";

// VITE_USE_MOCK_API=false to use real API.
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== "false";

// In-memory mock dataset
const MOCK_DATA = createRestaurants(12);

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchRestaurants(category = "all") {
  if (USE_MOCK) {
    await delay(300);

    if (!category || category === "all") {
      return MOCK_DATA;
    }

    return MOCK_DATA.filter((r) => r.categories?.includes(category));
  }

  const query =
    category && category !== "all"
      ? `?category=${encodeURIComponent(category)}`
      : "";
  const response = await fetch(`/api/restaurants${query}`);

  if (!response.ok) {
    throw new Error("Failed to load restaurant data");
  }

  return response.json();
}

export async function fetchRestaurantById(id) {
  if (USE_MOCK) {
    await delay(200);
    const found = MOCK_DATA.find((r) => String(r.id) === String(id)) || null;
    if (!found) {
      const err = new Error("Not found");
      err.status = 404;
      throw err;
    }

    return found;
  }

  const response = await fetch(`/api/restaurants/${encodeURIComponent(id)}`);

  if (!response.ok) {
    throw new Error("Failed to load restaurant details");
  }

  return response.json();
}
