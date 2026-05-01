

import {
  AreaChart,
  BarChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getAQIInfo } from '../utils/aqiUtils';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload[0]) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
        <p className="font-body text-sm font-medium text-gray-900 dark:text-white">
          {new Date(data.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className="font-body text-xs"
            style={{ color: entry.color }}
          >
            {entry.name}: {parseFloat(entry.value).toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const Chart = ({ history }) => {
  
  const sampledData = history.filter((_, index) => index % 2 === 0);

  
  const chartData = sampledData.map((item) => ({
    ...item,
    timeLabel: new Date(item.time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));

  if (!chartData || chartData.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-8 animate-fade-in">
      {}
      <div className="rounded-3xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 backdrop-blur-sm">
        <h3 className="font-display font-bold text-lg mb-4 text-gray-900 dark:text-white">
          24-Hour AQI Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
            />
            <XAxis
              dataKey="timeLabel"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              className="dark:stroke-gray-600"
            />
            <YAxis
              domain={[0, 5]}
              label={{ value: 'AQI Level', angle: -90, position: 'insideLeft' }}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              className="dark:stroke-gray-600"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="aqi"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#aqiGradient)"
              isAnimationActive={true}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>

        {}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="font-body text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
            AQI Scale Reference
          </p>
          <div className="h-8 rounded-lg overflow-hidden flex">
            <div className="flex-1 bg-green-500 hover:bg-green-600 transition-colors cursor-help" title="Good (1)"></div>
            <div className="flex-1 bg-green-300 hover:bg-green-400 transition-colors cursor-help" title="Fair (2)"></div>
            <div className="flex-1 bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-help" title="Moderate (3)"></div>
            <div className="flex-1 bg-orange-500 hover:bg-orange-600 transition-colors cursor-help" title="Poor (4)"></div>
            <div className="flex-1 bg-red-500 hover:bg-red-600 transition-colors cursor-help" title="Very Poor (5)"></div>
          </div>
          <div className="mt-2 flex text-xs font-body text-gray-600 dark:text-gray-400">
            <div className="flex-1 text-center">Good</div>
            <div className="flex-1 text-center">Fair</div>
            <div className="flex-1 text-center">Moderate</div>
            <div className="flex-1 text-center">Poor</div>
            <div className="flex-1 text-center">Very Poor</div>
          </div>
        </div>
      </div>

      {}
      <div className="rounded-3xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 backdrop-blur-sm">
        <h3 className="font-display font-bold text-lg mb-4 text-gray-900 dark:text-white">
          PM2.5 & PM10 Levels
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
            />
            <XAxis
              dataKey="timeLabel"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              className="dark:stroke-gray-600"
            />
            <YAxis
              label={{ value: 'Concentration (μg/m³)', angle: -90, position: 'insideLeft' }}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              className="dark:stroke-gray-600"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="pm25"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              name="PM2.5"
              isAnimationActive={true}
              animationDuration={800}
            />
            <Bar
              dataKey="pm10"
              fill="#f59e0b"
              radius={[8, 8, 0, 0]}
              name="PM10"
              isAnimationActive={true}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
