import { useWeather } from "../context/WeatherContext";
import { getWeatherInfo } from "../utils/weatherCodes";
import { formatTemperature } from "../utils/temperature";
import { getLocationSubtitle } from "../utils/location";
import WeatherIcon from "./WeatherIcon";
import WeatherSkeleton from "./WeatherSkeleton";
import "./WeatherCard.css";

const WeatherCard = () => {
  const { weather, location, loading, error, unit, refreshWeather } =
    useWeather();

  if (loading) {
    return <WeatherSkeleton />;
  }

  if (error) {
    return (
      <section className="weather-card weather-error-card">
        <div className="error-icon">⚠️</div>

        <h2>Weather unavailable</h2>

        <p className="weather-error">{error}</p>

        <button className="retry-button" onClick={refreshWeather}>
          Try Again
        </button>
      </section>
    );
  }

  if (!weather) {
    return null;
  }

  const current = weather.current;

  const updatedTime = new Intl.DateTimeFormat("en-IN", {
    timeZone: weather.timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

  const weatherInfo = getWeatherInfo(current.weather_code);

  return (
    <section className="weather-card">
      <div className="weather-location">
        <span>CURRENT WEATHER</span>

        <h2>{location.name}</h2>

        <p>{getLocationSubtitle(location)}</p>
      </div>

      <div className="weather-main">
        <div className="weather-icon">
          <WeatherIcon type={weatherInfo.icon} size={72} strokeWidth={1.4} />
        </div>

        <div className="weather-temperature">
          {formatTemperature(current.temperature_2m, unit)}
        </div>

        <p className="weather-description">{weatherInfo.description}</p>

        <p className="weather-feels">
          Feels like {formatTemperature(current.apparent_temperature, unit)}
        </p>
      </div>

      <div className="weather-details">
        <div>
          <span>HUMIDITY</span>
          <strong>{current.relative_humidity_2m}%</strong>
        </div>

        <div>
          <span>WIND</span>
          <strong>{Math.round(current.wind_speed_10m)} km/h</strong>
        </div>

        <div>
          <span>TIMEZONE</span>
          <strong>{weather.timezone_abbreviation}</strong>
        </div>
      </div>

      <div className="weather-meta">
        <span>Updated {updatedTime}</span>

        <span>{weather.timezone_abbreviation}</span>
      </div>
    </section>
  );
};

export default WeatherCard;
