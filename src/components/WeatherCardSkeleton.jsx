import Skeleton from "./Skeleton";

const WeatherCardSkeleton = () => {
  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <Skeleton width="140px" height="20px" />
      </div>

      <div className="weather-main">
        <div>
          <Skeleton width="120px" height="56px" />
          <Skeleton width="100px" height="20px" />
        </div>

        <Skeleton width="72px" height="72px" borderRadius="50%" />
      </div>

      <div className="weather-details">
        <Skeleton width="130px" height="18px" />
        <Skeleton width="130px" height="18px" />
      </div>

      <div className="weather-stats">
        <Skeleton width="80px" height="18px" />
        <Skeleton width="80px" height="18px" />
        <Skeleton width="80px" height="18px" />
        <Skeleton width="80px" height="18px" />
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;
