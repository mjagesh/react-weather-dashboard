const weatherCache = new Map();

const CACHE_DURATION = 5 * 60 * 1000;

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

export const getWeather = async (latitude, longitude, signal) => {
  const cacheKey = `${latitude},${longitude}`;

  const cached = weatherCache.get(cacheKey);

  if (cached) {
    const isFresh = Date.now() - cached.timestamp < CACHE_DURATION;

    if (isFresh) {
      return cached.data;
    }

    weatherCache.delete(cacheKey);
  }

  const url =
    `${BASE_URL}?` +
    `latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
    `&hourly=temperature_2m,weather_code,precipitation_probability` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=auto`;

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();

  if (!data?.current || !data?.daily || !data?.hourly) {
    throw new Error("Weather data is unavailable");
  }

  weatherCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
};

export const searchLocations = async (query, signal) => {
  const url =
    `${GEOCODING_URL}?name=${encodeURIComponent(query)}` +
    `&count=5&language=en&format=json`;

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to search locations");
  }

  const data = await response.json();

  return data.results || [];
};
