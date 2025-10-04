import * as React from "react";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import ThunderstormRoundedIcon from "@mui/icons-material/ThunderstormRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import GrainRoundedIcon from "@mui/icons-material/GrainRounded";

export type WeatherKind = "sunny" | "cloudy" | "rainy" | "snowy" | "stormy";


export const WEATHER_KIND: Record<
  WeatherKind,
  { src?: string; icon: React.ReactNode; label: string }
> = {
  sunny:   { src: "/img/sunny.png", icon: <WbSunnyRoundedIcon fontSize="inherit" />, label: "Sunny" },
  rainy:   { src: "/img/rainy.png", icon: <GrainRoundedIcon fontSize="inherit" />, label: "Rainy" },
  cloudy:  { src: "/img/cloudy.png", icon: <CloudRoundedIcon fontSize="inherit" />, label: "Cloudy" },
  snowy:   { src: "/img/snowy.png", icon: <AcUnitRoundedIcon fontSize="inherit" />, label: "Snowy" },
  stormy:  { src: "/img/storm.png", icon: <ThunderstormRoundedIcon fontSize="inherit" />, label: "Stormy" },
};

export function getWeatherKind(kind?: WeatherKind) {
  if (!kind) return WEATHER_KIND.sunny;
  return WEATHER_KIND[kind] ?? WEATHER_KIND.sunny;
}
