export const getLocationSubtitle = (location) => {
  return [location.admin1, location.country].filter(Boolean).join(", ");
};
