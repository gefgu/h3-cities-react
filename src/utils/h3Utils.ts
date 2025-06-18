import { polygonToCells, cellToBoundary } from "h3-js";
import type {
  Polygon,
  MultiPolygon,
  FeatureCollection,
  Geometry,
} from "geojson";
import type { HexagonFeature } from "../types";

export const generateH3Hexagons = (
  geometry: Geometry,
  resolution: number
): string[] => {
  let h3Hexagons: string[] = [];

  if (geometry.type === "Polygon") {
    h3Hexagons = polygonToCells(geometry.coordinates, resolution);
  } else if (geometry.type === "MultiPolygon") {
    for (const polygon of geometry.coordinates) {
      const hexs = polygonToCells([polygon[0]], resolution);
      h3Hexagons.push(...hexs);
    }
  }

  return Array.from(new Set(h3Hexagons));
};

export const createHexagonFeatures = (hexagons: string[]): HexagonFeature[] => {
  return hexagons.map((h) => {
    const boundary = cellToBoundary(h, true);
    const geoJsonBoundary = boundary.map(([lat, lng]) => [lng, lat]);

    return {
      type: "Feature" as const,
      geometry: {
        type: "Polygon" as const,
        coordinates: [geoJsonBoundary],
      },
      properties: { h },
    };
  });
};

export const createFeatureCollection = (
  features: HexagonFeature[]
): FeatureCollection => {
  return {
    type: "FeatureCollection" as const,
    features,
  };
};
