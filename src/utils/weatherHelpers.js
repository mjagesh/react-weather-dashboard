export const formatHour = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    hour12: true,
  });
};

export const formatDay = (dateString, index) => {
  if (index === 0) {
    return "Today";
  }

  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-IN", {
    weekday: "long",
  });
};
