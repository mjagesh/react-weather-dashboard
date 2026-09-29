import { useWeather } from "../context/WeatherContext";

import "./UnitToggle.css";

const UnitToggle = () => {
  const { unit, setUnit } = useWeather();

  return (
    <div className="unit-toggle">
      <button
        className={unit === "C" ? "active" : ""}
        onClick={() => setUnit("C")}
      >
        °C
      </button>

      <button
        className={unit === "F" ? "active" : ""}
        onClick={() => setUnit("F")}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
