import Skeleton from "./Skeleton";
import "./ForecastSkeleton.css";

const ForecastSkeleton = ({ type = "hourly" }) => {
  const isHourly = type === "hourly";

  return (
    <section className={`forecast-skeleton ${type}-skeleton`}>
      <div className="section-heading">
        <Skeleton width="120px" height="14px" />
        <Skeleton width="150px" height="28px" />
      </div>

      <div className="forecast-skeleton-list">
        {Array.from({
          length: isHourly ? 8 : 7,
        }).map((_, index) => (
          <div className="forecast-skeleton-card" key={index}>
            <Skeleton width={isHourly ? "45px" : "60px"} height="16px" />

            <Skeleton width="30px" height="30px" borderRadius="50%" />

            <Skeleton width="55px" height="18px" />

            <Skeleton width="45px" height="14px" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ForecastSkeleton;
