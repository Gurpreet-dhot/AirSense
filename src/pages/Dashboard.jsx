

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Chart from '../components/Chart';
import { loadAQIHistory } from '../store/airQualitySlice';
import { AQI_LEVELS, getPollutantLabel, formatPollutant } from '../utils/aqiUtils';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cityName, country, aqi, components, history, lat, lon, historyLoading } = useSelector(
    (state) => state.airQuality
  );

  
  useEffect(() => {
    if (lat && lon && !history.length) {
      dispatch(loadAQIHistory({ lat, lon, aqi }));
    }
  }, [lat, lon, aqi, history.length, dispatch]);

  
  if (!cityName || aqi === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {}
          <div className="mb-8 flex items-center gap-2 font-body text-sm text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span>Dashboard</span>
          </div>

          {}
          <div className="rounded-3xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center backdrop-blur-sm">
            <div className="text-5xl mb-4">📍</div>
            <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-3">
              No City Selected
            </h2>
            <p className="font-body text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Please search for a city on the home page first to view detailed air quality data and trends.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-display font-bold rounded-xl transition-all duration-200 hover:shadow-lg"
            >
              ← Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const aqiInfo = AQI_LEVELS[aqi];

  
  const allPollutants = [
    { key: 'CO', label: 'Carbon Monoxide', value: components?.co },
    { key: 'NO', label: 'Nitrogen Monoxide', value: components?.no },
    { key: 'NO2', label: 'Nitrogen Dioxide', value: components?.no2 },
    { key: 'O3', label: 'Ozone', value: components?.o3 },
    { key: 'SO2', label: 'Sulfur Dioxide', value: components?.so2 },
    { key: 'PM2_5', label: 'Fine Particles', value: components?.pm2_5 },
    { key: 'PM10', label: 'Coarse Particles', value: components?.pm10 },
    { key: 'NH3', label: 'Ammonia', value: components?.nh3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {}
        <div className="mb-8 flex items-center gap-2 font-body text-sm text-gray-600 dark:text-gray-400 animate-fade-in">
          <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Dashboard</span>
        </div>

        {}
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap animate-fade-in">
          <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-white">
            {cityName}, {country}
          </h1>
          <span className={`px-4 py-2 rounded-full font-display font-bold text-lg
            ${aqiInfo.textColor} ${aqiInfo.bgColor}`}>
            AQI: {aqi}/5 - {aqiInfo.label}
          </span>
        </div>

        {}
        {historyLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <p className="font-body text-gray-500 dark:text-gray-400">Loading chart data...</p>
            </div>
          </div>
        ) : (
          <Chart history={history} />
        )}

        {}
        <div className="mt-12 animate-slide-up">
          <div className="rounded-3xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 backdrop-blur-sm">
            <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-8">
              Complete Pollutant Breakdown
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allPollutants.map((pollutant) => (
                <div
                  key={pollutant.key}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <p className="font-body text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                    {pollutant.label}
                  </p>
                  <p className="font-display font-bold text-3xl text-gray-900 dark:text-white">
                    {pollutant.value !== null && pollutant.value !== undefined
                      ? formatPollutant(pollutant.value, pollutant.key)
                      : 'N/A'}
                  </p>
                  <p className="font-body text-xs text-gray-500 dark:text-gray-500 mt-1">
                    μg/m³
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="mt-8 animate-slide-up">
          <div className={`rounded-3xl border-2 p-6 backdrop-blur-sm
            ${aqiInfo.bgColor} ${aqiInfo.darkBg} border-opacity-30 dark:border-opacity-30`}>
            <h3 className="font-display font-bold text-lg mb-3 text-gray-900 dark:text-white">
              ⚠️ Health Advisory
            </h3>
            <p className="font-body text-gray-700 dark:text-gray-200 leading-relaxed">
              {aqiInfo.advice}
            </p>
          </div>
        </div>

        {}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-body font-medium rounded-lg transition-all duration-200"
          >
            ← Search Another City
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
