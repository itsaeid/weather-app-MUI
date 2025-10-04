// src/components/weather/ForecastCarousel.tsx
import { Paper, Box, Typography, Stack, useTheme } from "@mui/material";
import i18n from "../../translate";
import { getWeatherKind, type WeatherKind } from "./weatherKind";

type Day = {
  date: string;
  tempMax?: number;
  kind?: WeatherKind;
  iconSrc?: string;        // اگر برای همان روز تصویر سفارشی داری
  description?: string;
};

export default function ForecastCarousel({
  days,
  title = i18n.language === "fa" ? "پیش‌بینی دو هفته‌ای" : "2 weeks Forecast",
}: {
  days: Day[];
  title?: string;
}) {
  const theme = useTheme();
  const dir = i18n.dir();

  const wrapBg =
    theme.palette.mode === "light"
      ? "#E1E9EE"
      : "#292F45";

  const cardBg =
    theme.palette.mode === "light"
      ? "#CDD9E0"
      : "#3F4861";

  const isToday = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  return (
    <Paper sx={{ borderRadius: 3, p: 3, mt: 3, boxShadow: 1, background: wrapBg }}>
      <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
        {title}
      </Typography>

      <Box
        sx={{
          direction: dir as any,
          display: "flex",
          gap: 2,
          overflowX: "auto",
          py: 1,
          scrollSnapType: "x proximity",
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.2)",
            borderRadius: 8,
          },
        }}
      >
        {days.map((d, idx) => {
          const art = getWeatherKind(d.kind);
          const src = d.iconSrc || art.src;
          const titleDay =
            idx === 0 && isToday(d.date)
              ? i18n.language === "fa"
                ? "امروز"
                : "Today"
              : new Date(d.date).toLocaleDateString(i18n.language, {
                  weekday: "short",
                });

        return (
          <Paper
            key={`${d.date}-${idx}`}
            sx={{
              minWidth: 120,
              px: 2,
              py: 2,
              textAlign: "center",
              borderRadius: 4,
              background: cardBg,
              boxShadow:
                theme.palette.mode === "light"
                  ? "0 10px 30px rgba(0,0,0,.10)"
                  : "0 10px 30px rgba(0,0,0,.35)",
              scrollSnapAlign: "start",
            }}
          >
            {/* نام روز + خط نازک */}
            <Stack spacing={0.75} alignItems="center">
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary" }}>
                {titleDay}
              </Typography>
              <Box
                sx={{
                  width: "70%",
                  height: 2,
                  borderRadius: 1,
                  bgcolor:
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,.2)"
                      : "rgba(255,255,255,.25)",
                }}
              />
            </Stack>

            {/* آیکن/تصویر */}
            <Box
              sx={{
                mt: 1.25,
                mb: 0.75,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 72,
              }}
            >
              {src ? (
                <Box
                  component="img"
                  src={src}
                  alt={d.description || String(art.label)}
                  sx={{
                    width: 56,
                    height: "auto",
                    filter:
                      theme.palette.mode === "dark"
                        ? "drop-shadow(0 12px 20px rgba(0,0,0,.45))"
                        : "drop-shadow(0 10px 16px rgba(0,0,0,.18))",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    fontSize: 44,
                    lineHeight: 1,
                    color: "text.primary",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label={d.description || String(art.label)}
                >
                  {art.icon}
                </Box>
              )}
            </Box>

            {/* دمای بزرگ پایین کارت */}
            <Typography
              sx={{ mt: 0.5, fontWeight: 700, color: "text.primary" }}
            >
              {d.tempMax != null ? `${Math.round(d.tempMax)}°C` : "—"}
            </Typography>
          </Paper>
        );})}
      </Box>
    </Paper>
  );
}
