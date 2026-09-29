import "./App.css";

import WeatherCard from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import LocationSearch from "./components/LocationSearch";
import UnitToggle from "./components/UnitToggle";
import WeatherInsights from "./components/WeatherInsights";
import OutdoorStatus from "./components/OutdoorStatus";
import CurrentDateTime from "./components/CurrentDateTime";

const App = () => {
  return (
    <main className="app">
      <header className="app-header">
        <div className="app-label">WEATHER DASHBOARD</div>

        <h1>
          Weather, <span>simplified.</span>
        </h1>

        <p className="app-description">
          Real-time weather conditions, forecasts and insights for your
          location.
        </p>

        <CurrentDateTime />

        <div className="header-controls">
          <LocationSearch />
          <UnitToggle />
        </div>
      </header>

      <WeatherCard />

      <HourlyForecast />

      <DailyForecast />

      <WeatherInsights />

      <OutdoorStatus />

      <footer className="app-footer">
        <span>Weather data powered by Open-Meteo</span>
        <p>© 2026 Jagesh Madhaiyan · Weather Dashboard</p>

        <span>Built with React</span>
      </footer>
    </main>
  );
};

export default App;
