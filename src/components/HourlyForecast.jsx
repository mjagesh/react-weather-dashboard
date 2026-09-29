import { useWeather } from "../context/WeatherContext";
import { getWeatherInfo } from "../utils/weatherCodes";
import { formatHour } from "../utils/weatherHelpers";
import { formatTemperature } from "../utils/temperature";
import { getCurrentHourInTimezone, getHourInTimezone } from "../utils/timezone";
import ForecastSkeleton from "./ForecastSkeleton";
import WeatherIcon from "./WeatherIcon";
import "./HourlyForecast.css";

const HourlyForecast = () => {
  const { weather, loading, unit } = useWeather();

  if (loading) {
    return <ForecastSkeleton type="hourly" />;
  }

  if (!weather?.hourly) {
    return null;
  }

  const { time, temperature_2m, weather_code, precipitation_probability } =
    weather.hourly;

  const currentHour = getCurrentHourInTimezone(weather.timezone);
  const startIndex = time.findIndex((timeString) => {
    const hour = getHourInTimezone(timeString, weather.timezone);

    return hour >= currentHour;
  });

  const safeStartIndex = startIndex === -1 ? 0 : startIndex;

  const hourlyData = time
    .slice(safeStartIndex, safeStartIndex + 8)
    .map((timeString, index) => {
      const originalIndex = safeStartIndex + index;

      return {
        time: timeString,
        temperature: temperature_2m[originalIndex],
        weatherCode: weather_code[originalIndex],
        precipitation: precipitation_probability[originalIndex],
      };
    });

  return (
    <section className="hourly-section">
      <div className="section-heading">
        <span>HOURLY FORECAST</span>
        <h2>Next Hours</h2>
      </div>

      <div className="hourly-list">
        {hourlyData.map((hour, index) => {
          const weatherInfo = getWeatherInfo(hour.weatherCode);

          return (
            <div
              className={`hourly-card ${index === 0 ? "current" : ""}`}
              key={hour.time}
            >
              {index === 0 && <span className="hourly-current">NOW</span>}

              <span className="hourly-time">
                {index === 0 ? "Now" : formatHour(hour.time)}
              </span>

              <span className="hourly-icon">
                <WeatherIcon
                  type={weatherInfo.icon}
                  size={25}
                  strokeWidth={1.5}
                />
              </span>

              <strong className="hourly-temperature">
                {formatTemperature(hour.temperature, unit)}
              </strong>

              <span className="hourly-rain">💧 {hour.precipitation}%</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HourlyForecast;
