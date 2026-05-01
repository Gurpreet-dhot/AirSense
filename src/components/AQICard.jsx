
import { getAQIInfo, getTopPollutants, formatPollutant } from '../utils/aqiUtils';

export const AQICard = ({ aqi, components, cityName, country }) => {
  const aqiInfo = getAQIInfo(aqi);
  const topPollutants = getTopPollutants(components);

  
  const circumference = 2 * Math.PI * 45; 
  const strokeDashoffset = circumference - (aqi / 5) * circumference;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 animate-slide-up">
      <div className={`rounded-3xl border-2 p-8 transition-all duration-300 backdrop-blur-sm
        ${aqiInfo.bgColor} ${aqiInfo.darkBg} border-opacity-30 dark:border-opacity-30`}
      >
        {}
        <div className="mb-8">
          <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-1">
            {cityName}, {country}
          </h2>
          <p className="font-body text-gray-600 dark:text-gray-300">
            Current Air Quality Assessment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {}
          <div className="flex flex-col items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 120 120" className="mb-4">
              {}
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-300 dark:text-gray-700"
              />
              {}
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={aqiInfo.color} />
                  <stop offset="100%" stopColor={aqiInfo.color} />
                </linearGradient>
              </defs>
              {}
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              {}
              <text
                x="60"
                y="65"
                textAnchor="middle"
                fontSize="36"
                fontWeight="bold"
                fill="currentColor"
                className="text-gray-900 dark:text-white font-display"
              >
                {aqi}
              </text>
              <text
                x="60"
                y="85"
                textAnchor="middle"
                fontSize="12"
                fill="currentColor"
                className="text-gray-600 dark:text-gray-400"
              >
                / 5
              </text>
            </svg>
          </div>

          {}
          <div className="flex flex-col justify-center">
            {}
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full font-display font-bold text-lg
                ${aqiInfo.textColor} ${aqiInfo.bgColor}`}>
                {aqiInfo.label}
              </span>
            </div>

            {}
            <div className="mb-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-white/20 dark:border-gray-700/20">
              <p className="font-body text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                <strong>Health Advice:</strong> {aqiInfo.advice}
              </p>
            </div>

            {}
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3">
                Top Pollutants
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {topPollutants.slice(0, 4).map((pollutant) => (
                  <div
                    key={pollutant.key}
                    className="p-3 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-white/30 dark:border-gray-700/30"
                  >
                    <p className="font-display font-bold text-lg text-gray-900 dark:text-white">
                      {formatPollutant(pollutant.value, pollutant.key)}
                    </p>
                    <p className="font-body text-xs text-gray-600 dark:text-gray-400">
                      {pollutant.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="mt-8 pt-6 border-t border-white/20 dark:border-gray-700/20">
          <p className="font-body text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
            AQI Scale
          </p>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((level) => {
              const info = getAQIInfo(level);
              return (
                <div
                  key={level}
                  className={`flex-1 min-w-max px-3 py-2 rounded-lg text-center transition-all
                    ${level === aqi ? 'ring-2 ring-offset-2 dark:ring-offset-gray-900' : 'opacity-60'}`}
                  style={{
                    backgroundColor: info.color + '20',
                    borderLeft: `3px solid ${info.color}`,
                  }}
                >
                  <span className="font-display font-bold text-xs text-gray-900 dark:text-white">
                    {level}
                  </span>
                  <span className="font-body text-xs text-gray-600 dark:text-gray-300 ml-1">
                    {info.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQICard;
