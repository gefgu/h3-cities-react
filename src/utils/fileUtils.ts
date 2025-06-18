import type { FeatureCollection } from "geojson";

export const downloadGeoJSON = (
  hexagons: FeatureCollection,
  cityName: string,
  resolution: number
): void => {
  const dataStr = JSON.stringify(hexagons, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/geo+json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${cityName.replace(
    /[^a-zA-Z0-9]/g,
    "_"
  )}_resolution_${resolution}.geojson`;
  link.click();

  URL.revokeObjectURL(url);
};
