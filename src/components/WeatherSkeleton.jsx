import "./WeatherSkeleton.css";

const WeatherSkeleton = () => {
  return (
    <div className="weather-skeleton">
      <div className="skeleton skeleton-small" />

      <div className="skeleton skeleton-title" />

      <div className="skeleton skeleton-icon" />

      <div className="skeleton skeleton-temperature" />

      <div className="skeleton skeleton-description" />

      <div className="skeleton-details">
        <div className="skeleton-detail">
          <div className="skeleton skeleton-detail-label" />
          <div className="skeleton skeleton-detail-value" />
        </div>

        <div className="skeleton-detail">
          <div className="skeleton skeleton-detail-label" />
          <div className="skeleton skeleton-detail-value" />
        </div>

        <div className="skeleton-detail">
          <div className="skeleton skeleton-detail-label" />
          <div className="skeleton skeleton-detail-value" />
        </div>
      </div>
    </div>
  );
};

export default WeatherSkeleton;
