import React, { useState, useCallback, useMemo } from "react";
import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";

import Controls from "./components/Controls";
import { createHexagonLayer } from "./components/MapLayers";
import { getCityBoundary } from "./services/cityService";
import {
  generateH3Hexagons,
  createHexagonFeatures,
  createFeatureCollection,
} from "./utils/h3Utils";
import { calculateViewState, getMapStyle } from "./utils/mapUtils";
import { downloadGeoJSON } from "./utils/fileUtils";
import type { ViewState } from "./types";
import type { FeatureCollection } from "geojson";

const App: React.FC = () => {
  const [cityName, setCityName] = useState("Paris, France");
  const [resolution, setResolution] = useState(8);
  const [hexagons, setHexagons] = useState<FeatureCollection | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>({
    longitude: 2.3522,
    latitude: 48.8566,
    zoom: 10,
    pitch: 0,
    bearing: 0,
  });

  const generateHexagons = useCallback(async () => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const cityFeature = await getCityBoundary(cityName);
      const h3Hexagons = generateH3Hexagons(cityFeature.geometry, resolution);

      if (h3Hexagons.length === 0) {
        throw new Error("No hexagons generated for this city");
      }

      const features = createHexagonFeatures(h3Hexagons);
      const featureCollection = createFeatureCollection(features);

      setHexagons(featureCollection);
      setViewState(calculateViewState(cityFeature, resolution, viewState));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [cityName, resolution, viewState]);

  const handleDownloadGeoJSON = useCallback(() => {
    if (hexagons) {
      downloadGeoJSON(hexagons, cityName, resolution);
    }
  }, [hexagons, cityName, resolution]);

  const layers = useMemo(() => createHexagonLayer(hexagons), [hexagons]);
  const mapStyle = useMemo(() => getMapStyle(), []);

  return (
    <div className="app">
      <Controls
        cityName={cityName}
        setCityName={setCityName}
        resolution={resolution}
        setResolution={setResolution}
        onGenerateHexagons={generateHexagons}
        onDownloadGeoJSON={handleDownloadGeoJSON}
        loading={loading}
        error={error}
        hexagons={hexagons}
      />

      <div className="map-container">
        <DeckGL
          viewState={viewState}
          onViewStateChange={({ viewState }) => setViewState(viewState)}
          controller={true}
          layers={layers}
        >
          <Map mapStyle={mapStyle} />
        </DeckGL>
      </div>
    </div>
  );
};

export default App;
