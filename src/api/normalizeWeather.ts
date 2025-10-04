import i18n from "../translate";

type WeatherKind = "sunny" | "cloudy" | "rainy" | "snowy" | "stormy";

function mapWeatherCodeToKind(code?: number): WeatherKind {
  if (code == null) return "sunny";
  if (code === 0 || code === 1) return "sunny";
  if ([2, 3, 45, 48].includes(code)) return "cloudy";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return "rainy";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snowy";
  if ([95, 96, 99].includes(code)) return "stormy";
  return "cloudy";
}

function mapKindToText(kind: WeatherKind, lang: string): string {
  const fa: Record<WeatherKind, string> = {
    sunny: "آفتابی",
    cloudy: "ابری",
    rainy: "بارانی",
    snowy: "برفی",
    stormy: "طوفانی",
  };
  const en: Record<WeatherKind, string> = {
    sunny: "Sunny",
    cloudy: "Cloudy",
    rainy: "Rainy",
    snowy: "Snowy",
    stormy: "Stormy",
  };
  return lang === "fa" ? fa[kind] : en[kind];
}

export function normalizeWeather(providerResult: any) {
  if (!providerResult) return null;

  if (providerResult.provider === "open-meteo") {
    const d = providerResult.data;

    const todayIdx = 0;
    const todayMax = d?.daily?.temperature_2m_max?.[todayIdx];
    const todayMin = d?.daily?.temperature_2m_min?.[todayIdx];

    const currCode: number | undefined = d.current_weather?.weathercode;
    const currKind = mapWeatherCodeToKind(currCode);
    const desc = mapKindToText(currKind, i18n.language);

    const daily =
      d?.daily?.time?.map((t: string, i: number) => {
        const code = d.daily.weathercode?.[i] as number | undefined;
        const kind = mapWeatherCodeToKind(code);
        return {
          date: t,
          tempMax: d.daily.temperature_2m_max?.[i],
          tempMin: d.daily.temperature_2m_min?.[i],
          weathercode: code,
          kind,
          description: mapKindToText(kind, i18n.language),
        };
      }) || [];

    return {
      provider: "open-meteo",
      city: providerResult.city,
      current: {
        temp: d.current_weather?.temperature,
        windspeed: d.current_weather?.windspeed,
        weathercode: currCode,
        kind: currKind,
        description: desc,           
        tempMax: todayMax,                  
        tempMin: todayMin,                  
      },
      daily,
    };
  }

  return null;
}
