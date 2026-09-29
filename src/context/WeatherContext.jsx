import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getWeather } from "../services/weatherApi";
import { DEFAULT_LOCATION } from "../utils/constants";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    try {
      const savedLocation = localStorage.getItem("weather-location");

      return savedLocation ? JSON.parse(savedLocation) : DEFAULT_LOCATION;
    } catch {
      return DEFAULT_LOCATION;
    }
  });

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C");

  const fetchWeather = useCallback(
    async (signal) => {
      try {
        setLoading(true);
        setError(null);

        const data = await getWeather(
          location.latitude,
          location.longitude,
          signal,
        );

        setWeather(data);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error(error);

        setError("Unable to fetch weather data. Please try again.");
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [location.latitude, location.longitude],
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchWeather(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchWeather]);

  useEffect(() => {
    localStorage.setItem("weather-location", JSON.stringify(location));
  }, [location]);

  const changeLocation = useCallback((newLocation) => {
    setLocation(newLocation);
  }, []);

  const contextValue = useMemo(
    () => ({
      location,
      weather,
      loading,
      error,
      unit,
      setUnit,
      changeLocation,
      refreshWeather: fetchWeather,
    }),
    [location, weather, loading, error, unit, changeLocation, fetchWeather],
  );

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
