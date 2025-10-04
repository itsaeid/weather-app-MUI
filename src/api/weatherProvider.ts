import axios from "axios";
import {
  geocodeOpenMeteo,
  fetchOpenMeteoForecast,
} from "./openMeteo";

/** پیش‌بینی/وضعیت فعلی شهر با Open-Meteo (۱۴ روزه) */
export async function getWeatherByCityOpenMeteo(
  city: string,
  lang: string = "en",
) {
  const geo = await geocodeOpenMeteo(city, lang);
  const data = await fetchOpenMeteoForecast(
    geo.latitude,
    geo.longitude,
    geo.timezone,
    lang,
  );
  return { provider: "open-meteo", city: geo.name, data };
}

/** دادهٔ روزانهٔ تاریخی برای بازهٔ [start,end] (YYYY-MM-DD) */
export async function getHistoryDailyByCityOpenMeteo(
  city: string,
  start: string,
  end: string,
  lang: string = "en",
) {
  // از همان geocode استفاده کن تا کد تکراری نشه
  const geo = await geocodeOpenMeteo(city, lang);

  const { data } = await axios.get(
    "https://archive-api.open-meteo.com/v1/archive",
    {
      params: {
        latitude: geo.latitude,
        longitude: geo.longitude,
        start_date: start,
        end_date: end,
        daily: "temperature_2m_max",
        timezone: "auto",
        language: lang,
      },
    },
  );

  const daily =
    data?.daily?.time?.map((t: string, i: number) => ({
      date: t,
      tempMax: data.daily.temperature_2m_max[i] as number,
    })) ?? [];

  return { daily } as { daily: Array<{ date: string; tempMax: number }> };
}
