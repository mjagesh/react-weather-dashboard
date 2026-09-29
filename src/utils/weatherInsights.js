export const getTemperatureInsight = (
  temperature,
  apparentTemperature,
  unit,
) => {
  let difference = apparentTemperature - temperature;

  if (unit === "F") {
    difference = (difference * 9) / 5;
  }

  const absoluteDifference = Math.abs(difference);

  if (absoluteDifference < 2) {
    return "Feels very close to the actual temperature.";
  }

  const roundedDifference = Math.round(absoluteDifference);

  if (difference > 0) {
    return `Feels ${roundedDifference}° warmer than the actual temperature.`;
  }

  return `Feels ${roundedDifference}° cooler than the actual temperature.`;
};

export const getRainInsight = (precipitationProbability) => {
  if (precipitationProbability >= 70) {
    return "High chance of rain today.";
  }

  if (precipitationProbability >= 40) {
    return "There is a moderate chance of rain today.";
  }

  if (precipitationProbability >= 20) {
    return "There is a small chance of rain today.";
  }

  return "Rain is unlikely today.";
};

export const getWindInsight = (windSpeed) => {
  if (windSpeed >= 30) {
    return "Strong winds are expected.";
  }

  if (windSpeed >= 20) {
    return "Moderate to strong winds are expected.";
  }

  if (windSpeed >= 10) {
    return "Moderate winds are expected.";
  }

  return "Light winds are expected.";
};

export const getHumidityInsight = (humidity) => {
  if (humidity >= 80) {
    return "Humidity is very high.";
  }

  if (humidity >= 60) {
    return "Humidity is relatively high.";
  }

  if (humidity >= 40) {
    return "Humidity is comfortable.";
  }

  return "The air is relatively dry.";
};
