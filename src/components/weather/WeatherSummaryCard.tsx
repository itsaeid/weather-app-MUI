import {
  Paper,
  Box,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import i18n from "../../translate";
import { getWeatherKind, type WeatherKind } from "./weatherKind";
import { ar } from "zod/v4/locales";

type Current = {
  temp?: number;
  feelsLike?: number;
  description?: string;
  tempMax?: number;
  tempMin?: number;
  iconSrc?: string;
  kind?: WeatherKind;
};

export default function WeatherSummaryCard({
  city,
  current,
}: {
  city: string;
  current: Current | undefined;
}) {
  const theme = useTheme();
  const dir = i18n.dir();

  const temp = current?.temp ?? NaN;
  const feels = Math.round(current?.feelsLike ?? current?.temp ?? NaN);
  const tMax = current?.tempMax;
  const tMin = current?.tempMin;
  const desc =
    current?.description ??
    (i18n.language === "fa" ? "—" : "—");

    const art = getWeatherKind(current?.kind);
    const imgSrc = current?.iconSrc || art.src;

  const bg =
    theme.palette.mode === "light"
      ? "#E1E9EE"
      : "linear-gradient(180deg,#292F45 0%, #1C2531 100%)";

  return (
    <Paper
      sx={{
        p: { xs: 2.5, md: 4 },
        borderRadius: 5,
        height: "100%",
        width: "47vw",
        display: "flex",
        alignItems: "center",
        background: bg,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 1px 0px rgba(0,0,0,.12)"
            : "0 16px 40px rgba(0,0,0,.35)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          justifyContent: "space-between",
          gridTemplateColumns: { xs: "1fr", md: "1fr 0.9fr" },
          gap: { xs: 3, md: 15 },
          width: "100%",
          alignItems: "stretch",
          direction: dir as any,
        }}
      >
        <Stack
          spacing={1.5}
          alignItems="start"
          justifyContent="center"
          sx={{ minWidth: 0 }}
        >
          {imgSrc ? (
            <Box
              component="img"
              src={imgSrc}
              alt={desc}
              sx={{
                width: { xs: 140, md: 200 },
                height: "auto",
                filter:
                  theme.palette.mode === "dark"
                    ? "drop-shadow(0 24px 40px rgba(0,0,0,.45))"
                    : "drop-shadow(0 20px 30px rgba(0,0,0,.18))",
              }}
            />
          ) : (
            <Box
              sx={{
                fontSize: { xs: 72, md: 96 },
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                color: theme.palette.text.primary,
                filter:
                  theme.palette.mode === "dark"
                    ? "drop-shadow(0 24px 40px rgba(0,0,0,.45))"
                    : "drop-shadow(0 20px 30px rgba(0,0,0,.18))",
              }}
              aria-label={desc}
            >
              {art.icon}
            </Box>
          )}

          <Typography
            sx={{
              fontSize: { xs: 28, md: 40 },
              fontWeight: 700,
            }}
          >
            {desc}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {(i18n.language === "fa" ? "Feels like" : "Feels Like") + " "}
            {Number.isFinite(feels) ? feels : "—"}
          </Typography>
        </Stack>
        <Stack spacing={2} sx={{ minWidth: 0 }}>
          {/* لوکیشن پيل */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 999,
              bgcolor:
                theme.palette.mode === "light"
                  ? "#CDD9E0"
                  : "#CDD9E0",
              backdropFilter: "blur(3px)",
            }}
          >
            <LocationOnRoundedIcon fontSize="small" sx={{color: "#3D4852"}} />
            <Typography variant="subtitle1" fontWeight={600} sx={{color: "#3D4852"}}>
              {city}
            </Typography>
          </Box>

          {/* روز/تاریخ/ساعت */}
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "end"}}>
            <Typography
              sx={{
                fontSize: { xs: 36, md: 48 },
                fontWeight: 800,
                color: theme.palette.mode === "light" ? "##003464" : "#F3F4F7",
                lineHeight: 1.1,
                
              }}
            >
              {new Date().toLocaleDateString(i18n.language, {
                weekday: "long",
              })}
            </Typography>

            <Stack
              direction="row"
              sx={{ color: theme.palette.mode === "light" ? "##003464" : "#F3F4F7", mt: 0.5, flexWrap: "wrap" }}
            >
              <Typography variant="subtitle1">
                {new Date().toLocaleDateString(i18n.language, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
              <Typography variant="subtitle1">
                {new Date().toLocaleTimeString(i18n.language, {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Typography>
            </Stack>
          </Box>

          {/* big degree*/}
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "end"}}>
            <Typography
              sx={{
                fontSize: { xs: 56, md: 72 },
                fontWeight: 600,
                color: theme.palette.mode === "light" ? "##003464" : "#F3F4F7",
                display: "flex",
                alignItems: "baseline",
                gap: 1.25,
              }}
            >
              {Number.isFinite(temp) ? Math.round(temp) : "—"}
              <Box component="span" sx={{ fontWeight: 600 }}>
                °
              </Box>
              <Box component="span" sx={{ fontWeight: 600 }}>
                C
              </Box>
            </Typography>

            <Typography variant="subtitle1" sx={{ mt: 0.5, color: theme.palette.mode === "light" ? "##003464" : "#F3F4F7" }}>
              {(i18n.language === "fa" ? "حداکثر" : "High") + ": "}
              {tMax ?? "—"}{" "}
              {(i18n.language === "fa" ? "حداقل" : "Low") + ": "}
              {tMin ?? "—"}
            </Typography>
          </Box>
        </Stack>

       
      </Box>
    </Paper>
  );
}
