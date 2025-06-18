import type { CityFeature } from "../types";

export const getCityBoundary = async (
  cityName: string
): Promise<CityFeature> => {
  const query = encodeURIComponent(cityName);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=geojson&polygon_geojson=1&limit=1`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch city data");
  }

  const data = await response.json();
  if (!data.features || data.features.length === 0) {
    throw new Error("City not found");
  }

  return data.features[0];
};
