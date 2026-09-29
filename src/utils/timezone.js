export const getCurrentHourInTimezone = (timezone) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    hour12: false,
  });

  return Number(formatter.format(new Date()));
};

export const getHourInTimezone = (date, timezone) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    hour12: false,
  });

  return Number(formatter.format(new Date(date)));
};
