const categoriesPool = [
  "Japanese",
  "Sushi",
  "Ramen",
  "Italian",
  "Pizza",
  "Pasta",
  "Indonesian",
  "Nasi Goreng",
  "Seafood",
  "Western",
  "Burgers",
  "Cafe",
  "Dessert",
  "Coffee",
];

const photosPool = [
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1569058242251-92f0f7c6db9d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
];

const namePool = [
  "Sakura Table",
  "Bistro Sora",
  "Kopi House",
  "Urban Wok",
  "Pasta Lane",
  "Seaside Grill",
  "Nusantara Corner",
  "Oishi Spot",
  "The Green Fork",
  "Tasty Harbor",
  "Mie Station",
  "Sweet Ember",
];

const pricePool = ["$", "$$", "$$$"];

const reviewNames = ["Alya", "Raka", "Nadia", "Fajar", "Sinta", "Dimas"];

const reviewBodies = [
  "Portions are generous and the flavors feel balanced.",
  "Service was fast and the staff were friendly.",
  "A solid spot for a casual dinner with friends.",
  "The menu has good variety and the place is clean.",
  "Definitely coming back for the signature dish.",
  "Nice ambience and the drinks were refreshing.",
];

function pick(array, index) {
  return array[index % array.length];
}

function shuffleLike(array, index) {
  const result = [...array];
  const offset = index % result.length;
  return result.slice(offset).concat(result.slice(0, offset));
}

function buildRestaurant(index) {
  const name = `${pick(namePool, index)} ${index + 1}`;
  const categoryRotation = shuffleLike(categoriesPool, index).slice(0, 3);

  return {
    id: String(index + 1),
    name,
    description: `${name} serves a random selection of dishes and drinks with a focus on comfort food and quick service.`,
    photos: [pick(photosPool, index), pick(photosPool, index + 3)],
    categories: categoryRotation,
    priceRange: pick(pricePool, index),
    isOpen: index % 3 !== 0,
    rating: Number((4.1 + (index % 5) * 0.15).toFixed(1)),
    reviews: Array.from({ length: 3 }, (_, reviewIndex) => ({
      id: `${index + 1}-${reviewIndex + 1}`,
      name: pick(reviewNames, index + reviewIndex),
      rating: Number((4 + (reviewIndex % 2) * 0.5).toFixed(1)),
      body: pick(reviewBodies, index + reviewIndex),
    })),
  };
}

export function createRestaurants(count = 12) {
  return Array.from({ length: count }, (_, index) => buildRestaurant(index));
}
