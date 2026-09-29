import { memo } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  CloudLightning,
} from "lucide-react";

const ICONS = {
  sun: Sun,
  "partly-cloudy": CloudSun,
  cloud: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  storm: CloudLightning,
};

const WeatherIcon = ({ type, size = 32, strokeWidth = 1.5 }) => {
  const Icon = ICONS[type] || Cloud;

  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
};

export default memo(WeatherIcon);
