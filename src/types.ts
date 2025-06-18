import type { Feature } from "geojson";

export interface HexagonFeature extends Feature {
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: {
    h: string;
  };
}

export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

export interface CityFeature extends Feature {
  bbox?: [number, number, number, number];
}
