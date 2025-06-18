import { GeoJsonLayer } from "@deck.gl/layers";
import type { FeatureCollection } from "geojson";

export const createHexagonLayer = (hexagons: FeatureCollection | null) => {
  if (!hexagons) {
    return [];
  }

  return [
    new GeoJsonLayer({
      id: "hexagons",
      data: hexagons,
      filled: true,
      stroked: true,
      getFillColor: [128, 128, 128, 30],
      getLineColor: [100, 100, 100, 180],
      getLineWidth: 1,
      lineWidthMinPixels: 1,
      lineWidthMaxPixels: 3,
      getDashArray: [5, 3],
      dashJustified: true,
      pickable: true,
      autoHighlight: true,
      highlightColor: [128, 128, 128, 80],
    }),
  ];
};
