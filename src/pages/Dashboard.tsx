// src/pages/Dashboard.tsx
import { useMemo, useState } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Header from "../components/header/Header";
import WeatherSummaryCard from "../components/weather/WeatherSummaryCard";
import TemperatureChartCard from "../components/weather/TemperatureChartCard";
import ForecastCarousel from "../components/weather/ForecastCarousel";
import Footer from "../components/layout/Footer";
import { normalizeWeather } from "../api/normalizeWeather";
import i18n from "../translate";
import { useCityWeather, useCityWeatherYearly } from "../Queries/queries";
import { useMonthlySeries } from "../hooks/useMonthlySeries";

export default function Dashboard() {
  const [city, setCity] = useState("Tehran");

  const cityQuery = useCityWeather(city);
  const normalized = useMemo(
    () => normalizeWeather(cityQuery.data),
    [cityQuery.data]
  );

  const yearQuery = useCityWeatherYearly(city);
  const chartData = useMonthlySeries(yearQuery.data, i18n.language);

  return (
    <>
      {/* header  */}
      <Header
        city={city}
        onCityChange={setCity}
        onRefresh={() => cityQuery.refetch()}
      />
      {/* body  */}
      <Container maxWidth="xl">
        <Grid container spacing={3} alignItems="stretch">
          <Grid xs={12} md={6}>
            <WeatherSummaryCard
              city={normalized?.city || city}
              current={normalized?.current}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TemperatureChartCard data={chartData} />
          </Grid>
        </Grid>
        <ForecastCarousel days={normalized?.daily || []} />
        {/* footer  */}
        <Footer logoSrc="" email="info@nadin.ir" />
      </Container>
    </>
  );
}
