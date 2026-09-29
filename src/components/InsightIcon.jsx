import { CloudRain, Droplets, Thermometer, Wind } from "lucide-react";

const ICONS = {
  Temperature: Thermometer,
  Rain: CloudRain,
  Wind: Wind,
  Humidity: Droplets,
};

const InsightIcon = ({ type }) => {
  const Icon = ICONS[type] || Thermometer;

  return <Icon size={20} strokeWidth={1.5} aria-hidden="true" />;
};

export default InsightIcon;
