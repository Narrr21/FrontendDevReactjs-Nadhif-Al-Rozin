import express from "express";
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createRestaurants } from "./restaurantData.js";

const app = express();
const port = Number(process.env.PORT || 3001);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const restaurants = createRestaurants();
const distPath = path.resolve(__dirname, "..", "dist");

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.get("/api/restaurants", (request, response) => {
  const category = String(request.query.category || "all");

  if (category !== "all") {
    const filteredRestaurants = restaurants.filter((restaurant) =>
      restaurant.categories.includes(category),
    );

    response.json(filteredRestaurants);
    return;
  }

  response.json(restaurants);
});

app.get("/api/restaurants/:id", (request, response) => {
  const restaurant = restaurants.find(
    (entry) => String(entry.id) === String(request.params.id),
  );

  if (!restaurant) {
    response.status(404).json({ message: "Restaurant not found" });
    return;
  }

  response.json(restaurant);
});

if (existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get("*", (_request, response) => {
    response.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
