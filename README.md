# AirSense - real time air quality monitoring dashboard

A modern, responsive React-based air quality monitoring dashboard built with React 18, Redux Toolkit, and Tailwind CSS.

## Features

- **Real-time Air Quality Data**: Search for any city and get current AQI levels from OpenWeatherMap API
- **Color-Coded AQI Levels**: Visual indicators for air quality (Good to Very Poor)
- **24-Hour Trend Charts**: View historical air quality patterns with interactive Recharts
- **Pollutant Breakdown**: Comprehensive grid showing CO, NO, NO2, O3, SO2, PM2.5, PM10, and NH3 levels
- **Health Recommendations**: Personalized health advice based on current AQI levels
- **Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens
- **Debounced Search**: Optimized API calls with 500ms debounce on city search
- **Animated UI**: Smooth fade-in, slide-up, and spin animations throughout

## Tech Stack

- **Frontend Framework**: React 18 with Hooks
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v3 with dark mode support
- **Charts**: Recharts for data visualization
- **API Calls**: Axios with custom service layer
- **Build Tool**: Vite for lightning-fast development

## Project Structure

```
na/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           — Sticky navigation with logo and dark mode toggle
│   │   ├── SearchBar.jsx        — Debounced city search input
│   │   ├── AQICard.jsx          — SVG gauge display with AQI info
│   │   ├── Chart.jsx            — Recharts components for trends
│   │   └── Loader.jsx           — Animated triple-ring spinner
│   ├── pages/
│   │   ├── Home.jsx             — Hero page with search
│   │   └── Dashboard.jsx        — Detailed AQI dashboard view
│   ├── store/
│   │   ├── store.js             — Redux store configuration
│   │   └── airQualitySlice.js   — Redux slice with async thunks
│   ├── services/
│   │   └── airQualityService.js — API calls for OpenWeatherMap
│   ├── hooks/
│   │   └── useDebounce.js       — Custom debounce hook
│   ├── utils/
│   │   └── aqiUtils.js          — AQI helpers and formatters
│   ├── App.jsx                  — Main app component with routing
│   ├── main.jsx                 — Entry point
│   └── index.css                — Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── .gitignore
└── README.md
```

## AQI Scale

| Level | Range | Label | Color |
|-------|-------|-------|-------|
| 1 | 0-1 | Good | Green (#22c55e) |
| 2 | 1-2 | Fair | Light Green (#86efac) |
| 3 | 2-3 | Moderate | Yellow (#eab308) |
| 4 | 3-4 | Poor | Orange (#f97316) |
| 5 | 4-5 | Very Poor | Red (#ef4444) |

## Setup Instructions

### 1. Clone and Install

```bash
cd na
npm install
```

### 2. Get OpenWeatherMap API Key

1. Go to [openweathermap.org](https://openweathermap.org)
2. Sign up for a free account
3. Navigate to API keys section
4. Copy your API key

### 3. Configure Environment

Create `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Development

```bash
npm run dev
```

This starts the Vite dev server at `http://localhost:5173`

### 5. Production Build

```bash
npm run build
```

Creates optimized build in `dist/` directory

### 6. Preview Build

```bash
npm run preview
```

## Design System

### Colors
- **Accent**: Emerald (#10b981)
- **Light Background**: Gray-50
- **Dark Background**: Gray-950
- **Cards**: White / Gray-800

### Typography
- **Display**: Space Mono (headings, badges)
- **Body**: DM Sans (text, inputs)

### Animations
- `animate-fade-in`: Smooth opacity transition
- `animate-slide-up`: Upward slide animation
- `animate-spin-slow`: Continuous rotation

## API Integration

### Three-Step Process

1. **Geocoding API**: Convert city name to coordinates
   ```
   GET /geo/1.0/direct?q={city}&limit=1&appid={key}
   ```

2. **Air Pollution API**: Get current AQI at coordinates
   ```
   GET /data/2.5/air_pollution?lat={lat}&lon={lon}&appid={key}
   ```

3. **History API**: Fetch 24h trend data
   ```
   GET /data/2.5/air_pollution/history?lat={lat}&lon={lon}&start={unix}&end={unix}&appid={key}
   ```

## Key Features Implementation

### Debounced Search
- 500ms delay on city input
- Fires on Enter key immediately
- Shows spinner while loading

### Dark Mode
- Toggle button in navbar
- Persisted in localStorage
- Tailwind `dark:` classes throughout
- Smooth transitions

### Responsive Design
- Mobile-first approach
- Breakpoints at md (768px) and lg (1024px)
- Flexible grids and responsive text sizes

## Error Handling
- API errors shown with user-friendly messages
- Loading states on all async operations
- Separate loading flags for search and history
- Guard states for empty data

## Browser Support
- Modern browsers with ES6 support
- Chrome, Firefox, Safari, Edge (latest versions)

## Performance
- Code splitting with React Router
- Optimized chart rendering with sampled data (every 2nd point)
- CSS transitions for smooth animations
- Lazy loading of components

## Future Enhancements
- Multiple city comparison
- Air quality alerts and notifications
- Historical data export
- Weather integration
- User favorites

## License

MIT

## Support

For issues or questions, please check the [OpenWeatherMap API documentation](https://openweathermap.org/api).
