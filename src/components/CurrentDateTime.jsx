import { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { getLocationSubtitle } from "../utils/location";
import "./CurrentDateTime.css";

const CurrentDateTime = () => {
  const { weather, location } = useWeather();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!weather) {
    return null;
  }

  const timezone = weather.timezone;

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    timeZone: timezone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(currentTime);

  const formattedTime = new Intl.DateTimeFormat("en-IN", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(currentTime);

  return (
    <div className="current-date-time">
      <div className="current-location">
        <strong>{location.name}</strong>

        <span>{getLocationSubtitle(location)}</span>
      </div>

      <span>
        {formattedDate} · {formattedTime}
      </span>
    </div>
  );
};

export default CurrentDateTime;
