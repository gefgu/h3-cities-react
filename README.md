# H3 Cities - Hexagonal Grid Generator

Generate H3 hexagonal grids for cities worldwide using Uber's H3 geospatial indexing system. A powerful tool for spatial analysis and urban planning.

![H3 Cities](public/h3_icon.png)

## Features

- 🗺️ Generate H3 hexagonal grids for any city worldwide
- 🎯 Adjustable resolution levels (5-12)
- 📄 Export generated grids as GeoJSON
- 🌍 Interactive map visualization
- 📱 Responsive design

## Built With

- **React** + **TypeScript** - Frontend framework
- **Uber's H3** - Geospatial indexing system
- **Deck.GL** - WebGL-powered visualization
- **MapLibre GL** - Interactive maps
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/gefgu/h3-cities-react.git
cd h3-cities-react
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

## Usage

1. Enter a city name (e.g., "Paris, France")
2. Select the desired H3 resolution level
3. Click "Generate Hexagons" to create the grid
4. Use "Export GeoJSON" to download the data

## H3 Resolution Levels

- **5-7**: Country/region level
- **8-9**: City level (recommended)
- **10-11**: Neighborhood level
- **12**: Block level

## Attribution

This project is powered by [Uber's H3](https://h3geo.org) geospatial indexing system.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
