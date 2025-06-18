import type { ViewState, CityFeature } from "../types";

export const calculateViewState = (
  cityFeature: CityFeature,
  resolution: number,
  currentViewState: ViewState
): ViewState => {
  if (cityFeature.bbox) {
    const [minLng, minLat, maxLng, maxLat] = cityFeature.bbox;
    return {
      ...currentViewState,
      longitude: (minLng + maxLng) / 2,
      latitude: (minLat + maxLat) / 2,
      zoom: Math.max(8, Math.min(12, 15 - resolution)),
    };
  }
  return currentViewState;
};

export const getMapStyle = () => ({
  version: 8,
  sources: {
    "carto-light": {
      type: "raster" as const,
      tiles: [
        "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors © CARTO",
    },
  },
  layers: [
    {
      id: "carto-light-layer",
      type: "raster" as const,
      source: "carto-light",
      minzoom: 0,
      maxzoom: 22,
    },
  ],
});
