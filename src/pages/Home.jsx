

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import AQICard from '../components/AQICard';

export const Home = () => {
  const { aqi, components, cityName, country } = useSelector((state) => state.airQuality);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-gray-900 dark:text-white mb-4">
            Welcome to AirSense
          </h1>
          <p className="font-body text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Monitor real-time air quality and pollution levels in your city. Get health recommendations and track 24-hour air quality trends.
          </p>
        </div>

        {}
        <SearchBar />

        {}
        {aqi && cityName && (
          <div className="space-y-8">
            <AQICard aqi={aqi} components={components} cityName={cityName} country={country} />

            {}
            <div className="flex justify-center animate-slide-up">
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-display font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                View Full Dashboard →
              </Link>
            </div>
          </div>
        )}

        {}
        {!aqi && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-5xl mb-4">🌍</div>
            <p className="font-body text-gray-500 dark:text-gray-400">
              Search for a city above to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
