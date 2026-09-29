import { useWeather } from "../context/WeatherContext";
import { getWeatherInfo } from "../utils/weatherCodes";
import { formatDay } from "../utils/weatherHelpers";
import { formatTemperature } from "../utils/temperature";
import ForecastSkeleton from "./ForecastSkeleton";
import WeatherIcon from "./WeatherIcon";
import "./DailyForecast.css";

const DailyForecast = () => {
  const { weather, loading, unit } = useWeather();

  if (loading) {
    return <ForecastSkeleton type="daily" />;
  }

  if (!weather?.daily) {
    return null;
  }

  const {
    time,
    weather_code,
    temperature_2m_max,
    temperature_2m_min,
    precipitation_probability_max,
  } = weather.daily;

  return (
    <section className="daily-section">
      <div className="section-heading">
        <span>7-DAY FORECAST</span>
        <h2>This Week</h2>
      </div>

      <div className="daily-list">
        {time.map((date, index) => {
          const weatherInfo = getWeatherInfo(weather_code[index]);

          return (
            <div
              className={`daily-card ${index === 0 ? "today" : ""}`}
              key={date}
            >
              <div className="daily-day">{formatDay(date, index)}</div>

              <div className="daily-condition">
                <span className="daily-icon">
                  <WeatherIcon
                    type={weatherInfo.icon}
                    size={23}
                    strokeWidth={1.5}
                  />
                </span>

                <span>{weatherInfo.description}</span>
              </div>

              <div className="daily-rain">
                💧 {precipitation_probability_max[index] ?? 0}%
              </div>

              <div className="daily-temperature">
                <strong>
                  {formatTemperature(temperature_2m_max[index], unit)}
                </strong>

                <span>
                  {formatTemperature(temperature_2m_min[index], unit)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DailyForecast;
