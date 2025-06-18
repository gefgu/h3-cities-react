import React from "react";
import type { FeatureCollection } from "geojson";

interface ControlsProps {
  cityName: string;
  setCityName: (name: string) => void;
  resolution: number;
  setResolution: (resolution: number) => void;
  onGenerateHexagons: () => void;
  onDownloadGeoJSON: () => void;
  loading: boolean;
  error: string | null;
  hexagons: FeatureCollection | null;
}

const Controls: React.FC<ControlsProps> = ({
  cityName,
  setCityName,
  resolution,
  setResolution,
  onGenerateHexagons,
  onDownloadGeoJSON,
  loading,
  error,
  hexagons,
}) => {
  return (
    <div className="controls">
      <div className="controls-header">
        <h1>H3 Cities</h1>
        <p className="app-subtitle">
          Generate H3 hexagonal grids for any city worldwide
        </p>
      </div>

      <div className="controls-content">
        <div className="input-group">
          <label htmlFor="city-input">City Name</label>
          <input
            id="city-input"
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name (e.g., Paris, France)"
          />
        </div>

        <div className="input-group">
          <label htmlFor="resolution-slider">
            H3 Resolution
            <span className="resolution-value">{resolution}</span>
          </label>
          <div className="slider-container">
            <input
              id="resolution-slider"
              type="range"
              min="5"
              max="12"
              value={resolution}
              onChange={(e) => setResolution(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="button-group">
          <button onClick={onGenerateHexagons} disabled={loading}>
            {loading && <span className="loading-spinner"></span>}
            {loading ? "Generating..." : "Generate Hexagons"}
          </button>

          {hexagons && (
            <button onClick={onDownloadGeoJSON} className="download-btn">
              <svg
                className="info-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Export GeoJSON
            </button>
          )}
        </div>

        <div className="status-container">
          {error && <div className="error">{error}</div>}

          {hexagons && (
            <div className="info">
              <svg
                className="info-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Generated {hexagons.features.length.toLocaleString()} hexagons
            </div>
          )}

          <div className="h3-attribution">
            <p className="attribution-text">
              Powered by{" "}
              <a
                href="https://h3geo.org"
                target="_blank"
                rel="noopener noreferrer"
                className="h3-link"
              >
                Uber's H3
              </a>{" "}
              geospatial indexing system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
