

export const AQI_LEVELS = {
  1: { label: 'Good', color: '#22c55e', bgColor: 'bg-green-500', darkBg: 'dark:bg-green-900', textColor: 'text-green-900', darkText: 'dark:text-green-100' },
  2: { label: 'Fair', color: '#86efac', bgColor: 'bg-green-300', darkBg: 'dark:bg-green-800', textColor: 'text-green-900', darkText: 'dark:text-green-100' },
  3: { label: 'Moderate', color: '#eab308', bgColor: 'bg-yellow-400', darkBg: 'dark:bg-yellow-900', textColor: 'text-yellow-900', darkText: 'dark:text-yellow-100' },
  4: { label: 'Poor', color: '#f97316', bgColor: 'bg-orange-500', darkBg: 'dark:bg-orange-900', textColor: 'text-orange-900', darkText: 'dark:text-orange-100' },
  5: { label: 'Very Poor', color: '#ef4444', bgColor: 'bg-red-500', darkBg: 'dark:bg-red-900', textColor: 'text-red-900', darkText: 'dark:text-red-100' },
};


export const getAQIInfo = (aqi) => {
  const aqiNum = Math.min(Math.max(aqi, 1), 5);
  const levelInfo = AQI_LEVELS[aqiNum];

  const advice = {
    1: 'Air quality is satisfactory. Enjoy outdoor activities!',
    2: 'Air quality is acceptable. Most people can enjoy outdoor activities.',
    3: 'Members of sensitive groups may experience health effects. Consider limiting prolonged outdoor exertion.',
    4: 'Everyone may begin to experience health effects. Reduce prolonged outdoor exertion.',
    5: 'Health alert: The risk of health effects is increased for everyone. Avoid outdoor activities.',
  };

  return {
    level: aqiNum,
    ...levelInfo,
    advice: advice[aqiNum],
  };
};


export const getPollutantLabel = (pollutant) => {
  const labels = {
    CO: 'Carbon Monoxide (μg/m³)',
    NO: 'Nitrogen Monoxide (μg/m³)',
    NO2: 'Nitrogen Dioxide (μg/m³)',
    O3: 'Ozone (μg/m³)',
    SO2: 'Sulfur Dioxide (μg/m³)',
    PM2_5: 'PM2.5 (μg/m³)',
    PM10: 'PM10 (μg/m³)',
    NH3: 'Ammonia (μg/m³)',
  };
  return labels[pollutant] || pollutant;
};


export const formatPollutant = (value, pollutant) => {
  if (value === null || value === undefined) return 'N/A';
  return parseFloat(value).toFixed(2);
};


export const getTopPollutants = (components) => {
  if (!components) return [];
  
  const pollutants = [
    { key: 'PM2_5', label: 'PM2.5', value: components.pm2_5 },
    { key: 'PM10', label: 'PM10', value: components.pm10 },
    { key: 'O3', label: 'O3', value: components.o3 },
    { key: 'NO2', label: 'NO2', value: components.no2 },
  ];
  
  return pollutants.filter(p => p.value !== null && p.value !== undefined);
};
