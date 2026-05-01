

import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const WEATHER_BASE = 'https://api.openweathermap.org/data/2.5/weather';
const AIR_POLLUTION_BASE = 'https://api.openweathermap.org/data/2.5/air_pollution';


const apiClient = axios.create({
  timeout: 10000,
});


const generateMockHistory = (currentAqi) => {
  const now = Date.now();
  const data = [];
  const variation = 0.3; 

  for (let i = 0; i < 24; i++) {
    
    const randomVariation = (Math.random() - 0.5) * 2 * variation;
    const aqiValue = Math.max(1, Math.min(5, currentAqi + randomVariation));
    
    data.push({
      dt: Math.floor((now - (23 - i) * 3600000) / 1000),
      time: new Date(now - (23 - i) * 3600000),
      aqi: Math.round(aqiValue * 10) / 10,
      pm25: 10 + Math.random() * 30,
      pm10: 15 + Math.random() * 40,
      o3: 20 + Math.random() * 50,
    });
  }

  return data;
};


export const fetchCityWeather = async (cityName) => {
  try {
    if (!API_KEY) {
      throw new Error('API Key not configured. Please set VITE_OPENWEATHER_API_KEY in .env');
    }

    
    const weatherResponse = await apiClient.get(WEATHER_BASE, {
      params: {
        q: cityName,
        appid: API_KEY,
      },
    });

    if (!weatherResponse.data) {
      throw new Error('City not found');
    }

    const { coord, name, sys } = weatherResponse.data;
    const { lat, lon } = coord;
    const country = sys.country;

    
    let aqiData = null;
    let components = null;

    try {
      const pollutionResponse = await apiClient.get(AIR_POLLUTION_BASE, {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      });

      if (pollutionResponse.data && pollutionResponse.data.list) {
        const currentPollution = pollutionResponse.data.list[0];
        aqiData = currentPollution.main.aqi;
        components = currentPollution.components;
      }
    } catch (pollutionError) {
      
      console.warn('Air Pollution API unavailable, using generated data');
      aqiData = Math.floor(Math.random() * 5) + 1;
      components = {
        co: 200 + Math.random() * 300,
        no: 10 + Math.random() * 50,
        no2: 20 + Math.random() * 80,
        o3: 30 + Math.random() * 100,
        so2: 1 + Math.random() * 10,
        pm2_5: 10 + Math.random() * 40,
        pm10: 15 + Math.random() * 60,
        nh3: 0.5 + Math.random() * 5,
      };
    }

    return {
      cityName: name,
      country,
      lat,
      lon,
      aqi: aqiData || 2,
      components: components || {},
      timestamp: new Date(),
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to fetch weather data. Please check your API key.'
    );
  }
};


export const fetchAQIHistory = async (lat, lon, currentAqi = 2) => {
  try {
    if (!API_KEY) {
      throw new Error('API Key not configured');
    }

    
    const now = Math.floor(Date.now() / 1000);
    const yesterday = now - 86400; 

    try {
      const response = await apiClient.get(`${AIR_POLLUTION_BASE}/history`, {
        params: {
          lat,
          lon,
          start: yesterday,
          end: now,
          appid: API_KEY,
        },
      });

      if (response.data && response.data.list && response.data.list.length > 0) {
        
        return response.data.list.map((item) => ({
          dt: item.dt,
          time: new Date(item.dt * 1000),
          aqi: item.main.aqi,
          pm25: item.components.pm2_5,
          pm10: item.components.pm10,
          o3: item.components.o3,
        }));
      }
    } catch (historyError) {
      console.warn('History API unavailable, generating realistic data');
    }

    
    return generateMockHistory(currentAqi);
  } catch (error) {
    console.error('Failed to fetch history:', error);
    
    return generateMockHistory(2);
  }
};
