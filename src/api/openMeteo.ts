import axios from "axios";

// ---------------- Types ----------------
export interface GeocodeResult {
  latitude: number;
  longitude: number;
  timezone: string;
  name: string;
  country_code?: string;
}

export interface ForecastData {
  timezone?: string;
  current_weather?: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}

// ---------------- API helpers ----------------

/** جستجوی مختصات شهر در Open-Meteo Geocoding */
export async function geocodeOpenMeteo(
  city: string,
  lang: string = "en",
): Promise<GeocodeResult> {
  const { data } = await axios.get(
    "https://geocoding-api.open-meteo.com/v1/search",
    {
      params: { name: city, count: 1, language: lang },
    },
  );

  const r = data?.results?.[0];
  if (!r) throw new Error("City not found");

  return {
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone ?? "auto",
    name: r.name,
    country_code: r.country_code,
  };
}

/** دریافت پیش‌بینی (۱۴ روزه) برای مختصات داده‌شده */
export async function fetchOpenMeteoForecast(
  latitude: number,
  longitude: number,
  timezone: string,
  lang: string = "en",
): Promise<ForecastData> {
  const { data } = await axios.get(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude,
        longitude,
        current_weather: true,
        daily: "weathercode,temperature_2m_max,temperature_2m_min",
        forecast_days: 14,    // 🔑 دو هفته کامل
        timezone: timezone || "auto",
        language: lang,
      },
    },
  );

  return data as ForecastData;
}
