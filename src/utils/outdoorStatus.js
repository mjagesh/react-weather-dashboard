export const getOutdoorStatus = ({
  temperature,
  rainProbability,
  windSpeed,
}) => {
  if (rainProbability >= 70) {
    return {
      status: "NOT IDEAL",
      icon: "🌧️",
      message: "High chance of rain. Consider postponing outdoor activities.",
    };
  }

  if (temperature >= 38) {
    return {
      status: "TOO HOT",
      icon: "🥵",
      message:
        "Temperatures are high. Stay hydrated and avoid prolonged outdoor exposure.",
    };
  }

  if (windSpeed >= 30) {
    return {
      status: "WINDY",
      icon: "💨",
      message:
        "Strong winds are expected. Outdoor activities may be uncomfortable.",
    };
  }

  return {
    status: "GOOD TO GO",
    icon: "🟢",
    message: "Current conditions look suitable for outdoor activities.",
  };
};
