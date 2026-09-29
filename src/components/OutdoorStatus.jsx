import { CheckCircle2, CloudRain, Flame, Wind } from "lucide-react";

import { useWeather } from "../context/WeatherContext";
import { getOutdoorStatus } from "../utils/outdoorStatus";
import { formatTemperature } from "../utils/temperature";

import "./OutdoorStatus.css";

const STATUS_ICONS = {
  "GOOD TO GO": CheckCircle2,
  "NOT IDEAL": CloudRain,
  "TOO HOT": Flame,
  WINDY: Wind,
};

const OutdoorStatus = () => {
  const { weather, loading, unit } = useWeather();

  if (loading || !weather) {
    return null;
  }

  const current = weather.current;

  const rainProbability =
    weather.daily?.precipitation_probability_max?.[0] ?? 0;

  const result = getOutdoorStatus({
    temperature: current.temperature_2m,
    rainProbability,
    windSpeed: current.wind_speed_10m,
  });

  // Get the Lucide icon based on the current status
  const StatusIcon = STATUS_ICONS[result.status] || CheckCircle2;

  return (
    <section className="outdoor-section">
      <div className="section-heading">
        <span>ACTIVITY</span>

        <h2>Should I Go Outside?</h2>
      </div>

      <div className="outdoor-card">
        <div className="outdoor-status">
          <span className="outdoor-icon">
            <StatusIcon size={22} strokeWidth={1.7} aria-hidden="true" />
          </span>

          <strong>{result.status}</strong>
        </div>

        <p className="outdoor-message">{result.message}</p>

        <div className="outdoor-stats">
          <span>
            Temperature
            <strong>{formatTemperature(current.temperature_2m, unit)}</strong>
          </span>

          <span>
            Rain
            <strong>{rainProbability}%</strong>
          </span>

          <span>
            Wind
            <strong>{Math.round(current.wind_speed_10m)} km/h</strong>
          </span>
        </div>
      </div>
    </section>
  );
};

export default OutdoorStatus;
