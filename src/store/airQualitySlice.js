

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCityWeather,
  fetchAQIHistory,
} from '../services/airQualityService';


export const searchCity = createAsyncThunk(
  'airQuality/searchCity',
  async (cityName, { rejectWithValue }) => {
    try {
      
      const weatherData = await fetchCityWeather(cityName);
      
      
      const history = await fetchAQIHistory(weatherData.lat, weatherData.lon, weatherData.aqi);

      return {
        cityName: weatherData.cityName,
        country: weatherData.country,
        lat: weatherData.lat,
        lon: weatherData.lon,
        aqi: weatherData.aqi,
        components: weatherData.components,
        timestamp: weatherData.timestamp,
        history,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const loadAQIHistory = createAsyncThunk(
  'airQuality/loadAQIHistory',
  async ({ lat, lon, aqi }, { rejectWithValue }) => {
    try {
      const history = await fetchAQIHistory(lat, lon, aqi);
      return history;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  cityName: '',
  country: '',
  lat: null,
  lon: null,
  aqi: null,
  components: null,
  history: [],
  loading: false,
  historyLoading: false,
  error: null,
  historyError: null,
};


const airQualitySlice = createSlice({
  name: 'airQuality',
  initialState,
  reducers: {
    
    clearData: () => initialState,
    
    clearError: (state) => {
      state.error = null;
      state.historyError = null;
    },
  },
  extraReducers: (builder) => {
    
    builder.addCase(searchCity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    
    builder.addCase(searchCity.fulfilled, (state, action) => {
      state.loading = false;
      state.cityName = action.payload.cityName;
      state.country = action.payload.country;
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
      state.aqi = action.payload.aqi;
      state.components = action.payload.components;
      state.history = action.payload.history;
      state.error = null;
    });
    
    builder.addCase(searchCity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    
    builder.addCase(loadAQIHistory.pending, (state) => {
      state.historyLoading = true;
      state.historyError = null;
    });
    
    builder.addCase(loadAQIHistory.fulfilled, (state, action) => {
      state.historyLoading = false;
      state.history = action.payload;
      state.historyError = null;
    });
    
    builder.addCase(loadAQIHistory.rejected, (state, action) => {
      state.historyLoading = false;
      state.historyError = action.payload;
    });
  },
});

export const { clearData, clearError } = airQualitySlice.actions;
export default airQualitySlice.reducer;
