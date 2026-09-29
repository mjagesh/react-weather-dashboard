export const convertTemperature = (temperature, unit) => {
  if (unit === "F") {
    return (temperature * 9) / 5 + 32;
  }

  return temperature;
};

export const formatTemperature = (temperature, unit) => {
  const converted = convertTemperature(temperature, unit);

  return `${Math.round(converted)}°`;
};
