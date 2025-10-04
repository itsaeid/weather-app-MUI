import { Paper, Box, Typography, useTheme } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Point } from "../../hooks/useMonthlySeries";
import { useTranslation } from "react-i18next";
import { useId } from "react";

export default function TemperatureChartCard({ data }: { data: Point[] }) {
  const theme = useTheme();

   const bg =
    theme.palette.mode === "light"
      ? "#E1E9EE"
      : "linear-gradient(180deg,#292F45 0%, #1C2531 100%)";

  const hasData = data.some((p) => p.temp !== null);
  const { t } = useTranslation();
  const gradId = useId();
  return (
    <Paper
      sx={{
        borderRadius: 3,
        p: 2,
        boxShadow: theme.palette.mode === "light"
            ? "0 1px 0px rgba(0,0,0,.12)"
            : "0 16px 40px rgba(0,0,0,.35)",
        height: "100%",
        width: "47vw",
        background: bg,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {t("temp_chart_title")}
      </Typography>
      {hasData ? (
      <Box sx={{ width: "100%", height: { xs: 200, md: 300 } }}>
        
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
              <linearGradient id={`tempGradient-${gradId}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"  stopColor="#4CDFE8" />
                <stop offset="100%" stopColor="#7947F7" />
              </linearGradient>
            </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" interval={0} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temp"
                stroke={`url(#tempGradient-${gradId})`}
                strokeWidth={3}
                dot={false}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        ) : (
          <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
            دادهٔ کافی برای نمودار سالانه موجود نیست
          </Box>
          
        )}
      
    </Paper>
  );
}
