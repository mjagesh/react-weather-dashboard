import { useWeather } from "../context/WeatherContext";
import InsightIcon from "./InsightIcon";

import {
  getTemperatureInsight,
  getRainInsight,
  getWindInsight,
  getHumidityInsight,
} from "../utils/weatherInsights";

import "./WeatherInsights.css";

const WeatherInsights = () => {
  const { weather, loading, unit } = useWeather();

  if (loading || !weather) {
    return null;
  }

  const current = weather.current;

  const rainProbability =
    weather.daily?.precipitation_probability_max?.[0] ?? 0;

  const insights = [
    {
      title: "Temperature",
      text: getTemperatureInsight(
        current.temperature_2m,
        current.apparent_temperature,
        unit,
      ),
    },
    {
      title: "Rain",
      text: getRainInsight(rainProbability),
    },
    {
      title: "Wind",
      text: getWindInsight(current.wind_speed_10m),
    },
    {
      title: "Humidity",
      text: getHumidityInsight(current.relative_humidity_2m),
    },
  ];

  return (
    <section className="insights-section">
      <div className="section-heading">
        <span>WEATHER ANALYSIS</span>

        <h2>Today's Insights</h2>
      </div>

      <div className="insights-grid">
        {insights.map((insight) => (
          <div className="insight-card" key={insight.title}>
            <div className="insight-icon">
              <InsightIcon type={insight.title} />
            </div>

            <div className="insight-content">
              <h3>{insight.title}</h3>
              <p>{insight.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeatherInsights;
