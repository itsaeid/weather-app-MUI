import { useQuery } from "@tanstack/react-query";
import { getHistoryDailyByCityOpenMeteo, getWeatherByCityOpenMeteo } from "../api/weatherProvider";
import i18n from "../translate";

export function useCityWeather(city?: string) {
  return useQuery({
    queryKey: ["weather", city, i18n.language],
    queryFn: () => getWeatherByCityOpenMeteo(city!, i18n.language),
    enabled: !!city,
    staleTime: 1000 * 60 * 10,
  });
}

export function useCityWeatherYearly(city?: string) {
  return useQuery({
    queryKey: ["weather-yearly", city],
    enabled: !!city,
    staleTime: 1000 * 60 * 60 * 6, // 6 ساعت
    queryFn: async () => {
      const end = new Date();
      const start = new Date(end.getFullYear(), end.getMonth() - 11, 1);
      const startStr = start.toISOString().slice(0, 10);
      const endStr = end.toISOString().slice(0, 10);
      const { daily } = await getHistoryDailyByCityOpenMeteo(city!, startStr, endStr);
      return daily as Array<{ date: string; tempMax: number }>;
    },
  });
}
