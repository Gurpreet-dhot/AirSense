

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCity } from '../store/airQualitySlice';
import { useDebounce } from '../hooks/useDebounce';
import { Loader } from './Loader';

export const SearchBar = () => {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 500);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.airQuality);

  
  useEffect(() => {
    if (debouncedInput.trim()) {
      dispatch(searchCity(debouncedInput));
    }
  }, [debouncedInput, dispatch]);

  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      dispatch(searchCity(input));
    }
  };

  
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 animate-fade-in">
      {}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search city (e.g., London, New York, Tokyo)..."
          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-body placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 transition-all duration-200"
        />
        {}
        <svg
          className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {}
        {loading && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2">
            <Loader className="w-4 h-4" />
          </div>
        )}
      </div>

      {}
      {error && (
        <div className="mt-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-slide-up">
          <p className="text-sm font-body text-red-800 dark:text-red-200">
            ⚠️ {error}
          </p>
        </div>
      )}

      {}
      {!input && !loading && !error && (
        <p className="mt-3 text-sm font-body text-gray-500 dark:text-gray-400 text-center">
          Enter a city name to view current air quality and 24h forecast
        </p>
      )}
    </div>
  );
};

export default SearchBar;
